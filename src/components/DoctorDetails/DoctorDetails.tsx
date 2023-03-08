import { Avatar, Box, Container, Typography } from '@mui/material';
import { areaOfExpertise, Doctor } from '../../models/Doctors';
import Calendar from '../Calendar/Calendar';

const weekdays = ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag'];

interface Props {
	doctor: Doctor;
}

export default function DoctorDetails({ doctor }: Props) {
	return (
		<>
			<Box
				component="main"
				sx={{
					//height: '200px',
					backgroundColor: 'white',
					width: '100%',
					color: 'tomato',
					margin: '15px',
					padding: '1vh',
				}}>
				<Typography sx={{ fontSize: '100%' }}>
					Buche schnell einen Termin bei {doctor.firstname} {doctor.name}!
				</Typography>
				<Container
					sx={{
						display: 'grid',
						gridTemplateColumns: '25% 75%',
					}}>
					<Box
						sx={{
							//backgroundColor: 'lightblue',
							color: 'secondary.main',
							fontSize: '1rem',
							display: 'grid',
							width: '100%',
							gridTemplateColumns: '1fr',
							//    gridTemplateRows: 'repeat(4, 1fr)',
							//   mt: '3rem',
							//  width: '100%'
						}}>
						<Box sx={{ display: 'grid', }}>
							<Box
								sx={{
									display: 'grid',
									//backgroundColor: 'white',
									alignItems: 'center',
									justifyContent: 'left',
									padding: '3vh',
									//   width: '50%',
								}}>
                  <Avatar 
                    //src="/images/portrait.jpeg" 
                    sx={{ width: '12vh', height: '12vh' }} />
							</Box>
							<Box
								sx={{
									display: 'flex',
									flexDirection: 'column',
									gap: '0px',
									// backgroundColor: 'blue',
								}}>
								<Typography variant="subtitle1" sx={{ fontWeight: 700, pt: '2vh' }}>
									{areaOfExpertise[doctor.specialization]}
								</Typography>
								<Typography variant="subtitle1" sx={{ fontWeight: 700, fontSize: '2em' }}>
									{doctor.firstname}{' '}
									{doctor.name}
								</Typography>
							</Box>
							<Box
								sx={{
									display: 'flex',
									flexDirection: 'column',
									justifyContent: 'center',
									//backgroundColor: 'lightgreen',
								}}>
								<Typography variant="subtitle1" sx={{ pt: '0.5vh', fontWeight: 700 }}>
									Adresse:
								</Typography>
								<Typography variant="subtitle1">{doctor.address}</Typography>
								<Typography variant="subtitle1">
									{doctor.zipCode} {doctor.city}
								</Typography>
							</Box>
						</Box>

						<Box sx={{ display: 'grid', width: '40%' }}>
							<Typography
								variant="subtitle1"
								sx={{
									pt: '0.5vh',
									fontWeight: 700,
								}}>
								Öffnungszeiten:
							</Typography>
							{doctor.openHours.map((day, index) => (
								<Box
									key={index}
									sx={{
										display: 'flex',
										flexDirection: 'column',
										justifyContent: 'center',
										alignItems: 'center',
										pb: 'em',
                    paddingBottom: '10px',
									}}>
									<Typography variant="overline" sx={{ fontWeight: 'normal' }}>
										{weekdays[index]}
									</Typography>
									<Typography variant="h6" sx={{ fontWeight: '1000' }}>
										{(day.openingTime / 60 / 60 / 1000).toFixed(2)}-
										{(day.lunchStart / 60 / 60 / 1000).toFixed(2)}
									</Typography>
									<Typography variant="h6" sx={{ fontWeight: '1000' }}>
										{(day.lunchEnd / 60 / 60 / 1000).toFixed(2)}-
										{(day.closingTime / 60 / 60 / 1000).toFixed(2)}
									</Typography>
								</Box>
							))}
						</Box>
						{/* <Box sx={{ display: 'grid', backgroundColor: 'white' }}> :</Box> */}
            <Typography variant="subtitle1" sx={{pt: '0.5vh',  fontWeight: 700 }}>Beschreibung: </Typography>
						<Typography sx={{ fonSize: '30%', pr: '1vw', backgroundColor: 'white' }}>
							{doctor.description}
						</Typography>
					</Box>
					<Box
						sx={{
							display: 'flex',
							flexGrow: '1',
							// backgroundColor: 'lightblue',
							color: 'secondary.main',
							fontSize: '60%',
						}}>
						<Box sx={{ width: '100%' }}>
							<Calendar doctor={doctor} anonym={true}></Calendar>
						</Box>
					</Box>
				</Container>
			</Box>
		</>
	);
}
