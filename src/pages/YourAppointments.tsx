import { Box, Typography } from '@mui/material';
import Head from 'next/head';
import Navbar from '../components/Navbar/Navbar';
import styles from '../styles/YourAppointments.module.css';

export default function YourAppointments() {
	return (
		<>
			<Head>
				<title>Ärzte ohne Grenzen</title>
				<meta name="description" content="Generated by create next app" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Navbar />
			<Box
				component="main"
				sx={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					width: '100vw',
					mt: '70px',
				}}></Box>
		</>
	);
}
