import * as React from 'react';
import { useContext, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Image from 'next/image';
import {
	AppBar,
	Button,
	Container,
	Link as MuiLink,
	Toolbar,
	Typography,
	useMediaQuery,
} from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { pages } from './Pages';
import { WalletContent, WalletContext } from '../../services/web3/wallets/walletProvider';

interface LogoProps {
	path: string;
	boxWidth: string;
}

export default function Navbar() {
	const [scrolled, setScrolled] = useState(false);
	const router = useRouter();
	const [currentPage, setCurrentPage] = useState<number>(0);
	const isMobile = useMediaQuery('(max-width:550px)');
	const { isLoggedIn, login, logout, getAddress, getBalance, getPrivateKey } =
		useContext<WalletContent>(WalletContext);

	useEffect(() => {
		for (let i = 0; i < pages.length; i++) {
			if (router.pathname === pages[i].link) {
				setCurrentPage(i);
				return;
			}
		}
		setCurrentPage(-1);
	}, [router.pathname]);

	useEffect(() => {
		const handleScroll = () => {
			setScrolled(window.scrollY > 0);
		};
		window.addEventListener('scroll', handleScroll);

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);

	return (
		<>
			<AppBar
				sx={[{ height: '80px', display: 'flex' }, scrolled ? {} : { boxShadow: 'none' }]}
				position={'fixed'}>
				<Container maxWidth={'desktop'} sx={{ height: '100%', padding: 0 }}>
					<Toolbar sx={{ height: '100%', padding: 0 }}>
						<Box
							sx={{
								display: { mobile: 'none', laptop: 'flex' },
								height: '100%',
								width: '100%',
								justifyContent: 'space-between',
								alignItems: 'center',
								mt: '2px',
								padding: '16px 24px',
							}}>
							<Link style={{ height: '100%', width:'282px'}} href={'/'}>
								<img src="/images/logo.png" alt={'doc scheduler logo'} style={{ height: '100%' }} />
							</Link>
							<Box
								sx={{
									display: 'flex',
									justifyContent: 'space-between',
									gap: '24px',
									alignItems: 'center',
									flexDirection: 'row',
								}}
								component={'nav'}>
								{pages.map((key, index) => {
									return (
										<Button
											key={key.link}
											href={key.link}
											component={Link}
											color="secondary"
											sx={{
												// color: index === currentPage ? '#fff' : 'secondary.main',
												color: '#fff',
												textTransform: 'none',
												fontSize: 14,
											}}>
											{key.name}
										</Button>
									);
								})}
							</Box>
							<Box sx={{ width:'282px', textAlign: 'right'}}>
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
					</Toolbar>
				</Container>
			</AppBar>
		</>
	);
}
