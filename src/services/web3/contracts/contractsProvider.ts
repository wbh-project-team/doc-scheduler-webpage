import { BigNumberish, ethers, Signer, providers } from 'ethers';

import { ContractInterface } from './contractInterface';
import { sepolia } from './sepolia';
import { Doctor, DoctorFromSC } from '../../../models/Doctors';
import { AppointmentFromSC, IAppointment } from '../../../models/Appointments';

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
			firstName: newDoctor.firstname,
			name: newDoctor.name,
			street: newDoctor.address,
			zipCode: newDoctor.zipCode,
			city: newDoctor.city,
			phoneNumber: '',
			description: newDoctor.description,
			openingTime: newDoctor.openHours.map((item) => item.openingTime),
			closingTime: newDoctor.openHours.map((item) => item.closingTime),
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
		const result = await docScheduler.reconfigureOffice({
			id: newDoctor.id,
			owner: ethers.constants.AddressZero,
			firstName: newDoctor.firstname,
			name: newDoctor.name,
			street: newDoctor.address,
			zipCode: newDoctor.zipCode,
			city: newDoctor.city,
			phoneNumber: '',
			description: newDoctor.description,
			openingTime: newDoctor.openHours.map((item) => item.openingTime),
			closingTime: newDoctor.openHours.map((item) => item.closingTime),
			lunchStart: newDoctor.openHours.map((item) => item.lunchStart),
			lunchEnd: newDoctor.openHours.map((item) => item.lunchEnd),
			specializations: [newDoctor.specialization],
		});

		const tx = await result.wait();
		console.log(tx);
	} catch (error) {
		console.error(`contract call failed: wrong abi in this network!\n${error}`);
	}
}
export async function getDoctors(): Promise<Doctor[] | null> {
	try {
		const result = await docScheduler.getDoctors();
		const doctors: Doctor[] = result.map((item: DoctorFromSC) => {
			return {
				id: +item.id.toString(),
				walletId: item.owner,
				firstname: item.firstName,
				name: item.name,
				zipCode: +item.zipCode.toString(),
				address: item.street,
				city: item.city,
				openHours: item.openingTime.map((openingTime, index) => {
					return {
						openingTime: +openingTime.toString(),
						closingTime: +item.closingTime[index].toString(),
						lunchStart: +item.lunchStart[index].toString(),
						lunchEnd: +item.lunchEnd[index].toString(),
					};
				}),
				specialization: item.specializations[0],
				consultationCategories: [],
				description: item.description,
			};
		});

		return doctors;
	} catch (error) {
		console.error(`contract call failed: wrong abi in this network!\n${error}`);
		return null;
	}
}

export async function createAppointment(newAppointment: IAppointment): Promise<void> {
	try {
		console.log(newAppointment);
		const date = newAppointment.dateTime;
		const startTime = new Date(date[2], date[1], date[0], date[3], date[4], 0, 0);
		console.log(+startTime / 1000);

		const appointment = {
			id: 0,
			startTime: +startTime / 1000,
			duration: 60 * 30, //placeholder
			patient: newAppointment.patient,
			doctorsId: newAppointment.doctor.id,
			reservationFee: 0,
		};

		const reservationFee = await getReservationFee();

		const result = await docScheduler.createAppointment(appointment, {
			value: reservationFee,
		});

		const tx = await result.wait();
		console.log(tx);
	} catch (error) {
		console.error(`contract call failed: wrong abi in this network!\n${error}`);
	}
}

export async function getAppointments(doctor: Doctor): Promise<IAppointment[]> {
	try {
		const result = await docScheduler.getAppointments(doctor.id);
		return result.map((appointment: AppointmentFromSC) => {
			return {
				id: appointment.id,
				patient: appointment.patient,
				dateTime: [
					new Date(+appointment.startTime.toString() * 1000).getDate(),
					new Date(+appointment.startTime.toString() * 1000).getMonth(),
					new Date(+appointment.startTime.toString() * 1000).getFullYear(),
					new Date(+appointment.startTime.toString() * 1000).getHours(),
					new Date(+appointment.startTime.toString() * 1000).getMinutes(),
				],
				duration: appointment.duration,
				doctor: doctor,
			};
		});
	} catch (error) {
		console.error(`contract call failed: wrong abi in this network!\n${error}`);
		return [];
	}
}

export async function getReservationFee() {
	try {
		const result = await docScheduler.getReservationFee();

		return result;
	} catch (error) {
		console.error(`contract call failed: wrong abi in this network!\n${error}`);
		return null;
	}
}
