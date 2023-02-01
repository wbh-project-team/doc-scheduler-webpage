import { BigNumberish, ethers, Signer, providers } from 'ethers';

import { ContractInterface } from './contractInterface';
import { sepolia } from './sepolia';

const contractAbis: { [key: number]: ContractInterface } = {};
contractAbis[11155111] = sepolia;

export let docScheduler: ethers.Contract;

export function setContracts(
	network: ethers.providers.Networkish,
	signerOrProvider: Signer | providers.Provider,
) {
	docScheduler = new ethers.Contract(
		contractAbis[ethers.providers.getNetwork(network).chainId].docSchedulerAddress,
		contractAbis[ethers.providers.getNetwork(network).chainId].docSchedulerAbi,
		signerOrProvider,
	);
}

//todo add smart contract methods
