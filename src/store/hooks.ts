// Typed hooks כדי לא לחזור על טיפוסים בכל קומפוננטה
import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";
import type { RootState, AppDispatch } from "./index";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// Selectors
import type { Coin } from "../types";

// מחזיר את כל המטבעות (מסוננים לפי searchQuery)
export const selectFilteredCoins = (state: RootState): Coin[] => {
  const { coins, searchQuery } = state.coins;
  if (!searchQuery.trim()) return coins;
  const q = searchQuery.toLowerCase();
  return coins.filter(
    (c) => c.name.toLowerCase().includes(q) || c.symbol.toLowerCase().includes(q)
  );
};

export const selectLoading = (state: RootState) => state.coins.loading;
export const selectError = (state: RootState) => state.coins.error;
export const selectSearchQuery = (state: RootState) => state.coins.searchQuery;
export const selectAllCoins = (state: RootState) => state.coins.coins;
export const selectSelectedIds = (state: RootState) =>
  state.selectedCoins.selectedIds;
export const selectSelectedCount = (state: RootState) =>
  state.selectedCoins.selectedIds.length;
export const selectIsSelected = (id: string) => (state: RootState) =>
  state.selectedCoins.selectedIds.includes(id);
