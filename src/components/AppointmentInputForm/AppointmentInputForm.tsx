import {  Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { useState } from 'react';

interface Props {
 	open: any;
    handleClose: any;
}

export default function AppointmentInputForm({ open, handleClose }: Props) {
    
        const [name, setName] = useState('');
        const [age, setAge] = useState('');
      
        const handleSubmit = () => {
          console.log(`Name: ${name}, Age: ${age}`);
          handleClose();
        };
    return <>
    
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Enter Information</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please enter your name and age:
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Name"
          type="text"
          fullWidth
          value={name}
          onChange={(event) =>setName(event.target.value)}
        />
        <FormControl fullWidth margin="dense">
          <InputLabel id="age-label">Age</InputLabel>
          <Select
            labelId="age-label"
            id="age"
            value={age}
            onChange={(event) =>setAge(event.target.value)}
          >
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={20}>20</MenuItem>
            <MenuItem value={30}>30</MenuItem>
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
    
    
    
    </>;
}