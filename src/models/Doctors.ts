export interface Doctor {
	name: string;
	zipCode: number;
	address: string;
	city: string;
	openHours: BusinessHours[];
}

export interface BusinessHours {
	start: number;
	end: number;
}
