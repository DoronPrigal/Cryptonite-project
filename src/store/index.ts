import { configureStore } from "@reduxjs/toolkit";
import coinsReducer from "./coinsSlice";
import selectedCoinsReducer from "./selectedCoinsSlice";

// הגדרת ה-Redux store המרכזי
export const store = configureStore({
  reducer: {
    coins: coinsReducer,
    selectedCoins: selectedCoinsReducer,
  },
});

// טיפוסי TypeScript לשימוש ב-hooks
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
