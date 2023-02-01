import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';
import { BigNumberish, ethers } from 'ethers';
import { getUsdOfCoin } from '../utilities/cryptoConverterUtility';

// 5 mintues
const cacheTime = 1000 * 60 * 5;

// Define a type for the slice state
interface UserState {
	name: string;
	balance: BigNumberish;
	usdBalance: number;
	status: string;
	usdCache: {
		lastSave: number;
		ethToUSD: number;
	};
}

// Define the initial state using that type
const initialState: UserState = {
	name: '',
	balance: 0,
	usdBalance: 0,
	status: '',
	usdCache: {
		lastSave: 0,
		ethToUSD: 0,
	},
};

export const loadBalance = createAsyncThunk(
	'wallet/getBalance',
	async (getBalance: () => BigNumberish, { getState, dispatch }) => {
		const balance = await getBalance();
		await dispatch(loadUSDValue());
		const state: RootState = getState() as RootState;

		const usd = state.user.usdCache.ethToUSD * +ethers.utils.formatEther(balance.toString());

		return { balance, usd };
	},
);

export const loadUSDValue = createAsyncThunk('wallet/getUsd', async (_, { getState, dispatch }) => {
	const state: RootState = getState() as RootState;
	const now = new Date().getTime();
	let usd;
	if (now > state.user.usdCache.lastSave + cacheTime) {
		usd = await getUsdOfCoin();
		dispatch(cacheUsd(usd));
	}
	return usd;
});

export const userSlice = createSlice({
	name: 'user',
	// `createSlice` will infer the state type from the `initialState` argument
	initialState,
	reducers: {
		setUserName: (state, action: PayloadAction<string>) => {
			state.name = action.payload;
		},
		cacheUsd: (state, action: PayloadAction<number>) => {
			const now = new Date().getTime();
			console.log('saving new state ', { ethToUSD: action.payload, lastSave: now });

			state.usdCache = { ethToUSD: action.payload, lastSave: now };
		},
	},
	extraReducers(builder) {
		builder
			.addCase(loadBalance.pending, (state, action) => {
				state.status = 'loading';
			})
			.addCase(loadBalance.fulfilled, (state, action) => {
				// Add any fetched posts to the array
				state.balance = action.payload.balance;
				state.usdBalance = action.payload.usd;
			})
			.addCase(loadBalance.rejected, (state, action) => {
				console.log('FAILED', action.error.message);

				state.status = 'failed';
				// state.error = action.error.message ? action.error.message : 'unknown error';
			});
	},
});

export const { setUserName, cacheUsd } = userSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectName = (state: RootState) => state.user.name;
export const selectBalance = (state: RootState) => state.user.balance;
export const selectUSDBalance = (state: RootState) => state.user.usdBalance;
export const selectCachedUSD = (state: RootState) => state.user.usdCache.ethToUSD;

export default userSlice.reducer;
