import {  Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { IAppointment } from '../../models/Appointments';

interface Props {
 	open: any;
  handleClose: any;
  putAppointmentToCalendar: any;
}

export default function AppointmentInputForm({ open, handleClose, putAppointmentToCalendar }: Props) {
  const [date, setDate] = useState<IAppointment>();
  const [hour, setHour] = useState(7);
  const [minutes, setMinutes] = useState(0);
  const [duration, setDuration] = useState(0);  // TODO: switch to reason of consultation

  const handleSubmit = () => {
    let submittedDate = {ownerWalletId: 1111111, dateTime: [0,0,0,hour, minutes], durationInSecs: duration*60, docWalletID: 22222}
    setDate(submittedDate)
    putAppointmentToCalendar(submittedDate);
    handleClose();
  };

  return <>
    
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title" sx={{color: 'secondary.main'}}>Termin</DialogTitle>
      <DialogContent>
         <FormControl fullWidth margin="dense">
          <InputLabel id="hour-label" sx={{color: 'secondary.main'}}>Stunde</InputLabel>
          <Select
            sx={{color: 'secondary.main'}}
            labelId="hour-label"
            id="hour"
            value={hour}
            onChange={(event) =>setHour(Number(event.target.value))}
          >
            {[7,8,9,10,11,12,13,14,15,16,17,18,19].map((key, index) => {
              return <MenuItem key={index} value={key} sx={{color: 'secondary.main'}}>{key}</MenuItem>
            })}
          </Select>
        </FormControl>
        <FormControl fullWidth margin="dense">
          <InputLabel id="minutes-label" sx={{color: 'secondary.main'}}>Minute</InputLabel>
          <Select
          sx={{color: 'secondary.main'}}
            labelId="minutes-label"
            id="time"
            value={minutes}
            onChange={(event) =>setMinutes(Number(event.target.value))}
          >
            {["00", "15", "30", "45"].map((key, index) => {
              return <MenuItem key={index} value={Number(key)} sx={{color: 'secondary.main'}}>{key}</MenuItem>
            })}
          </Select>
        </FormControl>
        <FormControl fullWidth margin="dense">
          <InputLabel id="duration-label" sx={{color: 'secondary.main'}}>Dauer</InputLabel>
          <Select
            sx={{color: 'secondary.main'}}
            labelId="duration-label"
            id="duration"
            value={duration}
            onChange={(event) =>setDuration(Number(event.target.value))}
          >
            <MenuItem value={15} sx={{color: 'secondary.main'}}>15</MenuItem>
            <MenuItem value={30} sx={{color: 'secondary.main'}}>30</MenuItem>
            <MenuItem value={45} sx={{color: 'secondary.main'}}>45</MenuItem>
          </Select>
        </FormControl>
       
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="secondary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
    
    
    
    </>;
}