import { Box } from '@mui/material'

import { IAppointment } from '../../models/Appointments'
import styles from '../Calendar/calendarStyle.module.css'

interface Props {
  appointment: IAppointment
}

export default function Appointments({ appointment }: Props) {
  let starts =
    (appointment.dateTime[3] - 7) * 4 + appointment.dateTime[4] / 15 + 1 // 15 Minuten pro grid-Zelle
  let ends = starts + appointment.durationInSecs / 60 / 15
  // alert("In Appointment: " + appmnt.dateTime);
  return (
    <Box
      className={styles.event}
      sx={{
        gridRowStart: starts,
        gridRowEnd: ends,
        backgroundColor: 'lightblue'
      }}
    ></Box>
  )
}
