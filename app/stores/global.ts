import { create } from "zustand";

// for global state management

type GlobalState = {
  account: `0x${string}` | null;
  userLoading: boolean;
  myPrice?: number;
  list: `0x${string}`[];
  collapsed: boolean;
  tvl: Map<string, number>;
  showRoyaltyPopup: boolean;
};

export const useGlobalStore = create<GlobalState>((set) => ({
  account: null,
  userLoading: true,
  list: [],
  collapsed: true,
  tvl: new Map(),
  showRoyaltyPopup: false,
}));
