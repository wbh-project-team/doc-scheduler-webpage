import React, { createContext, useEffect, useState } from 'react';
import { ethers, BigNumber, Signer } from 'ethers';
import { Web3Auth } from '@web3auth/modal';
import { CHAIN_NAMESPACES } from '@web3auth/base';

import { setContracts } from '../contracts/contractsProvider';
import { Box } from '@mui/material';

export type WalletContent = {
	signer: Signer | null;
	getNetwork: () => number;
	getAddress: () => string;
	getBalance: () => Promise<BigNumber>;
	getPrivateKey: () => Promise<string>;
	switchNetwork: (newNetwork: number) => void;
	login: () => Promise<void>;
	logout: () => Promise<void>;
	isLoggedIn: boolean;
};

export const WalletContext = createContext<WalletContent>({
	signer: null,
	getNetwork: () => network,
	getAddress: () => '',
	getBalance: () => new Promise<BigNumber>(() => {}),
	getPrivateKey: () => new Promise<string>(() => {}),
	switchNetwork: (newNetwork: number) => {},
	login: () => new Promise<void>(() => {}),
	logout: () => new Promise<void>(() => {}),
	isLoggedIn: false,
});

const clientId =
	'BPQAw3wyejo4E-fFMfrSDapX2BzrCXi7nPpsKeaE-7MgcDWb6rF3xKrHRcWZUZbtTlZWZby17-0dxF35YEPvk6E';

let network = 11155111;
const web3Auths: { [key: number]: Web3Auth } = {};
const providers: { [key: number]: ethers.providers.Web3Provider } = {};

export const WalletProvider = ({ children }: any) => {
	const [signer, setSigner] = useState<Signer | null>(null);
	const [address, setAddress] = useState<string | undefined>('');
	const [isLoggedIn, setLoggedIn] = useState<boolean>(false);

	useEffect(() => {
		init(`https://goerli.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_KEY}`, 5);
		init(`https://sepolia.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_KEY}`, 11155111);
	}, []);

	const init = async (url: string, network: number) => {
		try {
			const web3auth = new Web3Auth({
				web3AuthNetwork: 'testnet',
				clientId: clientId,
				chainConfig: {
					chainNamespace: CHAIN_NAMESPACES.EIP155,
					chainId: `0x${network.toString(16)}`,
					rpcTarget: url,
				},
				uiConfig: {
					appLogo: '/images/logo.svg',
					defaultLanguage: 'en',
					theme: 'dark',
					loginMethodsOrder: [
						'google',
						'apple',
						'facebook',
						'twitter',
						'github',
						'email_passwordless',
					],
				},
				storageKey: 'local',
				authMode: 'DAPP',
			});

			web3Auths[network] = web3auth;
			await web3auth.initModal();
			if (web3auth.status === 'connected') {
				await login();
				console.log(await web3auth.getUserInfo());
			}
		} catch (error) {
			console.error(error);
		}
		return web3Auths[network];
	};

	const getNetwork = () => network;

	const getAddress = () => (address ? address : '');

	const getPrivateKey = async () => {
		const privateKey = await web3Auths[network].provider?.request({
			method: 'eth_private_key',
		});

		return privateKey as string;
	};

	const switchNetwork = async (newNetwork: number) => {
		if (newNetwork !== network) {
			network = newNetwork;
			if (providers[network]) {
				setSigner(providers[network].getSigner());
				setContracts(network, providers[network]);
			} else if (web3Auths[network]) {
				const web3authProvider = await web3Auths[network].connect();
				if (!web3authProvider) throw new Error('web3auth connect failed');

				providers[network] = new ethers.providers.Web3Provider(web3authProvider);
				setContracts(network, providers[network]);
			} else {
				console.log('switchNetwork: wallet is not created yet');
			}
		}
	};

	const login = async () => {
		if (!web3Auths[network]) {
			console.log('web3auth not initialized yet');
			return;
		}
		console.log(web3Auths);

		const web3authProvider = await web3Auths[network].connect();
		if (!web3authProvider) throw new Error('web3auth connect failed');

		const provider = new ethers.providers.Web3Provider(web3authProvider);
		setSigner(provider.getSigner());
		setContracts(network, provider);
		console.log(provider);

		const walletAddress = await provider.getSigner().getAddress();

		if (walletAddress) {
			setAddress(walletAddress);
		}
		setLoggedIn(true);
	};

	const logout = async () => {
		if (!web3Auths[network]) {
			console.error('web3auth not initialized yet');
			return;
		}
		await web3Auths[network].logout();
		setLoggedIn(false);
	};

	const getBalance = async () => {
		const balance = await signer?.getBalance();
		console.log(`balance: ${balance}`);

		return balance ? balance : ethers.constants.Zero;
	};

	return (
		
		<WalletContext.Provider
			value={{
				signer,
				getNetwork,
				getAddress,
				getBalance,
				getPrivateKey,
				switchNetwork,
				login,
				logout,
				isLoggedIn,
			}}>
			{children}
		</WalletContext.Provider>
		
	);
};
