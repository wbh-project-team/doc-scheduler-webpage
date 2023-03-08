import { Box, Typography } from '@mui/material';

import { IAppointment } from '../../models/Appointments';
import styles from '../Calendar/calendarStyle.module.css';

interface Props {
	appointment: IAppointment;
	anonym: boolean;
}

export default function Appointments({ appointment, anonym }: Props) {
	let starts = (appointment.dateTime[3] - 7) * 4 + appointment.dateTime[4] / 15 + 1; // 15 Minuten pro grid-Zelle
	let ends = starts + appointment.durationInSecs / 60 / 15;
	// alert("In Appointment: " + appmnt.dateTime);
	return (
		<Box
			className={styles.event}
			sx={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				gridRowStart: starts,
				gridRowEnd: ends,
				backgroundColor: 'lightblue',
				padding: '0',
			}}>
			<Typography variant="body1">{anonym ? '' : appointment.ownerWalletId}</Typography>
		</Box>
	);
}
