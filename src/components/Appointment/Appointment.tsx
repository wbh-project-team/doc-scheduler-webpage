import {  Box } from '@mui/material';

import { IAppointment } from '../../models/Appointments';
import mystyles from '../Calendar/calendarStyle.module.css';

interface Props {
 	appmnt: IAppointment;
}

export default function Appointments({ appmnt }: Props) {

    let starts = (appmnt.dateTime[3]-7)*4+appmnt.dateTime[4]/15+1;  // 15 Minuten pro grid-Zelle
    let ends = starts + appmnt.durationInSecs/60/15;
   // alert("In Appointment: " + appmnt.dateTime);
    return (
        <Box 
            className={mystyles.event}
            sx={{
                gridRowStart: starts,
                gridRowEnd: ends,  
                backgroundColor: 'lightblue'
            }}>

        </Box>
    );
}