import { Coinflip } from "./coinflip";
import { BN, Program } from "@coral-xyz/anchor";
import { PRIORITY_FEE_MICRO_LAMPORT } from "@/constants/blockchain.const";

import {
  getSolanaRpcEndpoint,
  convertRoundIdToBuffer,
} from "@/utils/blockchain.utils";

import * as web3 from "@solana/web3.js";
import idl from "./coinflip.json";

const idl_string = JSON.stringify(idl);
const idl_obj = JSON.parse(idl_string);

export const getPlayerStatsService = async (walletAddress: string) => {
  try {
    if (!walletAddress) return;

    const rpcEndpoint = getSolanaRpcEndpoint();
    const connection = new web3.Connection(rpcEndpoint, "confirmed");
    const program = new Program<Coinflip>(idl_obj, {
      connection,
    });

    const playerStatsPda = web3.PublicKey.findProgramAddressSync(
      [
        Buffer.from("coinflip_player_stats"),
        new web3.PublicKey(walletAddress).toBuffer(),
      ],
      program.programId
    )[0];

    const playerStatsAccount =
      await program.account.playerStats.fetch(playerStatsPda);
    if (!playerStatsAccount) return;

    return playerStatsAccount;
  } catch (error) {
    console.log("Error fetching player stats", error);
    return;
  }
};

const initPlayerStatsInstruction = async (
  walletAddress: string,
  playerStatsPda: web3.PublicKey
) => {
  try {
    if (!walletAddress || !playerStatsPda) return;

    const rpcEndpoint = getSolanaRpcEndpoint();
    const connection = new web3.Connection(rpcEndpoint, "confirmed");
    const program = new Program<Coinflip>(idl_obj, {
      connection,
    });

    const publicKey = new web3.PublicKey(walletAddress);

    const initPlayerStatsIx = await program.methods
      .initPlayerStats()
      .accountsPartial({
        playerStats: playerStatsPda,
        player: publicKey,
        systemProgram: web3.SystemProgram.programId,
      })
      .instruction();

    return initPlayerStatsIx;
  } catch (error) {
    console.log("Error while init player stats ix", error);
    return;
  }
};

export const createNewGameTransactionService = async (
  walletAddress: string,
  betAmount: number,
  position: 0 | 1
) => {
  try {
    if (!walletAddress || !betAmount) return;

    const rpcEndpoint = getSolanaRpcEndpoint();
    const connection = new web3.Connection(rpcEndpoint, "confirmed");
    const program = new Program<Coinflip>(idl_obj, {
      connection,
    });

    const playerStatsPda = web3.PublicKey.findProgramAddressSync(
      [
        Buffer.from("coinflip_player_stats"),
        new web3.PublicKey(walletAddress).toBuffer(),
      ],
      program.programId
    )[0];

    const playerStatsAccount = await getPlayerStatsService(walletAddress);
    const currentGameId =
      playerStatsAccount?.totalGamesCreated?.toNumber() || 0;
    const nextGameId = currentGameId + 1;

    const gameConfigPda = web3.PublicKey.findProgramAddressSync(
      [Buffer.from("coinflip_game_config")],
      program.programId
    )[0];

    const gamePda = web3.PublicKey.findProgramAddressSync(
      [
        Buffer.from("coinflip_game_seed"),
        new web3.PublicKey(walletAddress).toBuffer(),
        convertRoundIdToBuffer(nextGameId),
      ],
      program.programId
    )[0];

    const transaction = new web3.Transaction();

    if (!playerStatsAccount) {
      const createBetAccountIx = await initPlayerStatsInstruction(
        walletAddress,
        playerStatsPda
      );

      if (createBetAccountIx) transaction.add(createBetAccountIx);
    }

    transaction.add(
      web3.ComputeBudgetProgram.setComputeUnitPrice({
        microLamports: PRIORITY_FEE_MICRO_LAMPORT,
      })
    );

    const createNewGameIx = await program.methods
      .createGame(new BN(betAmount * web3.LAMPORTS_PER_SOL), position)
      .accountsPartial({
        gameConfig: gameConfigPda,
        playerStats: playerStatsPda,
        game: gamePda,
        creator: new web3.PublicKey(walletAddress),
        systemProgram: web3.SystemProgram.programId,
      })
      .instruction();

    transaction.add(createNewGameIx);

    transaction.feePayer = new web3.PublicKey(walletAddress);
    transaction.recentBlockhash = (
      await connection.getLatestBlockhash("confirmed")
    ).blockhash;

    return transaction;
  } catch (error) {
    console.error("Error create new flip game instruction", error);

    return;
  }
};

export const createJoinGameTransactionService = async (
  walletAddress: string,
  creatorAddress: string,
  gameId: number
) => {
  try {
    if (!walletAddress || !creatorAddress || !gameId) return;

    const rpcEndpoint = getSolanaRpcEndpoint();
    const connection = new web3.Connection(rpcEndpoint, "confirmed");
    const program = new Program<Coinflip>(idl_obj, {
      connection,
    });

    const gamePda = web3.PublicKey.findProgramAddressSync(
      [
        Buffer.from("coinflip_game_seed"),
        new web3.PublicKey(creatorAddress).toBuffer(),
        convertRoundIdToBuffer(gameId),
      ],
      program.programId
    )[0];

    const playerStatsPda = web3.PublicKey.findProgramAddressSync(
      [
        Buffer.from("coinflip_player_stats"),
        new web3.PublicKey(walletAddress).toBuffer(),
      ],
      program.programId
    )[0];

    const playerStatsAccount = await getPlayerStatsService(walletAddress);

    const transaction = new web3.Transaction();

    if (!playerStatsAccount) {
      const createBetAccountIx = await initPlayerStatsInstruction(
        walletAddress,
        playerStatsPda
      );

      if (createBetAccountIx) transaction.add(createBetAccountIx);
    }

    transaction.add(
      web3.ComputeBudgetProgram.setComputeUnitPrice({
        microLamports: PRIORITY_FEE_MICRO_LAMPORT,
      })
    );

    const joinGameIx = await program.methods
      .joinGame()
      .accountsPartial({
        game: gamePda,
        player: new web3.PublicKey(walletAddress),
        systemProgram: web3.SystemProgram.programId,
      })
      .instruction();

    transaction.add(joinGameIx);

    transaction.feePayer = new web3.PublicKey(walletAddress);
    transaction.recentBlockhash = (
      await connection.getLatestBlockhash("confirmed")
    ).blockhash;

    return transaction;
  } catch (error) {
    console.error("Error create join flip game instruction", error);

    return;
  }
};
