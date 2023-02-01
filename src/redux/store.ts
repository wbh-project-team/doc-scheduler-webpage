import { configureStore } from '@reduxjs/toolkit';
import usdReducer from './userReducer';

export const store = configureStore({
	reducer: {
		user: usdReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {wallet: walletState }
export type AppDispatch = typeof store.dispatch;
