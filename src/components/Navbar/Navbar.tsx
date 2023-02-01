import * as React from 'react';
import { useContext, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Image from 'next/image';
import { AppBar, Button, Container, Divider, Toolbar, Typography } from '@mui/material';
import Link from 'next/link';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import CloseIcon from '@mui/icons-material/Close';
import { useRouter } from 'next/router';

import styles from './navbar.module.css';
import utilsStyles from '../../styles/utils.module.css';
import TextureBox from '../TextureBox/TextureBox';
import { WalletContent, WalletContext } from '../../services/web3/wallets/walletProvider';
import { ethers } from 'ethers';

interface Pages {
	name: string;
	link: string;
}

const pages: Pages[] = [
	{ name: 'Home', link: '/' },
	{ name: 'Deine Termine', link: '/YourAppointments' },
	{ name: 'Deine Praxis', link: '/DoctorsOffice' },
];

interface LogoProps {
	path: string;
	width: number;
	height: number;
	boxWidth: string;
}

function Navbar() {
	const router = useRouter();
	const [currentPage, setCurrentPage] = useState<number>(0);
	const [menuIsOpen, openMenu] = useState<boolean>(false);
	const { isLoggedIn, login, logout, getAddress, getBalance, getPrivateKey } =
		useContext<WalletContent>(WalletContext);

	useEffect(() => {
		for (let i = 0; i < pages.length; i++) {
			if (router.pathname === pages[i].link) {
				setCurrentPage(i);
			}
		}
	}, [router.pathname]);

	const Logo = ({ path, width, height, boxWidth }: LogoProps) => {
		return (
			<Box className={styles['image-container']} sx={{ width: boxWidth }}>
				<Image className={styles.image} src={path} alt={'logo'} width={width} height={height} />
			</Box>
		);
	};

	const MenuButton = () => {
		return (
			<Button
				onClick={() => openMenu(!menuIsOpen)}
				variant="contained"
				color="secondary"
				sx={{
					paddingX: '10px',
					minWidth: '0',
				}}>
				{!menuIsOpen ? (
					<MenuRoundedIcon fontSize="small" sx={{ color: '#000' }} />
				) : (
					<CloseIcon fontSize="small" sx={{ color: '#000' }} />
				)}
			</Button>
		);
	};

	const MenuPage = () => {
		if (!menuIsOpen) return null;

		return (
			<Box
				sx={{
					position: 'absolute',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'space-between',
					top: '5rem',
					left: 0,
					minHeight: 'calc(100vh - 5.1rem)',
					width: '100vw',
					overflow: 'visible',
					backgroundColor: 'background.default',
				}}>
				<div></div>
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						justifyContent: 'center',
						width: '100%',
					}}>
					{pages.map((key, index) => {
						return (
							<React.Fragment key={index}>
								<Button
									href={key.link}
									component={Link}
									color="secondary"
									sx={{
										my: '0.5rem',
										fontSize: '2rem',
										color: index === currentPage ? 'grey.600' : 'secondary.main',
									}}>
									{key.name}
								</Button>
								<Divider variant="middle" flexItem />
							</React.Fragment>
						);
					})}
				</Box>
				<Button variant="contained" sx={{ mb: '1rem' }}>
					+ neue Praxis
				</Button>
			</Box>
		);
	};

	return (
		<AppBar className={`${styles['appbar']}`} position="fixed" color="transparent">
			<TextureBox>
				<Container maxWidth={'desktop'} className={`${utilsStyles['fillHeight']}`}>
					<Toolbar className={`${utilsStyles['fillHeight']}`}>
						{/* Desktop */}
						<Box
							className={`${utilsStyles['row-layout']} ${utilsStyles['space-between']} ${utilsStyles['fill']}`}
							sx={{ display: { mobile: 'none', laptop: 'flex' } }}>
							{/* <Logo path="/images/logo.svg" width={400} height={200} boxWidth={'20rem'} /> */}
							<Typography variant="h2">Ärzte ohne Grenzen</Typography>
							<Box
								className={`${utilsStyles['row-layout']} ${utilsStyles['space-between']}`}
								component={'nav'}>
								{pages.map((key, index) => {
									return (
										<Button
											key={key.link}
											href={key.link}
											component={Link}
											sx={{
												mx: '1.25rem',
												color: index === currentPage ? 'grey.600' : 'secondary.main',
											}}>
											{key.name}
										</Button>
									);
								})}
							</Box>
							<Box className={`${utilsStyles['row-layout']} ${utilsStyles['space-between']}`}>
								<Button
									onClick={async () => {
										console.log(getAddress());
										console.log(ethers.utils.formatEther(await getBalance()));

										console.log(await getPrivateKey());
									}}
									color="secondary"
									sx={{ mr: '1.25rem' }}
									variant="outlined"
									className={`${utilsStyles['horizontal-margin']}`}>
									+ neue Praxis
								</Button>
								{!isLoggedIn ? (
									<Button
										onClick={async () => {
											await login();
										}}
										sx={{ ml: '1.25rem' }}
										variant="contained">
										Log in
									</Button>
								) : (
									<Button
										onClick={async () => {
											await logout();
										}}
										sx={{ ml: '1.25rem' }}
										variant="contained">
										Logout
									</Button>
								)}
							</Box>
						</Box>
						{/* Tablet + Laptop */}
						<Box
							className={`${utilsStyles['row-layout']} ${utilsStyles['space-between']} ${utilsStyles['fill']}`}
							sx={{ display: { mobile: 'none', tablet: 'flex', laptop: 'none' } }}>
							{/* <Logo path="/images/logo.svg" width={631.67} height={70.71} boxWidth={'17.5rem'} /> */}
							<Typography variant="h2" sx={{ fontSize: '16px' }}>
								Ärzte ohne Grenzen
							</Typography>
							<Box className={`${utilsStyles['row-layout']} ${utilsStyles['space-between']}`}>
								{!isLoggedIn ? (
									<Button
										onClick={async () => {
											await login();
										}}
										sx={{ mr: '0.75rem' }}
										variant="contained">
										Log in
									</Button>
								) : (
									<Button
										onClick={async () => {
											await logout();
										}}
										sx={{ mr: '0.75rem' }}
										variant="contained">
										Logout
									</Button>
								)}
								<MenuButton />
							</Box>
						</Box>
						{/* Mobile */}
						<Box
							className={`${utilsStyles['row-layout']} ${utilsStyles['space-between']} ${utilsStyles['fill']}`}
							sx={{ display: { mobile: 'flex', tablet: 'none' } }}>
							<Box className={styles['image-container-small']}>
								{/* <Logo path="/images/logo.svg" width={500} height={500} boxWidth={'1.75rem'} /> */}
								<Typography variant="h2" sx={{ fontSize: '16px' }}>
									Ärzte ohne Grenzen
								</Typography>
							</Box>
							<Box className={`${utilsStyles['row-layout']} ${utilsStyles['space-between']}`}>
								{!isLoggedIn ? (
									<Button
										onClick={async () => {
											await login();
										}}
										sx={{ mr: '0.75rem' }}
										variant="contained">
										Log in
									</Button>
								) : (
									<Button
										onClick={async () => {
											await logout();
										}}
										sx={{ mr: '0.75rem' }}
										variant="contained">
										Logout
									</Button>
								)}
								<MenuButton />
							</Box>
						</Box>
					</Toolbar>
				</Container>
			</TextureBox>
			<MenuPage />
		</AppBar>
	);
}
export default Navbar;
