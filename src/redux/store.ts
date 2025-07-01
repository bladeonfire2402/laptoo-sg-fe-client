import { configureStore } from "@reduxjs/toolkit";
import quanlyReducer from "./reducers/quanly-reducer";
import userReducer from "./reducers/user-reducer";
import productReducer from "./reducers/product-reducer";
import createSagaMiddleware from 'redux-saga';

const sagaMiddleware = createSagaMiddleware();

export const ClientStore = configureStore({
  reducer: {
    quanly: quanlyReducer,
    user: userReducer,
    product: productReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});