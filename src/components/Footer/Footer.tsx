import * as React from 'react';
import { styled } from '@mui/material/styles';
import styles from "./footer.module.css";
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
	const [currentPage, setCurrentPage] = useState<number>(0);
	const isMobile = useMediaQuery('(max-width:550px)');

	useEffect(() => {
		for (let i = 0; i < links_left.length; i++) {
			if (router.pathname === links_left[i].link) {
				setCurrentPage(i);
				return;
			}
		}
		setCurrentPage(-1);
		for (let i = 0; i < links_right.length; i++) {
			if (router.pathname === links_right[i].link) {
				setCurrentPage(i);
				return;
			}
		}
		setCurrentPage(-1);
	}, [router.pathname]);

	const [value, setValue] = React.useState(0);

	return  (
	<AppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: 0 }}>
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
					showLabels
					value={value}
					sx={{
						width: '100%',
						backgroundColor: 'primary.main', 
						'& .MuiBottomNavigationAction-label': {
							fontSize: theme => theme.typography.caption,
							transition: 'none',
							fontWeight: 'bold',
							lineHeight: '20px'
						  },
						  '& .MuiSvgIcon-root, & .MuiBottomNavigationAction-label': {
							color: theme => theme.palette.primary.contrastText
						  }
					 	}}
					onChange={(event, newValue) => {
						setValue(newValue);
					}}
				>
					{links_left.map((item) => (
						
						<BottomNavigationAction
							label = {item.name}
							icon = {<item.icon/>} 
							onClick={() => router.push('${item.link}')}
						/>	
					))}
					<Box sx={{ flexGrow: 1 }} />
					{links_right.map((item) => (
						<Box>
						<BottomNavigationAction
						sx={{fontSize: 14, fontWeight: 600, padding: '16px 60px'}}
							showLabel={false}
							label = {item.name}
							icon = {item.name} 
							onClick={() => router.push('${item.link}')}
						/>
						{/* <BottomNavigationAction
							showLabel={false}
							icon = {<BorderVerticalSharpIcon/>}
						/> */}
						</Box>
					))}
				
				</BottomNavigation>
		  
          
		  
		<StyledFab color="secondary" aria-label="home" sx={{ color: '#fff'}}>
			<HomeIcon />
		</StyledFab>
		
			
        </Toolbar>
      </AppBar>
	);
}
