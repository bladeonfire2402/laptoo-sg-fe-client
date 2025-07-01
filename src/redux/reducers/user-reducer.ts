import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface QuanLyState {
  onQuanLy: string;
}

const initialState: QuanLyState = {
  onQuanLy: "trang-chu",
};

const quanLySlice = createSlice({
  name: "quanly",
  initialState,
  reducers: {
    setOnQuanLy: (state, action: PayloadAction<string>) => {
      state.onQuanLy = action.payload;
    },
  },
});

export const { setOnQuanLy } = quanLySlice.actions;
export default quanLySlice.reducer;
