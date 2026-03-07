import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { SelectedCoinsState } from "../types";

// מפתח לשמירה ב-localStorage
const LS_KEY = "cryptonite_selected";

// טעינת מזהי מטבעות שמורים מ-localStorage
function loadFromStorage(): string[] {
  try {
    const raw = localStorage.getItem(LS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

// שמירת מזהי מטבעות ל-localStorage
function saveToStorage(ids: string[]): void {
  localStorage.setItem(LS_KEY, JSON.stringify(ids));
}

const initialState: SelectedCoinsState = {
  selectedIds: loadFromStorage(),
};

const selectedCoinsSlice = createSlice({
  name: "selectedCoins",
  initialState,
  reducers: {
    // הוספה/הסרה של מטבע מהרשימה הסומנת
    toggleCoin(state, action: PayloadAction<string>) {
      const id = action.payload;
      const index = state.selectedIds.indexOf(id);
      if (index !== -1) {
        // הסרה אם כבר סומן
        state.selectedIds.splice(index, 1);
      } else if (state.selectedIds.length < 5) {
        // הוספה רק אם פחות מ-5
        state.selectedIds.push(id);
      }
      saveToStorage(state.selectedIds);
    },
    // החלפת מטבע ישן בחדש (כשמגיעים ל-6)
    swapCoin(
      state,
      action: PayloadAction<{ removeId: string; addId: string }>
    ) {
      const { removeId, addId } = action.payload;
      const index = state.selectedIds.indexOf(removeId);
      if (index !== -1) {
        state.selectedIds[index] = addId;
      }
      saveToStorage(state.selectedIds);
    },
  },
});

export const { toggleCoin, swapCoin } = selectedCoinsSlice.actions;

export default selectedCoinsSlice.reducer;
