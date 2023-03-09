import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import { WalletContent, WalletContext } from '../../services/web3/wallets/walletProvider';
import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {
	getPatientNameCid,
	isAppointmentOver,
	payoutAppointment,
} from '../../services/web3/contracts/contractsProvider';
import { retrieve } from '../../services/ipfs/ipfsProvider';

export default function AccountMenu() {
	const [name, setName] = useState<string>('Mein Name');
	const { isLoggedIn, login, logout, getAddress, getBalance, getPrivateKey } =
		useContext<WalletContent>(WalletContext);
	const router = useRouter();
	const [anchorEl, setAnchorEl] = React.useState(null);
	const open = Boolean(anchorEl);
	const handleClick = (event: any) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};
	function stringAvatar(name: string) {
		if (name === '') return 'ME';
		if (!name.includes(' ')) return `${name.split(' ')[0][0]}`;
		return `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`;
	}

	useEffect(() => {
		const loadName = async () => {
			const cid = await getPatientNameCid(getAddress());
			if (cid === '') return;

			const tempName = await retrieve(cid);
			setName(tempName.name);
		};

		if (isLoggedIn) {
			loadName();
		}
	}, [isLoggedIn]);
	return (
		<React.Fragment>
			<Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
				<Tooltip title="Account settings">
					<IconButton
						onClick={handleClick}
						size="small"
						sx={{ ml: 2 }}
						aria-controls={open ? 'account-menu' : undefined}
						aria-haspopup="true"
						aria-expanded={open ? 'true' : undefined}>
						{/* TODO statt A string */}
						<Avatar sx={{ width: '50px', height: '50px', backgroundColor: 'grey' }}>
							{stringAvatar(name)}
						</Avatar>
					</IconButton>
				</Tooltip>
			</Box>
			<Menu
				anchorEl={anchorEl}
				id="account-menu"
				open={open}
				onClose={handleClose}
				onClick={handleClose}
				PaperProps={{
					elevation: 0,
					sx: {
						overflow: 'visible',
						filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
						color: 'secondary.main',
						mt: 1.5,
						'& .MuiAvatar-root': {
							width: 32,
							height: 32,
							ml: -0.5,
							mr: 1,
						},
						'&:before': {
							content: '""',
							display: 'block',
							position: 'absolute',
							top: 0,
							right: 14,
							width: 10,
							height: 10,
							bgcolor: 'background.paper',

							transform: 'translateY(-50%) rotate(45deg)',
							zIndex: 0,
						},
					},
				}}
				transformOrigin={{ horizontal: 'right', vertical: 'top' }}
				anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}>
				<MenuItem onClick={() => router.push('../../AccountData')}>
					<Avatar /> Mein Account
				</MenuItem>
				<Divider />
				<MenuItem
					onClick={async () => {
						await logout();
						router.push('/');
					}}>
					<ListItemIcon>
						<Logout fontSize="small" />
					</ListItemIcon>
					Logout
				</MenuItem>
			</Menu>
		</React.Fragment>
	);
}
