import {
	Box,
	Button,
	Container,
	Typography,
	ListItem,
	ListItemText,
	TextField,
	styled,
	InputLabel,
	Select,
	MenuItem,
	InputBase,
	FormControl,
	Modal,
} from '@mui/material';
import Head from 'next/head';

import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import OfficeForm from '../components/OfficeForm/OfficeForm';
import { useContext, useEffect, useRef, useState } from 'react';
import { Doctor } from '../models/Doctors';
import Calendar from '../components/Calendar/Calendar';

import { WalletContent, WalletContext } from '../services/web3/wallets/walletProvider';
import { getDoctors } from '../services/web3/contracts/contractsProvider';

export default function Home() {
	const [isLoading, setLoading] = useState<boolean>(false);
	const [changeOfficeDataVisible, setChangeOfficeDataVisible] = useState(false);
	const { isLoggedIn, getAddress } = useContext<WalletContent>(WalletContext);
	const [doctor, setDoctor] = useState<Doctor | null>(null);

	useEffect(() => {
		const loadDocs = async () => {
			const docs = await getDoctors();
			if (!docs) return;

			const currentDoc = docs.find((doctor) => doctor.walletId === getAddress());
			if (!currentDoc) return;
			console.log(currentDoc);

			setDoctor(currentDoc);
		};

		if (isLoggedIn) {
			loadDocs();
		}
	}, [isLoggedIn, isLoading]);

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
					height: '100vh',
					position: 'relative',
					gap: '32px',
					'&::before': {
						content: '""',
						position: 'fixed',
						display: 'block',
						top: '0px',
						left: '0px',
						bottom: '0px',
						right: '0px',
						backgroundImage: 'url("/images/background.png")',
						backgroundSize: 'cover',
						backgroundRepeat: 'no-repeat',
						backgroundPosition: 'center',
						paddingBottom: '200px',
					},
				}}>
				<Container
					sx={{
						position: 'absolute',
						backgroundColor: 'rgba(255, 255, 255, 1)',
						width: '95%',
						//height: '120vh',
						color: 'secondary.main',
						fontSize: '120%',
						padding: '2vw',
						mt: '100px',
						mb: '120px',
						transform: 'translate(2.5%, 0%)',
						display: 'flex',
						flexDirection: 'row',
					}}>
					{doctor !== null ? (
						<Box
							sx={{
								display: 'flex',
								flexDirection: 'column',
								width: '100%',
								transform: 'translate(-2.5%, 0%)',
								margin: '20px',
								paddingBottom: '90px',
							}}>
							<Typography variant="h1">
								Ihre Termine, {doctor.firstname} {doctor.name}
							</Typography>
							<br></br>
							<Calendar anonym={false} doctor={doctor} />
							<Box
								sx={{
									display: 'flex',
									flexDirection: 'column',
									alignItems: 'center',
									justifyContent: 'center',
								}}>
								<Button
									variant={'contained'}
									onClick={() => setChangeOfficeDataVisible(true)}
									sx={{ height: '3em', fontSize: 14, mt: '2rem' }}>
									Praxisdaten bearbeiten
								</Button>
								{changeOfficeDataVisible ? (
									<Box
										sx={{
											border: '2px solid grey',
											borderRadius: '10px',
											mt: '35px',
											pb: '20px',
											alignItems: 'center',
											justifyContent: 'center',
										}}>
										<OfficeForm
											currdoctor={doctor}
											changeExistingData={true}
											isLoading={isLoading}
											setLoading={setLoading}
											setVisible={setChangeOfficeDataVisible}
										/>
									</Box>
								) : (
									''
								)}
							</Box>
						</Box>
					) : (
						<Container
							sx={{ display: 'flex', transform: 'translate(-3%, 0%)', paddingBottom: '15px' }}>
							<Box
								sx={{
									display: 'flex',
									flexDirection: 'column',
									width: '33%',
									// height: '70vh',
									backgroundColor: 'white',
									border: '3px solid tomato',
									borderBottomLeftRadius: '12%',
									borderTopRightRadius: '12%',
									margin: '2rem',
									padding: '15px',
								}}>
								<Container
									sx={{
										display: 'flex',
										flexDirection: 'row',
										// backgroundColor: 'blue',
									}}>
									<img
										src="/images/logo3.png"
										alt={'doc scheduler logo'}
										style={{
											height: '50%',
											// width: '35%',
											backgroundColor: 'white',
											transform: 'translate(-50px, -22px) rotate(-30deg)',
										}}
									/>
									<Typography
										variant="h2"
										sx={{
											width: '200%',
											transform: 'translate(-35px, 0px)',
											color: 'tomato',
											textAlign: 'center',
											// pt: '1rem',
											// backgroundColor: 'blue',
										}}>
										Werde Teil der Community!
									</Typography>
								</Container>
								<Typography variant="h5">
									Registrieren Sie ganz einfach Ihre Praxis und testen Sie 24 Stunden ihren neuen
									Praxiskalender.
								</Typography>
								<br></br>
								<Typography variant="h4" sx={{ color: 'primary.main', fontWeight: 'bold' }}>
									Lizenzgebühren: 100 €/ Monat, monatlich kündbar!
								</Typography>
								<br></br>
								<Typography variant="h5" sx={{}}>
									Sie können bis zu 6 verschiedene Terminkategorien mit entsprechender Länge
									definieren und eine individuelle Beschreibung Ihrer Praxis hinzufügen.
								</Typography>
								<br></br>
								<Typography variant="h5" sx={{}}>
									Seien Sie sichtbar und nutzen Sie die Vorteile unserer Community!
								</Typography>
							</Box>
							<OfficeForm
								currdoctor={doctor}
								changeExistingData={false}
								isLoading={isLoading}
								setLoading={setLoading}
								setVisible={setChangeOfficeDataVisible}
							/>
							{/* Ende rightSide */}
						</Container>
					)}
				</Container>
			</Box>
			<Footer />
		</>
	);
}
