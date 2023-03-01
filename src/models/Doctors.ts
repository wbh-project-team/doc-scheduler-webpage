export interface Doctor {
	Id: number;
	name: string;
	zipCode: number;
	address: string;
	city: string;
	openHours: BusinessHours[];
	specialization: keyof typeof areaOfExpertise;
}

export interface BusinessHours {
	start: number;
	end: number;
}

export enum areaOfExpertise {
	doctor='Hausarzt',
	dentist='Zahnarzt',
	surgeon='Chirurg',
};
