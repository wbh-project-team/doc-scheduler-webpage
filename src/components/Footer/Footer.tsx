import * as React from 'react';
import { styled } from '@mui/material/styles';
import { useContext, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Image from 'next/image';

import {
	AppBar,
	BottomNavigation,
	BottomNavigationAction,
	Button,
	Container,
	Fab,
	IconButton,
	Link as MuiLink,
	Toolbar,
	Typography,
	useMediaQuery,
} from '@mui/material';

import HomeIcon from '@mui/icons-material/Home';
import BorderVerticalSharpIcon from '@mui/icons-material/BorderVerticalSharp';

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

export default function Footer() {
	//const [scrolled, setScrolled] = useState(false);
	const router = useRouter();

	const [value, setValue] = React.useState(0);

	return (
		<AppBar
			position="fixed"
			color="primary"
			sx={{ top: 'auto', bottom: 0, height: '60px', display: 'flex' }}>
			<Toolbar sx={{ height: '100%', padding: 0 }}>
				{/* <IconButton color="inherit" aria-label="open drawer">
				<FavoriteOutlinedIcon /><br/>
			</IconButton>
			 */}

				{/* <Box sx={{
				width: '30%',
				justifyContent: 'space-between',
				alignItems: 'left',
			}}> */}
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

				<StyledFab color="secondary" aria-label="home" sx={{ color: '#fff' }} onClick={() => router.push('/')}>
					<HomeIcon />
				</StyledFab>
			</Toolbar>
		</AppBar>
	);
}
