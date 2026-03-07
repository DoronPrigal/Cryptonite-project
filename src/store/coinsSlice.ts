import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Coin, CoinsState } from "../types";

// ערך התחלתי של ה-slice
const initialState: CoinsState = {
  coins: [],
  loading: false,
  error: null,
  searchQuery: "",
};

const coinsSlice = createSlice({
  name: "coins",
  initialState,
  reducers: {
    // שמירת המטבעות שהגיעו מה-API
    setCoins(state, action: PayloadAction<Coin[]>) {
      state.coins = action.payload;
    },
    // עדכון מצב טעינה
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    // עדכון שגיאה
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
    // עדכון טקסט החיפוש (client-side)
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
    },
  },
});

export const { setCoins, setLoading, setError, setSearchQuery } =
  coinsSlice.actions;

export default coinsSlice.reducer;
