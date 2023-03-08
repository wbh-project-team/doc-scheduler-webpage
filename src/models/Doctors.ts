import { BigNumber, BigNumberish } from 'ethers';

export interface Doctor {
	id: number;
	walletId: string; // owner address
	pictureLink?: string;
	firstname: string;
	name: string; // Titel + Vorname + Nachname
	zipCode: number;
	address: string;
	city: string;
	openHours: BusinessHours[];
	specialization: keyof typeof areaOfExpertise;
	consultationCategories: IConsultationCategory[];
	description: string;
	rating?: number;
}

export interface DoctorFromSC {
	id: BigNumberish;
	owner: string;
	firstName: string;
	name: string;
	street: string;
	zipCode: BigNumberish;
	city: string;
	phoneNumber: string;
	description: string;
	openingTime: BigNumberish[];
	closingTime: BigNumberish[];
	lunchStart: BigNumberish[];
	lunchEnd: BigNumberish[];
	specializations: string[];
	categoryNames: string[];
	categoryDurations: BigNumberish[];
}

export interface BusinessHours {
	openingTime: number;
	closingTime: number;
	lunchStart: number;
	lunchEnd: number;
}

export interface IConsultationCategory {
	category: string;
	durationInSecs: number;
}

export enum areaOfExpertise {
	doctor = 'Hausarzt',
	dentist = 'Zahnarzt',
	surgeon = 'Chirurg',
}

