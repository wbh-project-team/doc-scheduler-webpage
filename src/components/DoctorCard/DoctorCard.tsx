import { Avatar, Typography, Link } from '@mui/material';

import { Box } from '@mui/system';
import { Doctor } from '../../models/Doctors';
import { useRouter } from 'next/router';



interface Props {
	doctor: Doctor;
	onclick: any;
}

export default function DoctorCard({ doctor, onclick }: Props) {
	const router = useRouter();

	// function sendDetails(){
	// 	console.log('docData: ',JSON.stringify(doctor));
	// 	//router.push( `/DoctorDetails?doc=${ JSON.stringify(doctor) }`,)
	// 	router.push( `/DoctorDetails`,)

		
	// }

	return (
		
		<Box
			
			//onClick={() => router.push(`/DoctorDetails?DrId={doctor.Id}`)}
			//onClick={() => sendDetails()}
			onClick={onclick}
			sx={{
				display: 'flex',
				flexDirection: 'column',
				//backgroundColor: 'background.main',
				backgroundColor: 'white',
				p: '24px',
				//width: '450px',
				//borderRadius: '12px',
				gap: '24px',
				color: 'secondary.main',
				//boxShadow: '4px 6px 4px rgba(0, 0, 0, 0.25);',
				//border: 'solid 1px #808080',
				
			}}>
				
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'row',
					justifyContent: 'space-between',
					// alignItems: 'center',
				}}>
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'row',
						alignItems: 'center',
						gap: '12px',
					}}>
					<Avatar src="/images/portrait.jpeg" sx={{ width: '80px', height: '80px' }} />
					<Box sx={{ display: 'flex', flexDirection: 'column', gap: '0px' }}>
						<Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
							{doctor.name}
						</Typography>
						<Typography variant="caption" sx={{ fontWeight: 700 }}>
							4.5 / 5
						</Typography>
					</Box>
				</Box>
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'center',
					}}>
					<Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
						{doctor.address}
					</Typography>
					<Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
						{doctor.zipCode} {doctor.city}
					</Typography>
					
				</Box>
				<Box
					sx={{
						width: '32px',
						height: '32px',
						backgroundColor: '#ffd600',
						borderRadius: '50%',
						border: 'solid 1px #9e9e9e',
					}}
				/>
			</Box>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'row',
					justifyContent: 'space-between',
					backgroundColor: 'primary.main',
					color: 'primary.contrastText',
					//border: 'solid 1px #808080',
					p: '12px',
					borderRadius: '12px',
					gap: '24px',
					//boxShadow: '0px 6px 4px rgba(0, 0, 0, 0.25);',
				}}>
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'center',
						alignItems: 'center',
					}}>
					<Typography variant="overline" sx={{ fontWeight: '1000' }}>
						Montag
					</Typography>
					<Typography variant="h6" sx={{ fontWeight: '1000' }}>
						{(doctor.openHours[0].start / 60 / 60 / 1000).toFixed(2)}-
						{(doctor.openHours[0].end / 60 / 60 / 1000).toFixed(2)}
					</Typography>
				</Box>
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'center',
						alignItems: 'center',
					}}>
					<Typography variant="overline" sx={{ fontWeight: '1000' }}>
						Dienstag
					</Typography>
					<Typography variant="h6" sx={{ fontWeight: '1000' }}>
						{(doctor.openHours[0].start / 60 / 60 / 1000).toFixed(2)}-
						{(doctor.openHours[0].end / 60 / 60 / 1000).toFixed(2)}
					</Typography>
				</Box>
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'center',
						alignItems: 'center',
					}}>
					<Typography variant="overline" sx={{ fontWeight: '1000' }}>
						Mitwoch
					</Typography>
					<Typography variant="h6" sx={{ fontWeight: '1000' }}>
						{(doctor.openHours[0].start / 60 / 60 / 1000).toFixed(2)}-
						{(doctor.openHours[0].end / 60 / 60 / 1000).toFixed(2)}
					</Typography>
				</Box>
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'center',
						alignItems: 'center',
					}}>
					<Typography variant="overline" sx={{ fontWeight: '1000' }}>
						Donnerstag
					</Typography>
					<Typography variant="h6" sx={{ fontWeight: '1000' }}>
						{(doctor.openHours[0].start / 60 / 60 / 1000).toFixed(2)}-
						{(doctor.openHours[0].end / 60 / 60 / 1000).toFixed(2)}
					</Typography>
				</Box>
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'center',
						alignItems: 'center',
					}}>
					<Typography variant="overline" sx={{ fontWeight: '1000' }}>
						Freitag
					</Typography>
					<Typography variant="h6" sx={{ fontWeight: '1000' }}>
						{(doctor.openHours[0].start / 60 / 60 / 1000).toFixed(2)}-
						{(doctor.openHours[0].end / 60 / 60 / 1000).toFixed(2)}
					</Typography>
				</Box>
			</Box>
		</Box>
	);
}
