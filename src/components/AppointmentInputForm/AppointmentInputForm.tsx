import {
	Box,
	Button,
	Checkbox,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	FormControl,
	FormControlLabel,
	InputLabel,
	MenuItem,
	Modal,
	Select,
	Typography,
} from '@mui/material';
import { useContext, useState } from 'react';
import { IAppointment } from '../../models/Appointments';
import { Doctor, IConsultationCategory } from '../../models/Doctors';
import { createAppointment } from '../../services/web3/contracts/contractsProvider';
import { WalletContent, WalletContext } from '../../services/web3/wallets/walletProvider';

interface Props {
	open: any;
	handleClose: any;
	date: number[];
	weekDay: number;
	doctor: Doctor;
	putAppointmentToCalendar: (date: IAppointment) => void;
}

export default function AppointmentInputForm({
	open,
	handleClose,
	date,
	weekDay,
	doctor,
	putAppointmentToCalendar,
}: Props) {
	const [hour, setHour] = useState(7);
	const [minutes, setMinutes] = useState(0);
	// const [duration, setDuration] = useState(0)
	const [currCategory, setCurrCategory] = useState('');

	const { isLoggedIn, getAddress } = useContext<WalletContent>(WalletContext);

	const [checked, setChecked] = useState(false);

	const handleChange = (event: any) => {
		setChecked(event.target.checked);
	};

	const handleSubmit = async () => {
		let duration = 0;
		if (
			doctor.openHours[weekDay - 1].openingTime > hour * 60 * 60 * 1000 + minutes * 60 * 1000 ||
			doctor.openHours[weekDay - 1].closingTime - 60 * 60 * 1000 <
				hour * 60 * 60 * 1000 + minutes * 60 * 1000 ||
			(doctor.openHours[weekDay - 1].lunchStart - 60 * 60 * 1000 <
				hour * 60 * 60 * 1000 + minutes * 60 * 1000 &&
				doctor.openHours[weekDay - 1].lunchEnd > hour * 60 * 60 * 1000 + minutes * 60 * 1000)
		) {
			alert('Bitte innerhalb der Öffnungszeiten reservieren');
			return;
		}
		if (!checked) {
			alert('Bitte stimmen Sie den AGB zu.');
			return;
		}
		handleClose();

		putAppointmentToCalendar({
			patient: getAddress(),
			doctor: doctor,
			dateTime: [date[1], date[2], date[3], hour, minutes],
			duration: duration,
		});

		await createAppointment({
			patient: getAddress(),
			doctor: doctor,
			dateTime: [date[1], date[2], date[3], hour, minutes],
			duration: duration,
		});
	};

	const stylePopupBox = {
		display: 'block',
		position: 'fixed',
		zIndex: 5,
		top: '0',
		left: '0',
		transform: `translate(calc(50vw - 250px), calc(50vh - 100px))`,
		width: '500px',
		//height: '200px',
		bgcolor: 'white',
		color: 'secondary.main',
		border: '2px solid #000',
		borderRadius: '10px',
		boxShadow: 24,
		p: 4,
	};

	return (
		<>
			{isLoggedIn ? (
				<Dialog
					open={open}
					onClose={handleClose}
					aria-labelledby="form-dialog-title"
					sx={{ width: '30em', gap: '10px' }}>
					<DialogTitle
						id="form-dialog-title"
						sx={{ color: 'secondary.main', fontSize: '1.7em', textAlign: 'center' }}>
						Termin am {date[1]}.{date[2]}.{date[3]}
					</DialogTitle>
					<DialogContent>
						<FormControl fullWidth margin="normal">
							<InputLabel
								id="demo-simple-select-helper-label"
								sx={{ color: 'secondary.main', backgroundColor: 'white' }}>
								Stunde
							</InputLabel>
							<Select
								sx={{ color: 'secondary.main' }}
								labelId="demo-simple-select-helper-label"
								id="demo-simple-select-helper"
								value={hour}
								onChange={(event) => setHour(Number(event.target.value))}>
								{[7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19].map((key, index) => {
									return (
										<MenuItem key={index} value={key} sx={{ color: 'secondary.main' }}>
											{key}
										</MenuItem>
									);
								})}
							</Select>
						</FormControl>
						<FormControl fullWidth margin="dense">
							<InputLabel
								id="minutes-label"
								sx={{ color: 'secondary.main', backgroundColor: 'white' }}>
								Minute
							</InputLabel>
							<Select
								sx={{ color: 'secondary.main' }}
								labelId="minutes-label"
								id="time"
								value={minutes}
								onChange={(event) => setMinutes(Number(event.target.value))}>
								{['00', '15', '30', '45'].map((key, index) => {
									return (
										<MenuItem key={index} value={Number(key)} sx={{ color: 'secondary.main' }}>
											{key}
										</MenuItem>
									);
								})}
							</Select>
						</FormControl>
						<FormControl fullWidth margin="dense">
							<InputLabel
								id="duration-label"
								sx={{ color: 'secondary.main', backgroundColor: 'white' }}>
								Terminkategorie
							</InputLabel>
							<Select
								sx={{ color: 'secondary.main' }}
								labelId="duration-label"
								id="duration"
								value={currCategory}
								onChange={(event) => setCurrCategory(event.target.value)}>
								{doctor.consultationCategories.map((item, index) => {
									return (
										<MenuItem key={index} value={item.category} sx={{ color: 'secondary.main' }}>
											{item.category}
										</MenuItem>
									);
								})}
							</Select>
						</FormControl>
						<Typography
							variant="body1"
							sx={{ color: 'secondary.main', mt: '20px', marginBottom: '20px' }}>
							Bitte beachten Sie, dass für das Buchen eines Termins automatisch 10€ hinterlegt
							werden, die Sie bei Wahrnehmen des Termins automatisch zurück erhalten. Sie können den
							Termin bis 24h vor Beginn absagen und erhalten die Kaution dann natürlich zurück.
							Weitere Informationen hierzu finden Sie in unseren AGB, denen Sie mit Buchen des
							Termins zustimmen.
						</Typography>
						<FormControlLabel
							sx={{ color: 'grey' }}
							control={
								<Checkbox checked={checked} onChange={handleChange} sx={{ color: 'grey' }} />
							}
							label="Ich stimme den AGB und den Datenschutzbestimmungen der ÄoG zu"
						/>
					</DialogContent>
					<DialogActions>
						<Button
							onClick={handleClose}
							variant="outlined"
							style={{ border: '1px solid grey', color: 'grey' }}>
							Abbrechen
						</Button>
						<Button
							onClick={handleSubmit}
							variant="outlined"
							style={{ border: '1px solid #A7BDA6', color: 'white', backgroundColor: '#A7BDA6' }}>
							Buchen
						</Button>
					</DialogActions>
				</Dialog>
			) : (
				<Modal
					open={open}
					onClose={handleClose}
					aria-labelledby="modal-modal-title"
					aria-describedby="modal-modal-description">
					<Box sx={stylePopupBox}>
						<Typography
							id="modal-modal-title"
							variant="h6"
							component="h2"
							sx={{ fontSize: '100%' }}>
							Bitte loggen Sie sich zuerst über den Login-Button ein!
						</Typography>
					</Box>
				</Modal>
			)}
		</>
	);
}
