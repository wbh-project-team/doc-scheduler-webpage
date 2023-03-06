import { Avatar, Typography, Link } from '@mui/material'

import { Box } from '@mui/system'
import { Doctor } from '../../models/Doctors'
import { useRouter } from 'next/router'

interface Props {
  doctor?: Doctor
}

const weekdays = ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag']

export default function OfficeForm({ doctor }: Props) {
  const router = useRouter()

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',

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
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          color: 'secondary.main',
          // alignItems: 'center',
        }}
      >

        Text
      </Box>
    </Box>
  )
}
