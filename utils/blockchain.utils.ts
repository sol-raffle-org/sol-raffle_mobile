import * as web3 from "@solana/web3.js";
import * as splToken from "@solana/spl-token";

import { BN } from "@coral-xyz/anchor";
import { PublicKey } from "@solana/web3.js";
import { NetworkModeEnum, SupportedChainEnum } from "@/types/common.type";

import {
  TOKEN_PROGRAM_ID,
  ASSOCIATED_TOKEN_PROGRAM_ID,
} from "@solana/spl-token";

export const getSolanaRpcEndpoint = (rpcUrl?: string): string => {
  if (rpcUrl) return rpcUrl;

  if (process.env.RPC_URL) return process.env.RPC_URL;

  let mode = "devnet";

  if (process.env.NETWORK_MODE === "devnet") {
    mode = "devnet";
  } else if (process.env.NETWORK_MODE === "testnet") {
    mode = "devnet";
  } else {
    mode = "mainnet-beta";
  }

  return web3.clusterApiUrl(mode as web3.Cluster);
};

export const getSignatureStatus = async (signature: string) => {
  const rpcEndpoint = getSolanaRpcEndpoint();

  const connection = new web3.Connection(rpcEndpoint, "confirmed");

  const status = await connection.getSignatureStatus(signature);

  const statusInfo = status.value;

  const confirmationStatus = statusInfo?.confirmationStatus;

  if (
    confirmationStatus === "finalized" ||
    confirmationStatus === "confirmed"
  ) {
    const isSuccess = status?.value?.err === null;

    if (isSuccess) {
      return statusInfo;
    } else {
      return null;
    }
  }

  throw new Error("Transaction not confirmed");
};

export const validateSolWalletAddress = (address: string): boolean => {
  try {
    const pubkey = new PublicKey(address);
    return PublicKey.isOnCurve(pubkey.toBuffer());
  } catch (error) {
    console.error("Error validate Sol wallet address: ", error);
    return false;
  }
};

export const createAssociatedTokenAccountInstruction = (
  payer: web3.PublicKey,
  associatedToken: web3.PublicKey,
  owner: web3.PublicKey,
  mint: web3.PublicKey,
  programId = TOKEN_PROGRAM_ID,
  associatedTokenProgramId = ASSOCIATED_TOKEN_PROGRAM_ID
): web3.TransactionInstruction => {
  const keys = [
    { pubkey: payer, isSigner: true, isWritable: true },
    { pubkey: associatedToken, isSigner: false, isWritable: true },
    { pubkey: owner, isSigner: false, isWritable: false },
    { pubkey: mint, isSigner: false, isWritable: false },
    {
      pubkey: web3.SystemProgram.programId,
      isSigner: false,
      isWritable: false,
    },
    { pubkey: programId, isSigner: false, isWritable: false },
    { pubkey: web3.SYSVAR_RENT_PUBKEY, isSigner: false, isWritable: false },
  ];

  return new web3.TransactionInstruction({
    keys,
    programId: associatedTokenProgramId,
    data: Buffer.alloc(0),
  });
};

export const getSolanaNativeTokenBalance = async (
  walletAddress: string,
  rpcUrl: string
) => {
  if (!walletAddress || !rpcUrl) return 0;

  try {
    const connection = new web3.Connection(rpcUrl, "finalized");

    const address = new web3.PublicKey(walletAddress);
    const balance = await connection.getBalance(address);

    return balance / web3.LAMPORTS_PER_SOL;
  } catch (error) {
    console.log("Error get native token:", error);
    return 0;
  }
};

export const getSvmSplTokenBalance = async (
  walletAddress: string,
  tokenContractAddress: string,
  rpcUrl: string
) => {
  if (!walletAddress) return 0;

  try {
    const connection = new web3.Connection(rpcUrl, "finalized");

    const pubKey = new web3.PublicKey(walletAddress);
    const mintPubKey = new web3.PublicKey(tokenContractAddress);

    const tokenAccount = await web3.PublicKey.findProgramAddressSync(
      [
        pubKey.toBuffer(),
        splToken.TOKEN_PROGRAM_ID.toBuffer(),
        mintPubKey.toBuffer(),
      ],
      splToken.ASSOCIATED_TOKEN_PROGRAM_ID
    );

    const tokenAmountInfo = await connection.getTokenAccountBalance(
      tokenAccount[0] || tokenAccount,
      "confirmed"
    );
    const tokenAmount = tokenAmountInfo.value.uiAmount || 0;

    return tokenAmount;
  } catch (error) {
    console.error("Error get token balance:", error);
    return 0;
  }
};

export const getSVMRpcEndpoint = (chain: SupportedChainEnum) => {
  switch (chain) {
    case SupportedChainEnum.Solana:
      return getSolanaRpcEndpoint();

    default:
      return getSolanaRpcEndpoint();
  }
};

export const convertRoundIdToBuffer = (roundId: number) => {
  return Buffer.from(
    new Uint8Array(new BN(roundId).toArrayLike(Buffer, "le", 8))
  );
};

export const getTxHashLink = (txHash: string) => {
  if (!txHash) return "#";

  const params =
    process.env.NETWORK_MODE !== NetworkModeEnum.MAIN_NET
      ? `?cluster=${process.env.NETWORK_MODE}`
      : "";

  return `https://solscan.io/tx/${txHash}/${params}`;
};

export const getBlockLink = (block: string) => {
  if (!block) return "#";

  return `https://coffe.bloks.io/block/${block}`;
};