// Nur vorlaeufig eine Liste mit Aerzten:
export const docs: Doctor[] = [
	{
		id: 0,
		walletId: '0',
		firstname: 'Dr. Jörg',
		name: 'Sroga',
		zipCode: 45468,
		address: 'Schlossstr. 35',
		city: 'Mülheim an der Ruhr',
		openHours: Array.apply(null, Array(5)).map(() => ({
			openingTime: 8.3 * 60 * 60 * 1000,
			closingTime: 16 * 60 * 60 * 1000,
			lunchStart: 12 * 60 * 60 * 1000,
			lunchEnd: 13 * 60 * 60 * 1000,
		})),
		specialization: 'surgeon',
		consultationCategories: [
			{ category: 'Beratung', durationInSecs: 1800 },
			{ category: 'Chirurgischer Eingriff', durationInSecs: 3600 },
			{ category: 'Nachsorge', durationInSecs: 900 },
		],
		description: '',
		rating: 4.5,
	},
	{
		id: 1,
		walletId: '1',
		firstname: 'Dr. Ivan',
		name: 'Fintan',
		zipCode: 90409,
		address: 'Am Stadtpark 43',
		city: 'Nürnberg',
		openHours: Array.apply(null, Array(5)).map(() => ({
			openingTime: 8.3 * 60 * 60 * 1000,
			closingTime: 16 * 60 * 60 * 1000,
			lunchStart: 12 * 60 * 60 * 1000,
			lunchEnd: 13 * 60 * 60 * 1000,
		})),
		specialization: 'dentist',
		consultationCategories: [
			{ category: 'Routineuntersuchung', durationInSecs: 900 },
			{ category: 'Zahnreinigung', durationInSecs: 1800 },
			{ category: 'Kariesbehandlung', durationInSecs: 1800 },
			{ category: 'Wurzelbehandlung', durationInSecs: 2700 },
		],
		description: '',
		rating: 4.9,
	},
	{
		id: 2,
		walletId: '2',
		firstname: 'Dr. med. Akan',
		name: 'Gül',
		zipCode: 64295,
		address: 'Eschollbrücker Str. 26',
		city: 'Darmstadt',
		openHours: Array.apply(null, Array(5)).map(() => ({
			openingTime: 8.3 * 60 * 60 * 1000,
			closingTime: 16 * 60 * 60 * 1000,
			lunchStart: 12 * 60 * 60 * 1000,
			lunchEnd: 13 * 60 * 60 * 1000,
		})),
		specialization: 'doctor',
		consultationCategories: [
			{ category: 'Check-Up', durationInSecs: 1800 },
			{ category: 'Akut-Untersuchung', durationInSecs: 900 },
			{ category: 'Beratung', durationInSecs: 900 },
			{ category: 'Wurzelbehandlung', durationInSecs: 900 },
		],
		description: '',
		rating: 3,
	},
	{
		id: 3,
		walletId: '3',
		firstname: 'Dr. med Tobias',
		name: 'Raile',
		zipCode: 10117,
		address: 'Moerenstr. 6',
		city: 'Berlin',
		openHours: Array.apply(null, Array(5)).map(() => ({
			openingTime: 8.3 * 60 * 60 * 1000,
			closingTime: 16 * 60 * 60 * 1000,
			lunchStart: 12 * 60 * 60 * 1000,
			lunchEnd: 13 * 60 * 60 * 1000,
		})),
		specialization: 'dentist',
		consultationCategories: [
			{ category: 'Routineuntersuchung', durationInSecs: 900 },
			{ category: 'Zahnreinigung', durationInSecs: 1800 },
			{ category: 'Kariesbehandlung', durationInSecs: 900 },
			{ category: 'Wurzelbehandlung', durationInSecs: 900 },
		],
		description: '',
		rating: 5,
	},
	{
		id: 4,
		walletId: '4',
		firstname: 'Dr. med. Nicole ',
		name: 'Freitag',
		zipCode: 45130,
		address: 'Kortumstr. 49',
		city: 'Essen',
		openHours: Array.apply(null, Array(5)).map(() => ({
			openingTime: 8.3 * 60 * 60 * 1000,
			closingTime: 16 * 60 * 60 * 1000,
			lunchStart: 12 * 60 * 60 * 1000,
			lunchEnd: 13 * 60 * 60 * 1000,
		})),
		specialization: 'doctor',
		consultationCategories: [
			{ category: 'Check-Up', durationInSecs: 1800 },
			{ category: 'Akut-Untersuchung', durationInSecs: 900 },
			{ category: 'Beratung', durationInSecs: 900 },
			{ category: 'Wurzelbehandlung', durationInSecs: 900 },
		],
		description:
			'Liebe Patientinnen und Patienten, \
		als Hausärztin verstehe ich mich als Ihre Begleiterin in allen Gesundheitsfragen. \
		Dazu zählen Vorsorgemaßnahmen genauso wie eine individuelle Beratung und die Kenntnis \
		optimaler Behandlungsstrategien im Erkrankungsfall. Neben körperlichen Beschwerden kümmern \
		wir uns auch um sozialmedizinische Fragen und Ihr psychisches Wohlbefinden- der Mensch besteht \
		schließlich nicht nur aus Haut und Knochen. Zu unseren Schwerpunkten zählen die Präventions- \
		und Ernährungsmedizin wie auch die Behandlung von Bluthochdruckerkrankungen und Impfberatung. \
		Ferner bieten wir psychotherapeutische Sitzungen an.\
		​Wir freuen uns auf Sie!',
		rating: 4.5,
	},
	{
		id: 5,
		walletId: '5',
		firstname: 'Dr.',
		name: 'Krippner und Kollegen',
		zipCode: 64287,
		address: 'Dierburger Str. 22',
		city: 'Darmstadt',
		openHours: Array.apply(null, Array(5)).map(() => ({
			openingTime: 7 * 60 * 60 * 1000,
			closingTime: 18 * 60 * 60 * 1000,
			lunchStart: 12 * 60 * 60 * 1000,
			lunchEnd: 13 * 60 * 60 * 1000,
		})),
		specialization: 'doctor',
		consultationCategories: [
			{ category: 'Check-Up', durationInSecs: 1800 },
			{ category: 'Akut-Untersuchung', durationInSecs: 900 },
			{ category: 'Beratung', durationInSecs: 900 },
			{ category: 'Wurzelbehandlung', durationInSecs: 900 },
		],
		description: 'Arzt in Darmstadt, Hessen',
		rating: 4.5,
	},
];
