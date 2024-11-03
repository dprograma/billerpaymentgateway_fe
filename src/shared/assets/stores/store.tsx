import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import authReducer from '../slices/authSlice';
import authWalletReducer from '../slices/authWalletSlice';
import adminReducer from '../slices/adminSlice';
import { persistStore, persistReducer } from 'redux-persist';


const persistConfig = {
    key: 'root',
    storage,
};

const rootReducer = combineReducers({
    auth: authReducer,
    authWallet: authWalletReducer,
    admin: adminReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);


const store = configureStore({
    reducer: persistedReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);
export default store;