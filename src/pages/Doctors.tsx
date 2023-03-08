import { Box, Container, InputBase, styled, TextField, Typography } from '@mui/material';
import Head from 'next/head';
import { useRouter } from 'next/router';
//import { useReducer } from 'react';
import { useContext, useEffect, useState } from 'react';
import { areaOfExpertise, Doctor, docs } from '../models/Doctors';
import DoctorCard from '../components/DoctorCard/DoctorCard';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import DoctorDetails from '../components/DoctorDetails/DoctorDetails';
import { getDoctors } from '../services/web3/contracts/contractsProvider';
import { WalletContent, WalletContext } from '../services/web3/wallets/walletProvider';

const defaultDetailsVisible = false;

export default function Home() {
	const router = useRouter();
	const { zipCode, currAreaOfExpertise } = router.query;
	const [detailsVisible, setDetailsVisible] = useState(defaultDetailsVisible);
	const [docForDetails, setDocForDetails] = useState<Doctor | null>(null);
	const [doctors, setDoctors] = useState<Doctor[]>([]);
	const { isLoggedIn } = useContext<WalletContent>(WalletContext);

	function handleCardClick(doc: Doctor) {
		setDetailsVisible(false);
		setDocForDetails(doc);
	}

	useEffect(() => {
		const loadDocs = async () => {
			const docs = await getDoctors();
			if (!docs) return;

			setDoctors(docs);
			console.log(docs);
		};

		loadDocs();
	}, [isLoggedIn]);

	useEffect(() => {
		if (docForDetails) {
			setDetailsVisible(true);
			document.body.scrollTo({ top: 0, behavior: 'smooth' });
		}
	}, [docForDetails]);

	function generateDetails() {
		if (detailsVisible) {
			return <DoctorDetails doctor={docForDetails!}></DoctorDetails>;
		}
		return '';
	}

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
					height: `calc(100vh - 60px)`,
					pt: '80px',
				}}>
				<Container
					component="section"
					sx={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						height: '100%',
						p: '24px',
						position: 'relative',
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
					{detailsVisible && (
						<Box
							id="Details"
							sx={{
								zIndex: 0,
								display: 'flex',
								backgroundColor: 'tomato',
								marginTop: '15px',
								width: '100%',
								fontSize: '200%',
								fontWeight: 'light',
								marginBottom: '15px',
							}}>
							{generateDetails()}
						</Box>
					)}
					<Box
						sx={{
							display: 'flex',
							backgroundColor: 'blue',
						}}>
						<Box
							sx={{
								position: 'absolute',
								transform: 'translate(-50%, 0%)',
								display: 'grid',
								gridTemplateColumns: 'repeat(auto-fill, minmax(650px, 1fr))',
								gap: '15px',
								width: '95%',
							}}>
							<Box
								id="results"
								sx={{
									//zindex: 1,
									gridColumn: '1/-1',
									color: 'secondary.main',
									backgroundColor: 'white',
									padding: '30px 10px',
									overflow: 'hidden',
									fontSize: '200%',
									fontWeight: 'bold',
									textAlign: 'center',
								}}>
								Deine Suchergebnisse zu:{' '}
								{areaOfExpertise[currAreaOfExpertise as keyof typeof areaOfExpertise]} in {zipCode}
							</Box>
							{doctors
								.filter((doctor) => {
									if (!zipCode) return null;
									if (
										doctor.specialization == currAreaOfExpertise &&
										doctor.zipCode > +zipCode - 1000 &&
										doctor.zipCode < +zipCode + 1000 // TODO: Suchkreis anpassen
									) {
										return doctor;
									}
								})
								.map((doctor) => (
									<DoctorCard
										key={doctor.id}
										doctor={{
											id: +doctor.id,
											walletId: doctor.walletId,
											firstname: doctor.firstname,
											name: doctor.name,
											address: doctor.address,
											zipCode: doctor.zipCode,
											city: doctor.city,
											openHours: doctor.openHours,
											specialization: doctor.specialization,
											consultationCategories: doctor.consultationCategories,
											description: doctor.description,
											rating: doctor.rating,
										}}
										onclick={() => handleCardClick(doctor)}
									/>
								))}
						</Box>
					</Box>
				</Container>
			</Box>
			<Footer />
		</>
	);
}
