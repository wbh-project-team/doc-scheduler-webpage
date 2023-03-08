import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography
} from '@mui/material'
import { useContext, useEffect, useState } from 'react'
import { IAppointment } from '../../models/Appointments'
import { IConsultationCategory } from '../../models/Doctors'
import {
  WalletContent,
  WalletContext
} from '../../services/web3/wallets/walletProvider'

interface Props {
  open: any
  handleClose: any
  date: number[]
  docId: string
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
  const [duration, setDuration] = useState(0)
  
  const { isLoggedIn, login, logout, getAddress, getBalance, getPrivateKey } =
  useContext<WalletContent>(WalletContext)

  const handleSubmit = () => {
    // TODO: put ownerWalletID from Login
    // Abfrage: LoggedIn?
    let submittedDate = {
      // what about contractNumber ?
      ownerWalletId: getAddress(),
      dateTime: [0, 0, 0, hour, minutes],
      durationInSecs: duration * 60,
      docWalletID: docId
    }
    setAppointment(submittedDate)
    putAppointmentToCalendar(submittedDate)
    handleClose()
  }

  const stylePopupBox = {
    display: 'block',
    position: 'fixed',
    zIndex: 5,
    top: '0',
    left: '0',
    transform: `translate(calc(50vw - 250px), calc(50vh - 100px))`,
    width: '500px',
    //height: '200px',
    bgcolor: 'white',
    color: 'secondary.main',
    border: '2px solid #000',
    borderRadius: '10px',
    boxShadow: 24,
    p: 4
  }
  
  return (
    <>
    { !isLoggedIn ? (
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
)
: 
(
  <Modal
    open={open}
    onClose={handleClose}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
  >
    <Box sx={stylePopupBox}>
      <Typography
        id="modal-modal-title"
        variant="h6"
        component="h2"
        sx={{ fontSize: '100%' }}
      >
        Bitte loggen Sie sich zuerst über den Login-Button ein!
      </Typography>
    </Box>
  </Modal>
)}
  </>
  );
}
