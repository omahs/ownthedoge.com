import { isProd } from "../environment/vars";

export enum ClientSide {
  BUY = "BUY",
  SELL = "SELL",
}

type DatetimeString = string;

export enum ChainName {
  DOGECOIN = "DOGECOIN",
  ETHEREUM = "ETHEREUM",
}
export interface RainbowSwap {
  id: number;
  blockNumber: number;
  blockCreatedAt: DatetimeString;
  insertedAt: DatetimeString;
  updatedAt: DatetimeString;
  baseCurrency: string;
  quoteCurrency: string;
  baseAmount: number;
  quoteAmount: number;
  clientSide: ClientSide;
  txHash: string;
  clientAddress: string;
  clientEns: string | null;
  donatedCurrency: string;
  donatedAmount: number;
  donatedUSDNotional: number;
}

export interface Donation {
  id: number;
  blockNumber: number;
  blockCreatedAt: DatetimeString;
  fromAddress: string;
  toAddress: string;
  blockchain: ChainName;
  currency: string;
  currencyContractAddress: string | null;
  txHash: string;
  amount: number;
  currencyUSDNotional: number;
  explorerUrl: string;
}

export interface Leaderboard {
  swaps: RainbowSwap[];
  donations: Donation[];
}

const baseUrl = isProd()
  ? "https://api.ownthedoge.com/statue-campaign"
  : "https://staging.api.ownthedoge.com/statue-campaign";
// const baseUrl = "http://localhost:3003/statue-campaign";

export const getDonations = (): Promise<Donation[]> => {
  return fetch(baseUrl + "/donations").then((res) => res.json());
};

export const getSwaps = (): Promise<RainbowSwap[]> => {
  return fetch(baseUrl + "/swaps").then((res) => res.json());
};

export const getLeaderboard = (): Promise<Leaderboard> => {
  return fetch(baseUrl + "/leaderboard").then((res) => res.json());
};

export const getNow = (): Promise<{ usdNotional: number }> => {
  return fetch(baseUrl + "/now").then((res) => res.json());
};
