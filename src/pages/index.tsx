import {
	Box,
	Button,
	Container,
	InputBase,
	MenuItem,
	InputLabel,
	FormControl,
	Select,
	styled,
	TextField,
	Typography,
} from '@mui/material';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';

const CustomTextField = styled(TextField)(({ theme }) => ({
	'& .MuiInputBase-input': {
		color: theme.palette.secondary.main,
		borderRadius: 12,
		border: '2px solid #ced4da',
		boxShadow: 'inset 0px 4px 4px rgba(0, 0, 0, 0.25);',
		padding: '10px 26px 10px 12px',
	},
	'& .MuiOutlinedInput-root': {
		borderRadius: 12,
		backgroundColor: theme.palette.background.paper,
		padding: '0',
		'& fieldset': {
			color: '#000',
			padding: '0px',
			margin: '0px',
		},
		'&.Mui-focused fieldset': {
			border: 'solid 1px #808080',
		},
	},
}));

const BootstrapInput = styled(InputBase)(({ theme }) => ({
	'label + &': {
		// marginTop: theme.spacing(3),
		color: theme.palette.secondary.main,
	},
	'& .MuiInputBase-input': {
		color: theme.palette.secondary.main,
		borderRadius: 12,
		backgroundColor: theme.palette.background.paper,
		border: '1px solid #ced4da',
		boxShadow: 'inset 0px 4px 4px rgba(0, 0, 0, 0.25);',
		padding: '10px 26px 10px 12px',

		'&:focus': {
			borderRadius: 12,
		},
	},
}));

const areaOfExpertise = [
	{
		value: 'doctor',
		label: 'Hausarzt',
	},
	{
		value: 'dentist',
		label: 'Zahnarzt',
	},
	{
		value: 'surgeon',
		label: 'Chirurg',
	},
];

export default function Home() {
	const [currentZipCode, setZipCode] = useState<string>('Postleitzahl');
	const [currentAreaOfExpertise, setAreaOfExpertise] = useState<string>('doctor');
	const router = useRouter();

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
					//position: 'relative',
					alignItems: 'center',
					// width: '100vw',
					//mt: '70px', // nicht notwendig, Bild beginnt nach Navbar
					height: '100vh',
				}}>
				<Box
					sx={{
						height: '400px',
						width: '400px',
						position: 'absolute',
						zIndex: 0,
						top: '50%',
						left: '50%',
						transform: 'translate(-50%, -50%)',
						margin: '0 auto',
						borderRadius: 150,
						backgroundColor: 'divider',
						//opacity: 0.6,
					}}></Box>
				<Container
					component="section"
					sx={{
						//position: 'relative',
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						justifyContent: 'center',
						//minHeight: '900px', // nicht notwendig, wird mit 100vh auf jeweilige Hoehe skaliert
						height: '100vh',
						//py: '256px', // nicht mehr notwendig
						backgroundImage: 'url("/images/background.png")',
						backgroundSize: 'cover',
						backgroundPosition: 'center',
						gap: '32px',
					}}>
					<Typography
						sx={{ width: '500px', textAlign: 'center', textTransform: 'uppercase', zIndex: 1 }}
						variant="h1">
						Arzt-Termine Einfach Buchen
					</Typography>
					<Box
						sx={{
							display: 'flex',
							flexDirection: 'row',
							gap: '24px',
							alignItems: 'center',
						}}>
						<CustomTextField
							variant="outlined"
							sx={{ width: '150px' }}
							value={currentZipCode}
							onChange={(event) => setZipCode(event.target.value)} //todo add validation https://mui.com/material-ui/react-text-field/
							onFocus={() => {
								if (currentZipCode === 'Postleitzahl') {
									setZipCode('');
								}
							}}
							onBlur={() => {
								if (currentZipCode === '') {
									setZipCode('Postleitzahl');
								}
							}}
						/>
						<Select
							sx={{ height: '100%', width: '250px' }}
							input={<BootstrapInput />}
							id="demo-simple-select-error"
							value={currentAreaOfExpertise}
							onChange={(event) => setAreaOfExpertise(event.target.value)}>
							{areaOfExpertise.map((element) => (
								<MenuItem
									sx={{ color: 'secondary.main' }}
									key={element.value}
									value={element.value}>
									{element.label}
								</MenuItem>
							))}
						</Select>
						<Button
							variant={'contained'}
							onClick={() =>
								router.push(
									`/Doctors?zipCode=${currentZipCode}&areaOfExpertise=${currentAreaOfExpertise}`,
								)
							}>
							Suchen
						</Button>
					</Box>
				</Container>
			</Box>
			<Footer />
		</>
	);
}
