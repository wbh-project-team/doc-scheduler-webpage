import { BigNumberish, ethers, Signer, providers } from 'ethers';

import { ContractInterface } from './contractInterface';
import { sepolia } from './sepolia';
import { Doctor, DoctorFromSC } from '../../../models/Doctors';
import { log } from 'console';

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
			firstName: newDoctor.name,
			name: newDoctor.name,
			street: newDoctor.address,
			zipCode: newDoctor.zipCode,
			city: newDoctor.city,
			phoneNumber: '',
			description: newDoctor.description,
			openingTime: newDoctor.openHours.map((item) => item.start),
			closingTime: newDoctor.openHours.map((item) => item.end),
			lunchStart: newDoctor.openHours.map((item) => item.lunchStart),
			lunchEnd: newDoctor.openHours.map((item) => item.lunchEnd),
			specializations: [newDoctor.specialization],
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
			name: newDoctor.name,
			street: newDoctor.address,
			zipCode: newDoctor.zipCode,
			city: newDoctor.city,
			phoneNumber: '',
			description: newDoctor.description,
			openingTime: newDoctor.openHours.map((item) => item.start),
			closingTime: newDoctor.openHours.map((item) => item.end),
			lunchStart: newDoctor.openHours.map((item) => item.lunchStart),
			lunchEnd: newDoctor.openHours.map((item) => item.lunchEnd),
			specializations: '',
		});

		const tx = await result.wait();
		console.log(tx);
	} catch (error) {
		console.error(`create Doctor failed: wrong abi in this network!\n${error}`);
	}
}
export async function getDoctors(): Promise<Doctor | null> {
	try {
		const result = await docScheduler.getDoctors();
		const doctors: Doctor = result.map((item: DoctorFromSC) => {
			return {
				id: item.id,
				walletId: item.owner,
				firstname: item.firstName,
				name: item.name,
				zipCode: item.zipCode,
				address: item.street,
				city: item.city,
				openHours: [],
				specialization: item.specializations[0],
				consultationCategories: [],
				description: item.description,
			};
		});

		return doctors;
	} catch (error) {
		console.error(`get Day failed: wrong abi in this network!\n${error}`);
		return null;
	}
}
