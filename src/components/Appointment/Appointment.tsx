import { Box, Button, Typography } from '@mui/material';
import { Dispatch, forwardRef, useContext, useEffect, useState } from 'react';

import { IAppointment } from '../../models/Appointments';
import { Doctor } from '../../models/Doctors';
import { WalletContent, WalletContext } from '../../services/web3/wallets/walletProvider';
import styles from '../Calendar/calendarStyle.module.css';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import {
	cancelAppointment,
	getPatientNameCid,
	isAppointmentOver,
	payoutAppointment,
} from '../../services/web3/contracts/contractsProvider';
import { retrieve } from '../../services/ipfs/ipfsProvider';

const Transition = forwardRef(function Transition(
	props: TransitionProps & {
		children: React.ReactElement<any, any>;
	},
	ref: React.Ref<unknown>,
) {
	return <Slide direction="up" ref={ref} {...props} />;
});

interface Props {
	appointment: IAppointment;
	anonym: boolean;
	isLoading: boolean;
	setLoading: Dispatch<React.SetStateAction<boolean>>;
}

export default function Appointments({ appointment, anonym, isLoading, setLoading }: Props) {
	const { isLoggedIn, getAddress } = useContext<WalletContent>(WalletContext);
	const [openCancel, setCancelOpen] = useState(false);
	const [openPayout, setPayoutOpen] = useState(false);
	const [name, setName] = useState<string>('');

	let starts = (appointment.dateTime[3] - 7) * 4 + appointment.dateTime[4] / 15 + 1; // 15 Minuten pro grid-Zelle
	let ends = starts + appointment.duration / 60 / 15;

	useEffect(() => {
		const loadName = async () => {
			const cid = await getPatientNameCid(getAddress());
			if (cid === '') return;

			const tempName = await retrieve(cid);
			setName(tempName.name);
		};

		if (isLoggedIn) {
			loadName();
		}
	}, [isLoggedIn, isLoading]);

	const handleClose = (event: any) => {
		setPayoutOpen(false);
		event.stopPropagation();
	};

	const handleCloseYes = async (event: any) => {
		event.stopPropagation();
		if (await isAppointmentOver(appointment.doctor.id, appointment.id as number)) {
			setPayoutOpen(false);
			setLoading(true);
			await payoutAppointment(appointment.doctor.id, appointment.id as number, true);
			setLoading(false);
		} else {
			alert('Bitte warte bis der Termin stattgefunden hat.');
		}
	};

	const handleCloseNo = async (event: any) => {
		event.stopPropagation();
		if (await isAppointmentOver(appointment.doctor.id, appointment.id as number)) {
			setPayoutOpen(false);
			setLoading(true);
			await payoutAppointment(appointment.doctor.id, appointment.id as number, false);
			setLoading(false);
		} else {
			alert('Bitte warte bis der Termin stattgefunden hat.');
		}
	};
	const handleCloseCancelYes = async (event: any) => {
		event.stopPropagation();
		console.log(appointment.doctor.id);
		console.log(appointment.id);

		if (!(await isAppointmentOver(appointment.doctor.id, appointment.id as number))) {
			setCancelOpen(false);
			setLoading(true);
			await cancelAppointment(appointment.doctor.id, appointment.id as number);
			setLoading(false);
		} else {
			alert('Bitte warte bis der Termin stattgefunden hat.');
		}
	};

	const handleCloseCancel = async (event: any) => {
		setCancelOpen(false);
		event.stopPropagation();
	};

	return (
		<>
			<Box
				key={appointment.id}
				className={styles.event}
				onClick={(event) => {
					if (
						appointment.patient.toLocaleLowerCase() === 'geschlossen' ||
						appointment.patient.toLocaleLowerCase() === 'pause' ||
						(!(getAddress() === appointment.patient) &&
							!(getAddress() === appointment.doctor.walletId))
					)
						return;

					event.stopPropagation();
					if (getAddress() === appointment.doctor.walletId) {
						setPayoutOpen(true);
					} else if (appointment.id) {
						setCancelOpen(true);
					}
				}}
				sx={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					gridRowStart: starts,
					gridRowEnd: ends,
					backgroundColor: 'lightblue',
					padding: '0',
				}}>
				<Typography noWrap={true} sx={{ maxWidth: '150px' }} variant="body1">
					{anonym && !(getAddress() === appointment.patient)
						? ''
						: appointment.patient.toLocaleLowerCase() === 'geschlossen' ||
						  appointment.patient.toLocaleLowerCase() === 'pause' ||
						  name === ''
						? appointment.patient
						: name}
				</Typography>
			</Box>
			<Dialog
				open={openPayout}
				TransitionComponent={Transition}
				keepMounted
				onClose={handleClose}
				aria-describedby="alert-dialog-slide-description">
				<DialogTitle>{"Use Google's location service?"}</DialogTitle>
				<DialogContent>
					<DialogContentText sx={{ color: '#0A0A0A' }} id="alert-dialog-slide-description">
						War der Patient {appointment.patient} bei dem Termin da?
					</DialogContentText>
					<DialogContentText sx={{ color: '#0A0A0A' }} id="alert-dialog-slide-description">
						Bei Nein erhält deine Praxis den Reservierungsbetrag.
					</DialogContentText>
					<DialogContentText sx={{ color: '#0A0A0A' }} id="alert-dialog-slide-description">
						Bei Ja der Patient.
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleCloseNo}>Nein</Button>
					<Button onClick={handleCloseYes}>Ja</Button>
				</DialogActions>
			</Dialog>
			<Dialog
				open={openCancel}
				TransitionComponent={Transition}
				keepMounted
				onClose={handleCloseCancel}
				aria-describedby="alert-dialog-slide-description">
				<DialogTitle>{"Use Google's location service?"}</DialogTitle>
				<DialogContent>
					<DialogContentText sx={{ color: '#0A0A0A' }} id="alert-dialog-slide-description">
						Willst du deinen Termin absagen? (spätestens 24h vor dem Termin)
					</DialogContentText>
					<DialogContentText sx={{ color: '#0A0A0A' }} id="alert-dialog-slide-description">
						Der Reservierungsbetrag wird dir zurückerstattet.
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleCloseCancel}>Nein</Button>
					<Button onClick={handleCloseCancelYes}>Ja</Button>
				</DialogActions>
			</Dialog>
		</>
	);
}
