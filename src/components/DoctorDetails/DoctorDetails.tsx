import { Box, Container, InputBase, styled, TextField, Typography } from '@mui/material';
import Head from 'next/head';
import { Doctor } from '../../models/Doctors';
import { useRouter } from 'next/router';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import { useEffect } from 'react';
import DoctorCard from '../DoctorCard/DoctorCard';


interface Props {
	doctor: Doctor;
}

export default function DoctorDetails({ doctor }: Props) {
	//{ doctor }: Props
	const router = useRouter();
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
						gridTemplateColumns: '50% 50%',
						
					}}
				>
					<Box
						sx={{				
							
							color: 'secondary.main',
							fontSize: '0.8rem',
						}}
					>
						
						
							<DoctorCard
								key={doctor.name}
								doctor={{
									Id: doctor.Id,
									name: doctor.name,
									address: doctor.address,
									zipCode: doctor.zipCode,
									city: doctor.city,
									openHours: doctor.openHours,
									specialization: doctor.specialization,
									description: doctor.description,
									rating: doctor.rating,
								}}
								onclick={() => {}}
								

							
							/>
						
						<Typography
							sx={{ fonSize: '30%', pr: '1vw'}}
						>
							{doctor.description}
						</Typography>	
						
					</Box>
					<Box
						sx={{
							display: 'flex',
							flexGrow: '1',
							backgroundColor: 'lightblue',
							
					}}>

					
						Kalender
					</Box>
				</Container>
			</Box>
			

	
	
	</>;
}
