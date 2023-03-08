import { BigNumber, BigNumberish } from 'ethers';
import { Doctor, docs } from './Doctors';

export interface IAppointment {
	id?: number; // contractNumber?
	patient: string;
	dateTime: number[]; // minute darf nur 0, 15, 30 oder 45 sein
	duration: number;
	doctor: Doctor; // Doctor.id
}

export interface AppointmentFromSC {
	id: BigNumberish;
	startTime: BigNumberish;
	duration: BigNumberish;
	patient: string;
	doctorsId: BigNumberish;
	reservationFee: BigNumberish;
}

// Nur vorlaeufig eine Liste mit Appointments:
export var appointmentsArray: IAppointment[] = [
	// {
	// 	id: 0,
	// 	patient: '0x0d5900731140977cd80b7Bd2DCE9cEc93F8a176B',
	// 	dateTime: [1, 3, 2023, 10, 15],
	// 	duration: 3600,
	// 	doctorsId: 0,
	// },
	// {
	// 	id: 1,
	// 	patient: '0x0d5900731140977cd80b7Bd2DCE9cEc93F8a176B',
	// 	dateTime: [27, 2, 2023, 15, 0],
	// 	duration: 900,
	// 	doctorsId: 1,
	// },
	// {
	// 	id: 2,
	// 	patient: '0x0d5900731140977cd80b7Bd2DCE9cEc93F8a176B',
	// 	dateTime: [3, 3, 2023, 8, 30],
	// 	duration: 1800,
	// 	doctorsId: 2,
	// },
	// {
	// 	id: 3,
	// 	patient: '0x0d5900731140977cd80b7Bd2DCE9cEc93F8a176B',
	// 	dateTime: [6, 3, 2023, 13, 0],
	// 	duration: 1800,
	// 	doctorsId: 3,
	// },
];
