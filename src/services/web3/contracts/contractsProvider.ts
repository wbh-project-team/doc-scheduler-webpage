import { BigNumberish, ethers, Signer, providers } from 'ethers';

import { ContractInterface } from './contractInterface';
import { sepolia } from './sepolia';
import { Doctor } from '../../../models/Doctors';

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
export async function createDoctorsOffice(newDoctor: Doctor): Promise<void> {
	try {
		const doctor = {
			id: 0,
			owner: ethers.constants.AddressZero,
			firstName: '',
			lastName: '',
			street: '',
			streetNumber: 0,
			zipCode: 0,
			city: '',
			phoneNumber: '',
			freeText: '',
			openingTime: newDoctor.openHours.map((item) => item.start),
			closingTime: newDoctor.openHours.map((item) => item.end),
			startLunchbreak: newDoctor.openHours.map((item) => item.lunchStart),
			stopLunchbreak: newDoctor.openHours.map((item) => item.lunchEnd),
			specializations: [0],
		};
		console.log(doctor);

		const result = await docScheduler.createDoctorsOffice(doctor);

		const tx = await result.wait();
		console.log(tx);
	} catch (error) {
		console.error(`create Doctor failed: wrong abi in this network!\n${error}`);
	}
}
export async function reconfigureOffice(newDoctor: Doctor): Promise<void> {
	try {
		const result = await docScheduler.createDoctorsOffice({
			id: 0,
			owner: ethers.constants.AddressZero,
			firstName: newDoctor.name,
			lastName: newDoctor.name,
			street: newDoctor.address,
			zipCode: newDoctor.zipCode,
			city: newDoctor.city,
			phoneNumber: '',
			freeText: newDoctor.description,
			openingTime: newDoctor.openHours.map((item) => item.start),
			closingTime: newDoctor.openHours.map((item) => item.end),
			startLunchbreak: newDoctor.openHours.map((item) => item.lunchStart),
			endLunchbreak: newDoctor.openHours.map((item) => item.lunchEnd),
			specialization: [+newDoctor.specialization],
		});

		const tx = await result.wait();
		console.log(tx);
	} catch (error) {
		console.error(`create Doctor failed: wrong abi in this network!\n${error}`);
	}
}
export async function getDay() {
	try {
		const result = await docScheduler.getDay(1678012640);

		console.log(+result);
	} catch (error) {
		console.error(`get Day failed: wrong abi in this network!\n${error}`);
	}
}
