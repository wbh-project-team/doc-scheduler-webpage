import { Doctor, docs } from './Doctors';

// from Solidity:
		// struct DateTime {
		// 	uint day;
		// 	uint month;
		// 	uint year;
		// 	uint hour;
		// 	uint minute;
		//   }

export interface IAppointment {
	id: number;  // contractNumber?
	ownerWalletId: number;
	dateTime: number[];  // minute darf nur 0, 15, 30 oder 45 sein
	durationInSecs: number;
	docWalletID: number;
    doc? : Doctor;
}

// Nur vorlaeufig eine Liste mit Aerzten:
export const appointmentsArray: IAppointment[] = [
	{
		id: 0, 
		ownerWalletId: 11111111111, 
		dateTime: [1,3,2023,10,15],
		durationInSecs: 3600, 
		docWalletID: 2222222222, 
		doc: docs[0]
	},
    {
		id: 1, 
		ownerWalletId: 11111111111, 
		dateTime: [27,2,2023,15,0], 
		durationInSecs: 900, 
		docWalletID: 2222222222, 
		doc: docs[0]
	},
]