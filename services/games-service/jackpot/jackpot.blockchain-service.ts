import { convertRoundIdToBuffer, getSolanaRpcEndpoint } from '@/utils/blockchain.utils'

import { BN, Program } from '@coral-xyz/anchor'
import { Raffle } from './raffle'

import { PRIORITY_FEE_MICRO_LAMPORT } from '@/constants/blockchain.const'
import * as web3 from '@solana/web3.js'
import idl from './raffle.json'

const idl_string = JSON.stringify(idl)
const idl_obj = JSON.parse(idl_string)

export const getBetAccountService = async (walletAddress: string) => {
  try {
    if (!walletAddress) return

    const rpcEndpoint = getSolanaRpcEndpoint()
    const connection = new web3.Connection(rpcEndpoint, 'confirmed')
    const program = new Program<Raffle>(idl_obj, {
      connection,
    })

    const betAccountPda = web3.PublicKey.findProgramAddressSync(
      [Buffer.from('raffle_bet_account'), new web3.PublicKey(walletAddress).toBuffer()],
      program.programId,
    )[0]

    const betAccount = await program.account.betAccount.fetch(betAccountPda)
    if (!betAccount) return

    return betAccount
  } catch (error) {
    console.log('Error fetching bet account', error)
    return
  }
}

export const getRoundService = async (roundId: number) => {
  try {
    const rpcEndpoint = getSolanaRpcEndpoint()
    const connection = new web3.Connection(rpcEndpoint, 'confirmed')
    const program = new Program<Raffle>(idl_obj, {
      connection,
    })

    const roundPda = web3.PublicKey.findProgramAddressSync(
      [Buffer.from('raffle_round'), convertRoundIdToBuffer(roundId)],
      program.programId,
    )[0]

    const roundAccount = await program.account.round.fetch(roundPda)

    return roundAccount
  } catch (error) {
    console.log('Error fetching jackpot round', error)
    return
  }
}

export const getGameAccountService = async () => {
  try {
    const rpcEndpoint = getSolanaRpcEndpoint()
    const connection = new web3.Connection(rpcEndpoint, 'confirmed')
    const program = new Program<Raffle>(idl_obj, {
      connection,
    })

    const gameStatePda = web3.PublicKey.findProgramAddressSync([Buffer.from('raffle_game_state')], program.programId)[0]
    const gameAccount = await program.account.gameState.fetch(gameStatePda)

    return gameAccount
  } catch (error) {
    console.log('Error fetching game account', error)
    return
  }
}

const createBetAccountInstruction = async (walletAddress: string, betAccountPda: web3.PublicKey) => {
  try {
    if (!walletAddress || !betAccountPda) return

    const rpcEndpoint = getSolanaRpcEndpoint()
    const connection = new web3.Connection(rpcEndpoint, 'confirmed')
    const program = new Program<Raffle>(idl_obj, {
      connection,
    })

    const publicKey = new web3.PublicKey(walletAddress)

    const createBetAccountIx = await program.methods
      .initBetAccount()
      .accountsPartial({
        betAccount: betAccountPda,
        player: publicKey,
        systemProgram: web3.SystemProgram.programId,
      })
      .instruction()

    return createBetAccountIx
  } catch (error) {
    console.log('Error while create bet account ix', error)
    return
  }
}

export const createPlaceBetTransactionService = async (walletAddress: string, betAmount: number) => {
  try {
    if (!walletAddress || !betAmount) return

    const rpcEndpoint = getSolanaRpcEndpoint()
    const connection = new web3.Connection(rpcEndpoint, 'confirmed')
    const program = new Program<Raffle>(idl_obj, {
      connection,
    })

    const betAccountPda = web3.PublicKey.findProgramAddressSync(
      [Buffer.from('raffle_bet_account'), new web3.PublicKey(walletAddress).toBuffer()],
      program.programId,
    )[0]

    const gameStatePda = web3.PublicKey.findProgramAddressSync([Buffer.from('raffle_game_state')], program.programId)[0]

    const gameAccount = await getGameAccountService()
    const betAccount = await getBetAccountService(walletAddress)

    const roundPda = web3.PublicKey.findProgramAddressSync(
      [Buffer.from('raffle_round'), convertRoundIdToBuffer(gameAccount?.currentRoundId.toString())],
      program.programId,
    )[0]

    const betQueuePda = web3.PublicKey.findProgramAddressSync([Buffer.from('raffle_bet_queue')], program.programId)[0]

    const transaction = new web3.Transaction()
    // console.log(betAccount)
    if (!betAccount) {
      const createBetAccountIx = await createBetAccountInstruction(walletAddress, betAccountPda)

      if (createBetAccountIx) transaction.add(createBetAccountIx)
    }

    transaction.add(
      web3.ComputeBudgetProgram.setComputeUnitPrice({
        microLamports: PRIORITY_FEE_MICRO_LAMPORT,
      }),
    )

    const placeBetIx = await program.methods
      .placeBet(new BN(betAmount * web3.LAMPORTS_PER_SOL))
      .accountsPartial({
        gameState: gameStatePda,
        roundAccount: roundPda,
        betQueue: betQueuePda,
        betAccount: betAccountPda,
        player: new web3.PublicKey(walletAddress),
        systemProgram: web3.SystemProgram.programId,
      })
      .instruction()

    transaction.add(placeBetIx)

    transaction.feePayer = new web3.PublicKey(walletAddress)
    transaction.recentBlockhash = (await connection.getLatestBlockhash('confirmed')).blockhash

    return transaction
  } catch (error) {
    console.error('Error create bet instruction', error)

    return
  }
}
