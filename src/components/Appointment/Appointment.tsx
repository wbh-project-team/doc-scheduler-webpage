import { Box, Button, Typography } from '@mui/material';
import { forwardRef, useContext, useEffect, useState } from 'react';

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
	isAppointmentOver,
	payoutAppointment,
} from '../../services/web3/contracts/contractsProvider';

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
}

export default function Appointments({ appointment, anonym }: Props) {
	const { isLoggedIn, getAddress } = useContext<WalletContent>(WalletContext);
	const [openCancel, setCancelOpen] = useState(false);
	const [openPayout, setPayoutOpen] = useState(false);
	let starts = (appointment.dateTime[3] - 7) * 4 + appointment.dateTime[4] / 15 + 1; // 15 Minuten pro grid-Zelle
	let ends = starts + appointment.duration / 60 / 15;

	const handleClose = (event: any) => {
		setPayoutOpen(false);
		event.stopPropagation();
	};

	const handleCloseYes = async (event: any) => {
		event.stopPropagation();
		if (await isAppointmentOver(appointment.doctor.id, appointment.id as number)) {
			setPayoutOpen(false);
			payoutAppointment(appointment.doctor.id, appointment.id as number, true);
		} else {
			alert('Bitte warte bis der Termin stattgefunden hat.');
		}
	};

	const handleCloseNo = async (event: any) => {
		event.stopPropagation();
		if (await isAppointmentOver(appointment.doctor.id, appointment.id as number)) {
			setPayoutOpen(false);
			payoutAppointment(appointment.doctor.id, appointment.id as number, false);
		} else {
			alert('Bitte warte bis der Termin stattgefunden hat.');
		}
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
					} else {
						//todo add cancel
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
					zIndex: 100000000000000000000,
				}}>
				<Typography noWrap={true} sx={{ maxWidth: '150px' }} variant="body1">
					{anonym && !(getAddress() === appointment.patient) ? '' : appointment.patient}
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
						<DialogContentText sx={{ color: '#0A0A0A' }} id="alert-dialog-slide-description">
							Bei Ja der Patient.
						</DialogContentText>
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleCloseNo}>Nein</Button>
					<Button onClick={handleCloseYes}>Ja</Button>
				</DialogActions>
			</Dialog>
		</>
	);
}
