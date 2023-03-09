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
		<Container
			sx={{
				display: 'flex',
				flexDirection: 'column',
				
			}}
		
		>
			<Box
				component="main"
				sx={{
					backgroundColor: 'white',
					width: '100%',
					color: 'secondary.main',
					mt: '15px',
					padding: '1vh',
					display: 'flex',
					flexDirection: 'column',
					rowGap: '10px',
				}}>
					<Typography variant='subtitle1' sx={{fontWeight: 'bold'}}>
						Und so funktioniert es:
					</Typography>
					<Typography variant='body1' sx={{paddingLeft: '15px'}}>
						<ul>
						<li>
							Für eine Terminbuchung müssen Sie sich über den Login-Button oben rechts einloggen und dann am Besten unter "Mein Account" Ihren Namen eintragen, damit Ihr Arzt Sie in seinem Kalender zuordnen kann.
						</li>
						<li>
							Um einen Termin zu buchen, müssen Sie dann nur auf den entsprechenden Tag im Kalender klicken, eine Uhrzeit und Terminkategorie auswählen und den AGB zustimmen.
						</li>
						<li>
							Die Kalenderwoche kann über die Drop-Down Menüs oberhalb des Kalenders ausgewählt werden.
						</li>
						
						</ul>
					</Typography>
					<Typography variant='subtitle1' sx={{fontWeight: 'bold'}}>
						Bitte beachten Sie:
					</Typography>
					<Typography variant='body1' sx={{paddingLeft: '15px'}}>
						<ul>
						<li>
							<Typography display='inline'>Um Ihrem Arzt eine gewisse Planungssicherheit zu geben, sieht das Konzept dieses Buchungsportals vor, 
							dass jeder Patient für seinen gebuchten</Typography>
							<Typography display='inline' sx={{fontWeight: 700, color: 'tomato'}}>&nbsp;Termin 10€ Kaution hinterlegt</Typography>.
							
						</li>
						<li>
							<Typography display='inline'>Diese Kaution erhalten Sie selbstverständlich automatisch zurück, 
								sobald sie Ihren Termin wahrgenommen haben, oder falls Sie diesen bis</Typography>
							<Typography display='inline' sx={{fontWeight: 700, color: 'tomato'}}>&nbsp; 24 Stunden vorher absagen</Typography>.
							
						</li>
						<li>
							<Typography display='inline'>
								Für die Terminbuchung müssen Sie sich daher mit dem externen Service von 
								<Typography display='inline' sx={{fontWeight: 700,}}>&nbsp;web3auth</Typography> über den Login-Button dieses Portals einloggen, wodurch automatisch ein Wallet für Kryptowährung für Sie erstellt wird. 
								Um einen Termin buchen zu können, müssen Sie mindestens einen Betrag von 10€ pro Termin in Ihr (neu erstelltes) Wallet laden. 
								Dies können Sie ganz bequem über den entsprechenden Button über z.B. Paypal machen (Button muss noch eingearbeitet werden, 
								in der Testumgebung wird mit Test-Ether bezahlt).</Typography>
							</li>
						</ul>
					</Typography>
			</Box>
			<Box
				component="main"
				sx={{
					backgroundColor: 'white',
					width: '100%',
					color: 'tomato',
					margin: '15px 0 15px 0',
					padding: '1vh',
				}}>
				<Typography sx={{ fontSize: '100%' }}>
					Buche schnell einen Termin bei {doctor.firstname}{' '}{doctor.name}!
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
			</Container>
		</>
	);
}
