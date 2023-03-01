import { Box, Container, InputBase, styled, TextField, Typography } from '@mui/material';
import Head from 'next/head';
import { Doctor } from '../../models/Doctors';
import { useRouter } from 'next/router';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import { useEffect } from 'react';


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

					height: '200px',
					backgroundColor: 'white',
					width: '100%',
					color: 'secondary.main'
					
				}}>
				Auswahl:
				<Container
					sx={{
						display: 'flex',
						flexDirection: 'row',
						justifyContent: 'space-between',
					}}>

				<Box
					sx={{
						display: 'flex',
						flexGrow: '1',
						
					}}>

				
					Name: {doctor.name}
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
