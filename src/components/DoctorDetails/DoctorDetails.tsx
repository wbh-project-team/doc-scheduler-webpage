import { Avatar, Box, Container, InputBase, styled, TextField, Typography } from '@mui/material';
import { Doctor } from '../../models/Doctors';
import { useRouter } from 'next/router';
//import { CalendarPicker } from '@mui/x-date-pickers/CalendarPicker';
import DoctorCard from '../DoctorCard/DoctorCard';
import Calendar from '../Calendar/Calendar';


interface Props {
	doctor: Doctor;
}

export default function DoctorDetails({ doctor }: Props) {
	//{ doctor }: Props
	//const router = useRouter();
	//const { doctor } = router.query;
	// const {
	// 	query: { data },
	// 	} = router;
	// useEffect(() => {
	// 	if (!router.isReady) return;
	// 	console.log(router.query);
	// 	console.log(JSON.parse(router.query.doc))
	//   }, [router.isReady]);
	//const rawData = router.query.doc!;
	//const {docdata} = "";
	//if (typeof rawData === "string" && rawData !== "undefined") {
		//const docdata = JSON.parse(router.query.doc as string) || [];
		//JSON.parse(props.router.query.data);
	//}
	return <>
		
			<Box
				component="main"
				sx={{

					//height: '200px',
					backgroundColor: 'white',
					width: '100%',
					//color: 'secondary.main',
					color: 'tomato',
					margin: '15px',
					padding: '1vh',
				}}>
				<Typography sx={{fontSize: '100%'}}>
					Buche schnell einen Termin bei {doctor.name}!
				</Typography>
				<Container
					sx={{
						display: 'grid',
						gridTemplateColumns: '25% 75%',
						
					}}
				>
					<Box
						sx={{				
							backgroundColor: 'lightblue',
							color: 'secondary.main',
							fontSize: '1rem',
							display: 'grid',
							gridTemplateColumns: '1fr',
							gridTemplateRows: 'repeat(4, 1fr)',
							mt: '3rem',
							width: '100%',
						}}>
						
						<Box sx={{ display: 'grid', backgroundColor: 'white'}}>
							<Box sx={{display: 'grid', backgroundColor: 'white', alignItems: 'center', justifyContent: 'center' , width: '50%'}}> 
								<Avatar src="/images/portrait.jpeg" sx={{ width: '80px', height: '80px' }} />
							</Box>
							<Box
								sx={{
									display: 'flex',
									flexDirection: 'column',
									justifyContent: 'space-between',
									// alignItems: 'center',
								}}>
								<Box
									sx={{
										display: 'flex',
										flexDirection: 'row',
										alignItems: 'center',
										gap: '12px',
									}}>
									
									<Box sx={{ display: 'flex', flexDirection: 'column', gap: '0px' }}>
										<Typography variant="subtitle1" sx={{ fontWeight: 700, fontSize: '2em' }}>
											{doctor.name}
										</Typography>
										<Typography variant="caption" sx={{ fontWeight: 700 }}>
											{doctor.rating} / 5
										</Typography>
									</Box>
								</Box>
								<Box
									sx={{
										display: 'flex',
										flexDirection: 'column',
										justifyContent: 'center',
									}}>
									<Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
										{doctor.address}
									</Typography>
									<Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
										{doctor.zipCode} {doctor.city}
									</Typography>
									
								</Box>
								</Box>
							</Box>
							
							
							<Box sx={{display: 'grid', backgroundColor: 'white'}}> Öffnungszeiten:</Box>
							<Box sx={{display: 'grid', backgroundColor: 'white'}}> :</Box>
							
							

							
							<Typography sx={{ fonSize: '30%', pr: '1vw', backgroundColor: 'white',}}>
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
						<Box sx={{ width: '100%'}}>
						<Calendar></Calendar>
						</Box>
					</Box>
				</Container>
			</Box>
			

	
	
	</>;
}
