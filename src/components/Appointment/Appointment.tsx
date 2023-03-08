import { Box, Typography } from '@mui/material';

import { IAppointment } from '../../models/Appointments';
import styles from '../Calendar/calendarStyle.module.css';

interface Props {
	appointment: IAppointment;
	anonym: boolean;
}

export default function Appointments({ appointment, anonym }: Props) {
	let starts = (appointment.dateTime[3] - 7) * 4 + appointment.dateTime[4] / 15 + 1; // 15 Minuten pro grid-Zelle
	let ends = starts + appointment.duration / 60 / 15;
	// alert("In Appointment: " + appmnt.dateTime);
	return (
		<Box
			key={appointment.id}
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
			<Typography noWrap={true} sx={{ maxWidth: '150px' }} variant="body1">
				{anonym ? '' : appointment.patient}
			</Typography>
		</Box>
	);
}
