import { Avatar, Typography, Link } from '@mui/material'

import { Box } from '@mui/system'
import { areaOfExpertise, Doctor } from '../../models/Doctors'
import { useRouter } from 'next/router'

interface Props {
  doctor: Doctor
  onclick: any
}
const weekdays = ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag']

export default function DoctorCard({ doctor, onclick }: Props) {
  const router = useRouter()

  // function sendDetails(){
  // 	console.log('docData: ',JSON.stringify(doctor));
  // 	//router.push( `/DoctorDetails?doc=${ JSON.stringify(doctor) }`,)
  // 	router.push( `/DoctorDetails`,)
  // }

  return (
    <Box
      onClick={onclick}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        //backgroundColor: 'background.main',
        backgroundColor: 'white',
        p: '24px',
        //minWidth: ''
        //width: '450px',
        //borderRadius: '12px',
        gap: '24px',
        color: 'secondary.main'
        //boxShadow: '4px 6px 4px rgba(0, 0, 0, 0.25);',
        //border: 'solid 1px #808080',
      }}
    >
      {areaOfExpertise[doctor.specialization]}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between'
          // alignItems: 'center',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: '12px'
          }}
        >
          <Avatar
            src="/images/portrait.jpeg"
            sx={{ width: '80px', height: '80px' }}
          />
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '0px' }}>
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: 700, fontSize: '2em' }}
            >
              {doctor.name}
            </Typography>
            <Typography variant="caption" sx={{ fontWeight: 700 }}>
              {doctor.rating} / 5
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
          }}
        >
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
            border: 'solid 1px #9e9e9e'
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
          gap: '24px'
          //boxShadow: '0px 6px 4px rgba(0, 0, 0, 0.25);',
        }}
      >
        {doctor.openHours.map((day, index) => (
          <Box
            key={index}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Typography variant="overline" sx={{ fontWeight: 'normal' }}>
              {weekdays[index]}
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: '1000' }}>
              {(day.start / 60 / 60 / 1000).toFixed(2)}-
              {(day.lunchStart / 60 / 60 / 1000).toFixed(2)}
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: '1000' }}>
              {(day.lunchEnd / 60 / 60 / 1000).toFixed(2)}-
              {(day.end / 60 / 60 / 1000).toFixed(2)}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  )
}
