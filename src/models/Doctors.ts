export interface Doctor {
	Id: string;  // WalletID?
	name: string;
	zipCode: number;
	address: string;
	city: string;
	openHours: BusinessHours[];
	specialization: keyof typeof areaOfExpertise;
	consultationCategories: IConsultationCategory[];
	description: string;
	rating?: number;
}

export interface BusinessHours {
	start: number;
	end: number;
	lunchStart:number;
	lunchEnd:number;
}

export interface IConsultationCategory {
	category : string;
	durationInSecs: number;
}

export enum areaOfExpertise {
	doctor='Hausarzt',
	dentist='Zahnarzt',
	surgeon='Chirurg',
};

// Nur vorlaeufig eine Liste mit Aerzten:
export const docs: Doctor[] = [
	{
		Id: '0', 
		name: 'Dr. Jörg Sroga', 
		zipCode: 45468, 
		address: 'Schlossstr. 35', 
		city: 'Mülheim an der Ruhr', 
		openHours: Array.apply(null, Array(5)).map(()=>( {start:8.3 * 60 * 60 * 1000, end: 16 * 60 * 60 * 1000, lunchStart: 12*60*60*1000, lunchEnd: 13*60*60*1000} )),
		specialization: "surgeon",
		consultationCategories: [{category: "Beratung", durationInSecs: 1800 }, {category: "Chirurgischer Eingriff", durationInSecs: 3600 }, {category: "Nachsorge", durationInSecs: 900 }],
		description:"",
		rating: 4.5,
	},
	{ 
		Id: '1', 
		name: 'Dr. Ivan Fintan', 
		zipCode: 90409, 
		address: 'Am Stadtpark 43', 
		city: 'Nürnberg', 
		openHours: Array.apply(null, Array(5)).map(()=>( {start:8.3 * 60 * 60 * 1000, end: 16 * 60 * 60 * 1000, lunchStart: 12*60*60*1000, lunchEnd: 13*60*60*1000} )),
		specialization: "dentist",
		consultationCategories: [{category: "Routineuntersuchung", durationInSecs: 900 }, {category: "Zahnreinigung", durationInSecs: 1800 }, {category: "Kariesbehandlung", durationInSecs: 1800 }, {category: "Wurzelbehandlung", durationInSecs: 2700 }],
		description:"",
		rating: 4.9,
	},
	{ 
		Id: '2', 
		name: 'Dr. med Akan Gül', 
		zipCode: 64295, 
		address: 'Eschollbrücker Str. 26', 
		city: 'Darmstadt', 
		openHours: Array.apply(null, Array(5)).map(()=>( {start:8.3 * 60 * 60 * 1000, end: 16 * 60 * 60 * 1000, lunchStart: 12*60*60*1000, lunchEnd: 13*60*60*1000} )),
		specialization: "doctor",
		consultationCategories: [{category: "Check-Up", durationInSecs: 1800 }, {category: "Akut-Untersuchung", durationInSecs: 900 }, {category: "Beratung", durationInSecs: 900 }, {category: "Wurzelbehandlung", durationInSecs: 900 }],
		description:"",
		rating: 3,
	},
	{ 
		Id: '3', 
		name: 'Dr. med Tobias Raile', 
		zipCode: 10117, 
		address: 'Moerenstr. 6', 
		city: 'Berlin', 
		openHours: Array.apply(null, Array(5)).map(()=>( {start:8.3 * 60 * 60 * 1000, end: 16 * 60 * 60 * 1000, lunchStart: 12*60*60*1000, lunchEnd: 13*60*60*1000} )),
		specialization: "dentist",
		consultationCategories: [{category: "Routineuntersuchung", durationInSecs: 900 }, {category: "Zahnreinigung", durationInSecs: 1800 }, {category: "Kariesbehandlung", durationInSecs: 900 }, {category: "Wurzelbehandlung", durationInSecs: 900 }],
		description:"",
		rating: 5,
	},
	{ 
		Id: '4', 
		name: 'Dr. med Nicole Freitag', 
		zipCode: 45130, 
		address: 'Kortumstr. 49', 
		city: 'Essen', 
		openHours: Array.apply(null, Array(5)).map(()=>( {start:8.3 * 60 * 60 * 1000, end: 16 * 60 * 60 * 1000, lunchStart: 12*60*60*1000, lunchEnd: 13*60*60*1000} )),
		specialization: "doctor",
		consultationCategories: [{category: "Check-Up", durationInSecs: 1800 }, {category: "Akut-Untersuchung", durationInSecs: 900 }, {category: "Beratung", durationInSecs: 900 }, {category: "Wurzelbehandlung", durationInSecs: 900 }],
		description:"Liebe Patientinnen und Patienten, \
		als Hausärztin verstehe ich mich als Ihre Begleiterin in allen Gesundheitsfragen. \
		Dazu zählen Vorsorgemaßnahmen genauso wie eine individuelle Beratung und die Kenntnis \
		optimaler Behandlungsstrategien im Erkrankungsfall. Neben körperlichen Beschwerden kümmern \
		wir uns auch um sozialmedizinische Fragen und Ihr psychisches Wohlbefinden- der Mensch besteht \
		schließlich nicht nur aus Haut und Knochen. Zu unseren Schwerpunkten zählen die Präventions- \
		und Ernährungsmedizin wie auch die Behandlung von Bluthochdruckerkrankungen und Impfberatung. \
		Ferner bieten wir psychotherapeutische Sitzungen an.\
		​Wir freuen uns auf Sie!",
		rating: 4.5,
	},
	{ 
		Id: '5', 
		name: 'Dr. Krippner und Kollegen', 
		zipCode: 64287, 
		address: 'Dierburger Str. 22', 
		city: 'Darmstadt', 
		openHours: Array.apply(null, Array(5)).map(()=>( {start:7 * 60 * 60 * 1000, end: 18 * 60 * 60 * 1000, lunchStart: 12*60*60*1000, lunchEnd: 13*60*60*1000} )),
		specialization: "doctor",
		consultationCategories: [{category: "Check-Up", durationInSecs: 1800 }, {category: "Akut-Untersuchung", durationInSecs: 900 }, {category: "Beratung", durationInSecs: 900 }, {category: "Wurzelbehandlung", durationInSecs: 900 }],
		description:"Arzt in Darmstadt, Hessen",
		rating: 4.5,
	},
	
];
