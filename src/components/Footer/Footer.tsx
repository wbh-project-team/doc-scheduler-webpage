import * as React from 'react';
import { styled } from '@mui/material/styles';
import { useContext, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Image from 'next/image';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import SendIcon from '@mui/icons-material/Send';
import {
	AppBar,
	BottomNavigation,
	BottomNavigationAction,
	Button,
	Container,
	Fab,
	IconButton,
	Link as MuiLink,
	Modal,
	Toolbar,
	Typography,
	useMediaQuery,
} from '@mui/material';

import HomeIcon from '@mui/icons-material/Home';

//import Link from 'next/link';
import { useRouter } from 'next/router';
import { links_left, links_right } from './Links';

const StyledFab = styled(Fab)({
	position: 'absolute',
	zIndex: 1,
	top: -30,
	left: 0,
	right: 0,
	margin: '0 auto',
});

const stylePopupBox = {
	display: 'block',
	position: 'fixed',
	zIndex: 2,
	top: '0',
	left: '0',
	transform: `translate(calc(50vw - 250px), calc(50vh - 100px))`,
	width: '500px',
	//height: '200px',
	bgcolor: 'white',
	color: 'secondary.main',
	border: '2px solid #000',
	borderRadius: '10px',
	boxShadow: 24,
	p: 4,
};

export default function Footer() {
	const [scrolled, setScrolled] = useState(false);
	const [open, setHotlineBoxOpen] = useState(false);
	const handleHotlineBoxOpen = () => setHotlineBoxOpen(true);
	const handleHotlineBoxClose = () => setHotlineBoxOpen(false);
	const router = useRouter();

	const [value, setValue] = useState(0);

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
		<AppBar
			position="fixed"
			color="primary"
			sx={[
				{ top: 'auto', bottom: 0, height: '60px', display: 'flex' },
				scrolled ? {} : { boxShadow: '0 -10px 15px -5px rgba(0,0,0,0.5);' },
			]}>
			<Toolbar sx={{ height: '100%', padding: 0 }}>
				{/* <IconButton color="inherit" aria-label="open drawer">
				<FavoriteOutlinedIcon /><br/>
			</IconButton>
			 */}
				<BottomNavigation
					// showLabels
					value={value}
					sx={{
						width: '100%',
						backgroundColor: 'primary.main',
						'& .MuiBottomNavigationAction-label': {
							fontSize: (theme) => theme.typography.caption,
							transition: 'none',
							fontWeight: 'bold',
							lineHeight: '20px',
						},
						'& .MuiSvgIcon-root, & .MuiBottomNavigationAction-label': {
							color: (theme) => theme.palette.primary.contrastText,
						},
					}}
					onChange={(event, newValue) => {
						setValue(newValue);
					}}>
					<BottomNavigationAction
						label="Hotline"
						showLabel={true}
						icon={<ContactPhoneIcon />}
						onClick={() => {
							handleHotlineBoxOpen();
						}}
						//handleOpen
					/>
					<BottomNavigationAction
						label="Email"
						showLabel={true}
						icon={<SendIcon />}
						href={'mailto:frame.b849c5@nicoric.com'}
						onClick={() => {}}
					/>
					{links_left.map((item) => (
						<BottomNavigationAction
							key={item.name}
							label={item.name}
							showLabel={true}
							icon={item.icon ? <item.icon /> : null}
							onClick={() => router.push(`${item.link}`)}
						/>
					))}
					<Box sx={{ flexGrow: 1 }} />
					{links_right.map((item) => (
						<BottomNavigationAction
							key={item.name}
							sx={{ fontSize: 14, fontWeight: 600, padding: '16px 60px' }}
							showLabel={false}
							label={item.name}
							icon={item.name}
							onClick={() => router.push(`${item.link}`)}
						/>
					))}
				</BottomNavigation>

				<StyledFab
					color="secondary"
					aria-label="home"
					sx={{ color: '#fff' }}
					onClick={() => router.push('/')}>
					<HomeIcon />
				</StyledFab>
			</Toolbar>
			{/* <Box sx={styleHotlineBox}>
				Teeeeeeest
			</Box> */}

			<Modal
				open={open}
				onClose={handleHotlineBoxClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description">
				<Box sx={stylePopupBox}>
					<ContactPhoneIcon />
					<Typography id="modal-modal-title" variant="h6" component="h2" sx={{ fontSize: '100%' }}>
						Haben Sie Fragen?
					</Typography>
					<Typography id="modal-modal-description" sx={{ mt: 2 }}>
						Ihre Frage wird in den FAQs nicht ausreichend beantwortet? Kein Problem, wir sind für
						Sie da. Rufen Sie uns an!
					</Typography>
					<Typography>(Mo-Fr von 8-18Uhr)</Typography>
					<Typography sx={{ mt: 2, fontWeight: '1000', fontSize: '150%' }}>
						{' '}
						Hotline: 0800 33 00000
					</Typography>
				</Box>
			</Modal>
		</AppBar>
	);
}
