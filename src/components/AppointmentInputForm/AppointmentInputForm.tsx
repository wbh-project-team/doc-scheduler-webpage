import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography
} from '@mui/material'
import { useEffect, useState } from 'react'
import { IAppointment } from '../../models/Appointments'
import { IConsultationCategory } from '../../models/Doctors'

interface Props {
  open: any
  handleClose: any
  date: number[]
  docId: number
  consultationCategories: IConsultationCategory[];
  putAppointmentToCalendar: any
}

export default function AppointmentInputForm({
  open,
  handleClose,
  date,
  docId,
  consultationCategories,
  putAppointmentToCalendar
}: Props) {
  const [appointment, setAppointment] = useState<IAppointment>()
  const [hour, setHour] = useState(7)
  const [minutes, setMinutes] = useState(0)
  const [duration, setDuration] = useState(0) // TODO: switch to reason of consultation

  const handleSubmit = () => {
    // TODO: put ownerWalletID from Login
    // Abfrage: LoggedIn?
    let submittedDate = {
      // what about contractNumber ?
      ownerWalletId: 1111111,
      dateTime: [0, 0, 0, hour, minutes],
      durationInSecs: duration * 60,
      docWalletID: docId
    }
    setAppointment(submittedDate)
    putAppointmentToCalendar(submittedDate)
    handleClose()
  }

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle
          id="form-dialog-title"
          sx={{ color: 'secondary.main', textAlign: 'center' }}
        >
          Termin am {date[1]}.{date[2]}.{date[3]}
        </DialogTitle>
        <DialogContent>
          <FormControl fullWidth margin="dense">
            <InputLabel
              id="demo-simple-select-helper-label"
              sx={{ color: 'secondary.main', backgroundColor: 'white' }}
            >
              Stunde
            </InputLabel>
            <Select
              sx={{ color: 'secondary.main' }}
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={hour}
              onChange={(event) => setHour(Number(event.target.value))}
            >
              {[7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19].map(
                (key, index) => {
                  return (
                    <MenuItem
                      key={index}
                      value={key}
                      sx={{ color: 'secondary.main' }}
                    >
                      {key}
                    </MenuItem>
                  )
                }
              )}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="dense">
            <InputLabel
              id="minutes-label"
              sx={{ color: 'secondary.main', backgroundColor: 'white' }}
            >
              Minute
            </InputLabel>
            <Select
              sx={{ color: 'secondary.main' }}
              labelId="minutes-label"
              id="time"
              value={minutes}
              onChange={(event) => setMinutes(Number(event.target.value))}
            >
              {['00', '15', '30', '45'].map((key, index) => {
                return (
                  <MenuItem
                    key={index}
                    value={Number(key)}
                    sx={{ color: 'secondary.main' }}
                  >
                    {key}
                  </MenuItem>
                )
              })}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="dense">
            <InputLabel
              id="duration-label"
              sx={{ color: 'secondary.main', backgroundColor: 'white' }}
            >
              Terminkategorie
            </InputLabel>
            <Select
              sx={{ color: 'secondary.main' }}
              labelId="duration-label"
              id="duration"
              value={duration}
              onChange={(event) => setDuration(Number(event.target.value))}
            >
              {consultationCategories.map((item, index) => {
                return (
                  <MenuItem
                    key={index}
                    value={item.durationInSecs/60}
                    sx={{ color: 'secondary.main' }}
                  >
                    {item.category}
                  </MenuItem>
                )
              })}
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
    </>
  )
}
