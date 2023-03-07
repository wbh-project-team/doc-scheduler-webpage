import { ContractInterface } from './contractInterface';

export const sepolia: ContractInterface = {
	docSchedulerAddress: '0x45639E8B466854985223ea5564cda11E71799e',
	docSchedulerAbi: [
		{
			inputs: [
				{
					internalType: 'address',
					name: 'dateTimeAddress',
					type: 'address',
				},
			],
			stateMutability: 'nonpayable',
			type: 'constructor',
		},
		{
			anonymous: false,
			inputs: [
				{
					indexed: true,
					internalType: 'address',
					name: 'previousOwner',
					type: 'address',
				},
				{
					indexed: true,
					internalType: 'address',
					name: 'newOwner',
					type: 'address',
				},
			],
			name: 'OwnershipTransferred',
			type: 'event',
		},
		{
			inputs: [],
			name: 'owner',
			outputs: [
				{
					internalType: 'address',
					name: '',
					type: 'address',
				},
			],
			stateMutability: 'view',
			type: 'function',
			constant: true,
		},
		{
			inputs: [
				{
					internalType: 'address',
					name: 'newOwner',
					type: 'address',
				},
			],
			name: 'transferOwnership',
			outputs: [],
			stateMutability: 'nonpayable',
			type: 'function',
		},
		{
			inputs: [
				{
					components: [
						{
							internalType: 'uint256',
							name: 'id',
							type: 'uint256',
						},
						{
							internalType: 'address',
							name: 'owner',
							type: 'address',
						},
						{
							internalType: 'string',
							name: 'firstName',
							type: 'string',
						},
						{
							internalType: 'string',
							name: 'name',
							type: 'string',
						},
						{
							internalType: 'string',
							name: 'street',
							type: 'string',
						},
						{
							internalType: 'uint256',
							name: 'zipCode',
							type: 'uint256',
						},
						{
							internalType: 'string',
							name: 'city',
							type: 'string',
						},
						{
							internalType: 'string',
							name: 'phoneNumber',
							type: 'string',
						},
						{
							internalType: 'string',
							name: 'description',
							type: 'string',
						},
						{
							internalType: 'uint256[]',
							name: 'openingTime',
							type: 'uint256[]',
						},
						{
							internalType: 'uint256[]',
							name: 'closingTime',
							type: 'uint256[]',
						},
						{
							internalType: 'uint256[]',
							name: 'lunchStart',
							type: 'uint256[]',
						},
						{
							internalType: 'uint256[]',
							name: 'lunchEnd',
							type: 'uint256[]',
						},
						{
							internalType: 'string[]',
							name: 'specializations',
							type: 'string[]',
						},
					],
					internalType: 'struct DocScheduler.Doctor',
					name: 'newDoctor',
					type: 'tuple',
				},
			],
			name: 'createDoctorsOffice',
			outputs: [],
			stateMutability: 'nonpayable',
			type: 'function',
		},
		{
			inputs: [
				{
					components: [
						{
							internalType: 'uint256',
							name: 'id',
							type: 'uint256',
						},
						{
							internalType: 'address',
							name: 'owner',
							type: 'address',
						},
						{
							internalType: 'string',
							name: 'firstName',
							type: 'string',
						},
						{
							internalType: 'string',
							name: 'name',
							type: 'string',
						},
						{
							internalType: 'string',
							name: 'street',
							type: 'string',
						},
						{
							internalType: 'uint256',
							name: 'zipCode',
							type: 'uint256',
						},
						{
							internalType: 'string',
							name: 'city',
							type: 'string',
						},
						{
							internalType: 'string',
							name: 'phoneNumber',
							type: 'string',
						},
						{
							internalType: 'string',
							name: 'description',
							type: 'string',
						},
						{
							internalType: 'uint256[]',
							name: 'openingTime',
							type: 'uint256[]',
						},
						{
							internalType: 'uint256[]',
							name: 'closingTime',
							type: 'uint256[]',
						},
						{
							internalType: 'uint256[]',
							name: 'lunchStart',
							type: 'uint256[]',
						},
						{
							internalType: 'uint256[]',
							name: 'lunchEnd',
							type: 'uint256[]',
						},
						{
							internalType: 'string[]',
							name: 'specializations',
							type: 'string[]',
						},
					],
					internalType: 'struct DocScheduler.Doctor',
					name: 'doctor',
					type: 'tuple',
				},
			],
			name: 'reconfigureOffice',
			outputs: [],
			stateMutability: 'nonpayable',
			type: 'function',
		},
		{
			inputs: [],
			name: 'getDoctors',
			outputs: [
				{
					components: [
						{
							internalType: 'uint256',
							name: 'id',
							type: 'uint256',
						},
						{
							internalType: 'address',
							name: 'owner',
							type: 'address',
						},
						{
							internalType: 'string',
							name: 'firstName',
							type: 'string',
						},
						{
							internalType: 'string',
							name: 'name',
							type: 'string',
						},
						{
							internalType: 'string',
							name: 'street',
							type: 'string',
						},
						{
							internalType: 'uint256',
							name: 'zipCode',
							type: 'uint256',
						},
						{
							internalType: 'string',
							name: 'city',
							type: 'string',
						},
						{
							internalType: 'string',
							name: 'phoneNumber',
							type: 'string',
						},
						{
							internalType: 'string',
							name: 'description',
							type: 'string',
						},
						{
							internalType: 'uint256[]',
							name: 'openingTime',
							type: 'uint256[]',
						},
						{
							internalType: 'uint256[]',
							name: 'closingTime',
							type: 'uint256[]',
						},
						{
							internalType: 'uint256[]',
							name: 'lunchStart',
							type: 'uint256[]',
						},
						{
							internalType: 'uint256[]',
							name: 'lunchEnd',
							type: 'uint256[]',
						},
						{
							internalType: 'string[]',
							name: 'specializations',
							type: 'string[]',
						},
					],
					internalType: 'struct DocScheduler.Doctor[]',
					name: '',
					type: 'tuple[]',
				},
			],
			stateMutability: 'view',
			type: 'function',
			constant: true,
		},
		{
			inputs: [
				{
					components: [
						{
							internalType: 'uint256',
							name: 'id',
							type: 'uint256',
						},
						{
							internalType: 'uint256',
							name: 'startTime',
							type: 'uint256',
						},
						{
							internalType: 'uint256',
							name: 'duration',
							type: 'uint256',
						},
						{
							internalType: 'address',
							name: 'patient',
							type: 'address',
						},
						{
							internalType: 'uint256',
							name: 'doctorsId',
							type: 'uint256',
						},
						{
							internalType: 'uint256',
							name: 'reservationFee',
							type: 'uint256',
						},
					],
					internalType: 'struct DocScheduler.Appointment',
					name: 'appointment',
					type: 'tuple',
				},
			],
			name: 'createAppointment',
			outputs: [],
			stateMutability: 'payable',
			type: 'function',
			payable: true,
		},
		{
			inputs: [
				{
					internalType: 'uint256',
					name: 'doctorId',
					type: 'uint256',
				},
			],
			name: 'getAppointments',
			outputs: [
				{
					components: [
						{
							internalType: 'uint256',
							name: 'id',
							type: 'uint256',
						},
						{
							internalType: 'uint256',
							name: 'startTime',
							type: 'uint256',
						},
						{
							internalType: 'uint256',
							name: 'duration',
							type: 'uint256',
						},
						{
							internalType: 'address',
							name: 'patient',
							type: 'address',
						},
						{
							internalType: 'uint256',
							name: 'doctorsId',
							type: 'uint256',
						},
						{
							internalType: 'uint256',
							name: 'reservationFee',
							type: 'uint256',
						},
					],
					internalType: 'struct DocScheduler.Appointment[]',
					name: '',
					type: 'tuple[]',
				},
			],
			stateMutability: 'view',
			type: 'function',
			constant: true,
		},
		{
			inputs: [],
			name: 'getReservationFee',
			outputs: [
				{
					internalType: 'uint256',
					name: '',
					type: 'uint256',
				},
			],
			stateMutability: 'view',
			type: 'function',
			constant: true,
		},
		{
			inputs: [
				{
					internalType: 'uint256',
					name: 'newFee',
					type: 'uint256',
				},
			],
			name: 'setReservationFee',
			outputs: [],
			stateMutability: 'nonpayable',
			type: 'function',
		},
		{
			inputs: [
				{
					internalType: 'uint256',
					name: 'doctorId',
					type: 'uint256',
				},
				{
					internalType: 'uint256',
					name: 'appointmentId',
					type: 'uint256',
				},
			],
			name: 'payoutAppointment',
			outputs: [],
			stateMutability: 'nonpayable',
			type: 'function',
		},
		{
			inputs: [
				{
					internalType: 'uint256',
					name: 'startTime',
					type: 'uint256',
				},
			],
			name: 'getDay',
			outputs: [
				{
					internalType: 'uint256',
					name: '',
					type: 'uint256',
				},
			],
			stateMutability: 'view',
			type: 'function',
			constant: true,
		},
	],
};
