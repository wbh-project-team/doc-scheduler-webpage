import { BigNumber, BigNumberish } from 'ethers';
import { Doctor, docs } from './Doctors';

export interface IAppointment {
	id?: number; // contractNumber?
	patient: string;
	dateTime: number[]; // minute darf nur 0, 15, 30 oder 45 sein
	categoryName: string;
	duration: number;
	doctor: Doctor; // Doctor.id
	canceled: boolean;
}

export interface AppointmentFromSC {
	id: BigNumberish;
	startTime: BigNumberish;
	duration: BigNumberish;
	categoryName: string;
	patient: string;
	doctorsId: BigNumberish;
	reservationFee: BigNumberish;
	canceled: boolean;
}
