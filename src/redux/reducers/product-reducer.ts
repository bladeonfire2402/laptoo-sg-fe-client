import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface ProductList {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    products: any[];
}

const initialState: ProductList = {
  products: [],
};

const productSlice = createSlice({
  name: "quanly",
  initialState,
  reducers: {

  }
});

export default productSlice.reducer;

