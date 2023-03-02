import {
	Box,
	Button,
	Container,
	Typography,
    ListItem,
    ListItemText,
    
} from '@mui/material';
import Head from 'next/head';

import { useRouter } from 'next/router';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';


export default function Home() {
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
                height: '100vh',
                //py: '256px', // nicht mehr notwendig
                backgroundImage: 'url("/images/background.png")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                gap: '32px',
            
            }}>
            
            <Container sx={{
                position: 'fixed',
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                width: '95%',
                color: 'secondary.main',
                fontSize: '120%',
                padding: '2vw',
                mt: '80px',
                transform: 'translate(2.5%, 10%)',
            }}>
            
                Our Vision
                
            
            </Container>

            </Box>
            
			<Footer />
		</>
	);
}