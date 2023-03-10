import {
	Box,
	Button,
	Container,
	Typography,
	ListItem,
	ListItemText,
	TextField,
	styled,
	Avatar,
	FormControl,
	FormHelperText,
} from '@mui/material';
import Head from 'next/head';
import { WalletContent, WalletContext } from '../services/web3/wallets/walletProvider';
import { useRouter } from 'next/router';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import { BigNumber, BigNumberish, ethers } from 'ethers';
import { useContext, useEffect, useRef, useState } from 'react';
import { getPatientNameCid, storeCid } from '../services/web3/contracts/contractsProvider';
import { ipfsUpload, retrieve } from '../services/ipfs/ipfsProvider';

const CustomTextField = styled(TextField)(({ theme }) => ({
	color: 'secondary.main',
	'& label': {
		color: theme.palette.secondary.main,
	},
	'& .MuiInputBase-input': {
		color: theme.palette.secondary.main,
		padding: '10px 26px 15px 12px',
	},
	'& .MuiOutlinedInput-root': {
		borderRadius: 12,

		backgroundColor: theme.palette.background.paper,
		padding: '0',
		'& fieldset': {
			color: '#000',
			padding: '0px',
			margin: '0px',
			border: '2px solid #ced4da',
		},
		// '&.Mui-focused fieldset': {
		//   border: 'solid 1px #808080'
		// }
	},
}));

export default function Home() {
	const [balance, setBalance] = useState<BigNumberish>(0);
	const { isLoggedIn, login, logout, getAddress, getBalance, getPrivateKey } =
		useContext<WalletContent>(WalletContext);

	const [name, setName] = useState<string>('');
	const textFieldUserName = useRef<HTMLInputElement>();

	useEffect(() => {
		const fetchBalance = async () => {
			const currBalance = await getBalance();
			setBalance(currBalance);
		};
		const loadName = async () => {
			const cid = await getPatientNameCid(getAddress());
			if (cid === '') return;

			const tempName = await retrieve(cid);
			setName(tempName.name);
		};

		if (isLoggedIn) {
			fetchBalance();
			loadName();
		}
	}, [isLoggedIn]);
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
						backgroundColor: 'rgba(255, 255, 255, 0.9)',
						width: '95%',
						// height: '120vh',
						color: 'secondary.main',
						fontSize: '120%',
						padding: '2vw',
						mt: '100px',
						mb: '120px',
						display: 'flex',
						flexDirection: 'column',
						rowGap: '1em',
						transform: 'translate(2.5%, 0%)',
						paddingBottom: '10vh',
					}}>
					<Typography variant="h2">
						Deine Account-Daten
						{textFieldUserName.current
							? textFieldUserName.current.value.length > 0
								? ', ' + textFieldUserName.current.value
								: ', ' + name
							: ''}
					</Typography>
					<br />
					<Typography variant="body1">Meine Wallet Adresse: {getAddress()}</Typography>
					<Typography variant="body1">
						Mein Wallet Kontostand: {ethers.utils.formatEther(balance)} ETH
					</Typography>
					<Box sx={{ display: 'flex', flexDirection: 'row', gap: '10px', alignItems: 'baseline' }}>
						<Typography variant="body1">Mein Name:</Typography>
						<FormControl>
							<CustomTextField
								sx={{
									color: 'secondary.main',
									height: '1em',
									backgroudColor: 'white',
								}}
								inputRef={textFieldUserName}
								value={name}
								onChange={(event) => setName(event.target.value)}
								onBlur={async () => {
									const cid = await ipfsUpload(name);
									if (!cid) return;
									storeCid(cid.toString());
								}}
							/>
							F
							<FormHelperText sx={{ color: 'secondary.main' }}>
								Wenn Sie einen Namen angeben, kann Ihr Arzt Ihren Termin direkt zuordnen
							</FormHelperText>
						</FormControl>
					</Box>
					<br />
					<Box sx={{ display: 'flex', flexDirection: 'row', gap: '10px', alignItems: 'baseline' }}>
						<Typography variant="body1">Meine Termine:</Typography>

						<Avatar onClick={() => router.push('../YourAppointments')}>➜</Avatar>
					</Box>
				</Container>
			</Box>

			<Footer />
		</>
	);
}
