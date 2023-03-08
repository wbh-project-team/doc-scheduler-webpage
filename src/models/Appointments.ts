import { BigNumberish } from 'ethers';
import { Doctor, docs } from './Doctors';

export interface IAppointment {
	id?: number; // contractNumber?
	ownerWalletId: string;
	dateTime: number[]; // minute darf nur 0, 15, 30 oder 45 sein
	durationInSecs: number;
	docWalletID: string; // Doctor.id
	doc?: Doctor;
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
	{
		id: 0,
		ownerWalletId: '11111111111',
		dateTime: [1, 3, 2023, 10, 15],
		durationInSecs: 3600,
		docWalletID: '0',
		doc: docs[0],
	},
	{
		id: 1,
		ownerWalletId: '11111111111',
		dateTime: [27, 2, 2023, 15, 0],
		durationInSecs: 900,
		docWalletID: '0',
		doc: docs[0],
	},
	{
		id: 2,
		ownerWalletId: '11111111111',
		dateTime: [3, 3, 2023, 8, 30],
		durationInSecs: 1800,
		docWalletID: '0',
		doc: docs[0],
	},
	{
		id: 3,
		ownerWalletId: '11111111111',
		dateTime: [6, 3, 2023, 13, 0],
		durationInSecs: 1800,
		docWalletID: '1',
		doc: docs[0],
	},
];
