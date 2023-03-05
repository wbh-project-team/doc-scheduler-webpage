import { Select, MenuItem, InputLabel, Container } from '@mui/material'
import { appointmentsArray, IAppointment } from '../../models/Appointments'
import { Box } from '@mui/system'
//import { useRouter } from 'next/router';
import { useEffect, useState } from 'react'
import AppointmentInputForm from '../AppointmentInputForm/AppointmentInputForm'
import mystyles from './calendarStyle.module.css'
import Appointment from '../Appointment/Appointment'
import { BusinessHours, IConsultationCategory } from '../../models/Doctors'

const monthsMap = new Map([
  ['Januar', 1],
  ['Februar', 2],
  ['März', 3],
  ['April', 4],
  ['Mai', 5],
  ['Juni', 6],
  ['Juli', 7],
  ['August', 8],
  ['September', 9],
  ['Oktober', 10],
  ['November', 11],
  ['Dezember', 12]
])

interface Props {
  docId: number
  openHours: BusinessHours[];
  consultationCategories: IConsultationCategory[];
}

export default function Calendar({ docId, openHours, consultationCategories }: Props) {
  //const router = useRouter();
  //const [selectedDocId, setSelectedDocId] = useState(docId);
  const [selectedYear, setSelectedYear] = useState<string>('2023')
  const [yearValues, setYearValues] = useState<string[]>(['2023', '2024'])
  const [selectedMonth, setSelectedMonth] = useState<string>('März')
  const [monthValues, setMonthValues] = useState<string[]>(
    Array.from(monthsMap).map(([key, value]) => key)
  )

  const [selectedKW, setSelectedKW] = useState<string>('9')
  const [kwValues, setkwValues] = useState<string[]>(['9', '10', '11', '12'])

  const [dateMonday, setDateMonday] = useState<number[]>([27, 0, 0])
  const [dateTuesday, setDateTuesday] = useState<number[]>([28, 0, 0])
  const [dateWednesday, setDateWednesday] = useState<number[]>([1, 0, 0])
  const [dateThursday, setDateThursday] = useState<number[]>([2, 0, 0])
  const [dateFriday, setDateFriday] = useState<number[]>([3, 0, 0])

  const [weekAppointments, setWeekappointments] = useState<IAppointment[]>([])
  const [newAppointment, setNewAppointment] = useState<IAppointment | null>(
    null
  )

  // useEffect(() => {
  // 	calcWeekStartDate();
  // }, [selectedDocId])

  useEffect(() => {
    let firstKW = calcKwFromSelectedMonth()
    let kws = []
    for (let i = 0; i < 4; i++) {
      kws.push(String(i + firstKW))
    }
    setkwValues(kws)
    setSelectedKW(kws[0])
  }, [selectedMonth])

  useEffect(() => {
    calcWeekStartDate()
  }, [selectedKW, selectedYear])

  useEffect(() => {
    //auf dateMonday[0]
    let endOfMonth = 0
    if (calcKwFromSelectedMonth() == Number(selectedKW)) {
      endOfMonth = calcEndOfMonth(
        monthsMap.get(selectedMonth)! - 1 > 0
          ? monthsMap.get(selectedMonth)! - 1
          : 12
      )
    } else {
      endOfMonth = calcEndOfMonth(monthsMap.get(selectedMonth)!)
    }
    let daytuesday = dateMonday[0] < endOfMonth ? dateMonday[0] + 1 : 1
    let daywednesday = daytuesday < endOfMonth ? daytuesday + 1 : 1
    let daythursday = daywednesday < endOfMonth ? daywednesday + 1 : 1
    let dayfriday = daythursday < endOfMonth ? daythursday + 1 : 1

    let monthMonday = 0
    let monthFriday = monthsMap.get(selectedMonth)
    let yearMonday = 0
    let yearFriday = Number(selectedYear)

    if (dateMonday[0] < dayfriday) {
      monthMonday = monthFriday!
      yearMonday = yearFriday
    } else {
      if (monthFriday! - 1 > 0) {
        monthMonday = monthFriday! - 1
        yearMonday = yearFriday
      } else {
        monthMonday = 12
        yearMonday = yearFriday - 1
      }
    }

    //zB monday: 230227 friday: 230303 => da das Jahr vorne steht, wird immer weiter hochgezählt
    let checkNumberMonday =
      yearMonday * 10000 + monthMonday * 100 + dateMonday[0]
    let checkNumberFriday = yearFriday * 10000 + monthFriday! * 100 + dayfriday

    let weekAppointmentsArray: Array<IAppointment> = [];
	weekAppointmentsArray = appointmentsArray.filter(function (obj) {
      //alert(checkNumberMonday + checkNumberFriday + obj.dateTime[2]*10000+obj.dateTime[1]*100+obj.dateTime[0])
      if (
        obj.docWalletID == docId &&
        obj.dateTime[2] * 10000 + obj.dateTime[1] * 100 + obj.dateTime[0] >=
          checkNumberMonday &&
        obj.dateTime[2] * 10000 + obj.dateTime[1] * 100 + obj.dateTime[0] <=
          checkNumberFriday
      ) {
        return obj
      }
    })

    //useState hook works asynchronuous!
	// Fehler: bei Monatswechsel: nur erster Tag bekommt den neuen Monat
	let dayDates: Array<Array<number>> = [
		[dateMonday[0], monthMonday, yearMonday],
		[
			daytuesday,
			(daytuesday > dateMonday[0] ? monthMonday : monthFriday)!,
			daytuesday > dateMonday[0] ? yearMonday : yearFriday
		],
		[
			daywednesday,
			(daywednesday > dateMonday[0] ? monthMonday : monthFriday)!,
			daywednesday > dateMonday[0] ? yearMonday : yearFriday
		],
		[
			daythursday,
			(daythursday > dateMonday[0] ? monthMonday : monthFriday)!,
			daythursday > dateMonday[0] ? yearMonday : yearFriday
		],
		[dayfriday, monthFriday!, yearFriday]
	];

    setDateMonday(dayDates[0]);
    setDateTuesday(dayDates[1]);
    setDateWednesday(dayDates[2]);
    setDateThursday(dayDates[3]);
    setDateFriday(dayDates[4]);

	//let dayDates: Array<Array<number>> = [[dateMonday[0], monthMonday, yearMonday],]
	let closingTimes: Array<IAppointment> = [];

	openHours.forEach(function(element, index){
		let start = Math.round(Math.trunc(openHours[index].start/60/60/1000)*60*60+((openHours[index].start/10/60/60)%100*60));
		let lunchStartHour = Math.trunc(openHours[index].lunchStart/60/60/1000);
		let lunchStartMin =  ((openHours[index].lunchStart/10/60/60)%100);
		let lunchStart =(lunchStartHour*60*60+lunchStartMin*60);
		let lunchEnd = Math.round(Math.trunc(openHours[index].lunchEnd/60/60/1000)*60*60+((openHours[index].lunchEnd/10)%100/60/60)*60);
		let endHour = Math.trunc(openHours[index].end/60/60/1000);
		let endMinutes = ((openHours[index].end/10/60/60)%100);
		let end = endHour*60*60+endMinutes*60;

		let durationBefore = start - 7 * 60 * 60 ;
		if (durationBefore > 0){
			closingTimes.push({
				ownerWalletId: 111,
				dateTime: [dayDates[index][0], dayDates[index][1], dayDates[index][2], 7,0],
				durationInSecs: durationBefore,
				docWalletID: docId,
			});
		}
		let durationLunchTime = lunchEnd - lunchStart;
		if(durationLunchTime>0){
			closingTimes.push({
				ownerWalletId: 111,
				dateTime: [dayDates[index][0], dayDates[index][1], dayDates[index][2], lunchStartHour,lunchStartMin],
				durationInSecs: durationLunchTime,
				docWalletID: docId,
			})
		}
		//alert([dayDates[index][0], dayDates[index][1], dayDates[index][2], lunchStartHour,lunchStartMin])
		let durationAfter = 20* 60 * 60 - end;
		if(durationAfter>0){
			closingTimes.push({
				ownerWalletId: 111,
				dateTime: [dayDates[index][0], dayDates[index][1], dayDates[index][2], endHour,endMinutes],
				durationInSecs: durationAfter,
				docWalletID: docId,
			})
		}
	});

	weekAppointmentsArray.push(...closingTimes)
    setWeekappointments(weekAppointmentsArray)
  }, [dateMonday[0]])

  function calcKwFromSelectedMonth() {
    let firstdayKW1 = [2, 1] // starts with 2023
    let numberFeb = 28 + leapYear()
    let numberDays = [31, numberFeb, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    let month = monthsMap.get(selectedMonth)
    let value = 0
    for (let i = 0; i < month! - 1; i++) {
      value += numberDays[i]
    }
    value -= firstdayKW1[Number(selectedYear) - 2023] - 1
    value /= 7
    return Math.trunc(value) + 1
  }

  function calcWeekStartDate() {
    let year = Number(selectedYear)
    let month = monthsMap.get(selectedMonth)
    //let kw = selectedKW;
    let firstdayKW1 = [2, 1] // starts with 2023
    let numberFeb = 28 + leapYear()
    let numberDays = [31, numberFeb, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

    let value = Number(selectedKW) * 7 - 7
    for (let i = 0; i < month! - 1; i++) {
      value -= numberDays[i]
    }
    let mondaydate = value + firstdayKW1[year - 2023]
    if (mondaydate < 1) mondaydate += calcEndOfMonth(month! - 1)
    setDateMonday([mondaydate, 0, 0])
  }

  function leapYear() {
    let year = Number(selectedYear)
    if (!((year % 4 != 0 && year % 100 != 0) || year % 400 == 0)) return 1
    return 0
  }

  function weekDay(day: number, month: number, year: number) {
    // gets real date as e.g. = 1, 7, 23 for 07.01.2023 (Saturday)
    // returns 0 for monday, 1 for tuesday, etc.
    const nums = [1, 4, 4, 0, 2, 5, 0, 3, 6, 1, 4, 6]
    let num =
      (year % 100) + Math.trunc((year % 100) / 4) + day + nums[month - 1]
    if ((leapYear() == 0 ? false : true) && month <= 2) num -= 1
    return (num - 1 - 2) % 7 // gilt nur zwischen 2000 und 2099
  }

  function calcEndOfMonth(month: number) {
    let numberFeb = 28 + leapYear()
    let numberDays = [31, numberFeb, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    return numberDays[month - 1]
  }

  // Click on Calendar:

  const [selectedDay, setSelectedDay] = useState<number[]>([0, 0, 0, 0])

  const handleDayClick = (day: number) => {
    let selectedDate = [0, 0, 0]
    if (day == 1) selectedDate = dateMonday
    else if (day == 2) selectedDate = dateTuesday
    else if (day == 3) selectedDate = dateWednesday
    else if (day == 4) selectedDate = dateThursday
    else if (day == 5) selectedDate = dateFriday
    //alert([day, selectedDate[0], selectedDate[1], selectedDate[2]]);
    setSelectedDay([day, selectedDate[0], selectedDate[1], selectedDate[2]]) // day: 1=Monday
  }

  useEffect(() => {
    if (selectedDay[0] > 0) {
      setInputFormOpen(true)
    }
  }, [selectedDay[0]])

  const [inputFormOpen, setInputFormOpen] = useState(false)

  const handleInputFormClose = () => {
    setInputFormOpen(false)
    document.body.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const putAppointmentToCalendar = (date: IAppointment) => {
    let tempAppointment = date
    //alert("put to calendar: " + [selectedDay[0], selectedDay[1], selectedDay[2], tempAppointment.dateTime[3], tempAppointment.dateTime[4] ])

    tempAppointment.dateTime = [
      selectedDay[1],
      selectedDay[2],
      selectedDay[3],
      tempAppointment.dateTime[3],
      tempAppointment.dateTime[4]
    ]
    //alert("put to calendar: " + "selectedDay: "+selectedDay+ " datetime"+ tempAppointment.dateTime + "duration " + tempAppointment.durationInSecs);
    setNewAppointment(tempAppointment)
    //setSelectedDay([0,0,0,0]);  // auch in generateNewAppointment
  }

  useEffect(() => {
    if (newAppointment) {
      let tempApps = weekAppointments
      let tempweekApps = tempApps.concat(newAppointment!)

      //alert("put new appointment to list " + tempweekApps);
      setWeekappointments(tempweekApps)

      setSelectedDay([0, 0, 0, 0])
      setNewAppointment(null)
    }
  }, [newAppointment])

  // funktioniert automatisch, da Termin in Terminliste aufgenommen wird!
  // function generateNewAppointment(day: number){

  // 	//if (newAppointment && weekDay(newAppointment.dateTime[0], newAppointment.dateTime[1], newAppointment.dateTime[2])+1 == day){
  // 	if (newAppointment && selectedDay[0] == day ){
  // 		alert("in generate new App : " + selectedDay + "time: " + newAppointment.dateTime+ " duration: "+ newAppointment.durationInSecs);
  // 		let tempSelectedDay = selectedDay;
  // 		let tempAppointment = newAppointment;

  // 		// setSelectedDay([0,0,0,0]);
  // 		// setNewAppointment(null);
  // 		return (
  // 			<Appointment
  // 			appmnt={{
  // 				ownerWalletId: tempAppointment.ownerWalletId, // ToDo: aktuelle WalletId eintragen
  // 				dateTime: tempAppointment.dateTime,
  // 				durationInSecs: tempAppointment.durationInSecs,
  // 				docWalletID: tempAppointment.docWalletID, // ToDo: aktuelle WalletId eintragen
  // 			}}

  // 		/> );
  // 		// dateTime: [tempSelectedDay[1], tempSelectedDay[2], tempSelectedDay[3], tempAppointment.dateTime[3], tempAppointment.dateTime[4]],
  // 	}
  // 	return ("");
  // }

  const numRows = 13 * 4 // 7-20Uhr, pro Stunde 4*15 Minuten (1/4 Stunde timeslots)

  return (
    <Box sx={{ mt: '1rem', ml: '1rem' }}>
      <Container
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-start',
          gap: '10px',
          mb: '10px'
        }}
      >
        <Box>
          <Select
            sx={{ color: 'secondary.main', height: '20px' }}
            value={selectedYear}
            onChange={(event) => setSelectedYear(event.target.value)}
            inputProps={{
              name: 'agent',
              id: 'age-simple'
            }}
          >
            {yearValues.map((value, index) => {
              return (
                <MenuItem
                  key={index}
                  value={value}
                  sx={{ color: 'secondary.main' }}
                >
                  {value}
                </MenuItem>
              )
            })}
          </Select>
          <InputLabel
            sx={{
              color: 'secondary.main',
              fontSize: '0.8rem',
              textAlign: 'center'
            }}
          >
            Jahr
          </InputLabel>
        </Box>
        <Box>
          <Select
            sx={{ color: 'secondary.main', height: '20px' }}
            value={selectedMonth}
            onChange={(event) => setSelectedMonth(event.target.value)}
            inputProps={{
              name: 'agent',
              id: 'age-simple'
            }}
          >
            {monthValues.map((value, index) => {
              return (
                <MenuItem
                  key={index}
                  value={value}
                  sx={{ color: 'secondary.main' }}
                >
                  {value}
                </MenuItem>
              )
            })}
          </Select>
          <InputLabel
            sx={{
              color: 'secondary.main',
              fontSize: '0.8rem',
              textAlign: 'center'
            }}
          >
            Monat
          </InputLabel>
        </Box>
        <Box>
          <Select
            sx={{ color: 'secondary.main', height: '20px' }}
            value={selectedKW}
            onChange={(event) => setSelectedKW(event.target.value)}
            inputProps={{
              name: 'agent',
              id: 'age-simple'
            }}
          >
            {kwValues!.map((value, index) => {
              return (
                <MenuItem
                  key={index}
                  value={value}
                  sx={{ color: 'secondary.main' }}
                >
                  {value}
                </MenuItem>
              )
            })}
          </Select>
          <InputLabel
            sx={{
              color: 'secondary.main',
              fontSize: '0.8rem',
              textAlign: 'center'
            }}
          >
            KW
          </InputLabel>
        </Box>
      </Container>
      <Box className={mystyles.calendar}>
        <Box id="timeline" className={mystyles.timeline}>
          {/* <Box sx={{backgroundColor: 'pink'}}></Box> */}
          <Box sx={{ gridRow: '4' }}> 7 Uhr</Box>
          <Box sx={{ gridRow: '8' }}> 8 Uhr</Box>
          <Box sx={{ gridRow: '12' }}> 9 Uhr</Box>
          <Box sx={{ gridRow: '16' }}>10 Uhr</Box>
          <Box sx={{ gridRow: '20' }}>11 Uhr</Box>
          <Box sx={{ gridRow: '24' }}>12 Uhr</Box>
          <Box sx={{ gridRow: '28' }}>13 Uhr</Box>
          <Box sx={{ gridRow: '32' }}>14 Uhr</Box>
          <Box sx={{ gridRow: '36' }}>15 Uhr</Box>
          <Box sx={{ gridRow: '40' }}>16 Uhr</Box>
          <Box sx={{ gridRow: '44' }}>17 Uhr</Box>
          <Box sx={{ gridRow: '48' }}>18 Uhr</Box>
          <Box sx={{ gridRow: '52' }}>19 Uhr</Box>
        </Box>
        <Box id="days" className={mystyles.days}>
          <Box id="mo">
            <Box className={mystyles.date}>
              <Box className={mystyles.datenum}>{dateMonday[0]} </Box>
              <Box className={mystyles.dateday}>Mon</Box>
            </Box>
            <Box
              className={mystyles.events}
              onClick={() => {
                handleDayClick(1)
              }}
            >
              {weekAppointments
                .filter(function (obj) {
                  if (
                    weekDay(
                      obj.dateTime[0],
                      obj.dateTime[1],
                      obj.dateTime[2]
                    ) == 0
                  ) {
                    return obj
                  }
                })
                .map((item) => (
                  <Appointment
                    appointment={{
                      id: item.id,
                      ownerWalletId: item.ownerWalletId,
                      dateTime: item.dateTime,
                      durationInSecs: item.durationInSecs,
                      docWalletID: item.docWalletID
                    }}
                  />
                ))}
              {/* {generateBlockClosingTimes(1)} */}
            </Box>
          </Box>
          <Box id="di">
            <Box className={mystyles.date}>
              <Box className={mystyles.datenum}>{dateTuesday[0]} </Box>
              <Box className={mystyles.dateday}>Die</Box>
            </Box>
            <Box
              className={mystyles.events}
              onClick={() => {
                handleDayClick(2)
              }}
            >
              {weekAppointments
                .filter(function (obj) {
                  if (
                    weekDay(
                      obj.dateTime[0],
                      obj.dateTime[1],
                      obj.dateTime[2]
                    ) == 1
                  ) {
                    return obj
                  }
                })
                .map((item) => (
                  <Appointment
                    appointment={{
                      id: item.id,
                      ownerWalletId: item.ownerWalletId,
                      dateTime: item.dateTime,
                      durationInSecs: item.durationInSecs,
                      docWalletID: item.docWalletID
                    }}
                  />
                ))}
              {/* {generateNewAppointment(2)} */}
            </Box>
          </Box>
          <Box id="mi">
            <Box className={mystyles.date}>
              <Box className={mystyles.datenum}>{dateWednesday[0]} </Box>
              <Box className={mystyles.dateday}>Mit</Box>
            </Box>
            <Box
              className={mystyles.events}
              onClick={() => {
                handleDayClick(3)
              }}
            >
              {weekAppointments
                .filter(function (obj) {
                  if (
                    weekDay(
                      obj.dateTime[0],
                      obj.dateTime[1],
                      obj.dateTime[2]
                    ) == 2
                  ) {
                    return obj
                  }
                })
                .map((item) => (
                  <Appointment
                    appointment={{
                      id: item.id,
                      ownerWalletId: item.ownerWalletId,
                      dateTime: item.dateTime,
                      durationInSecs: item.durationInSecs,
                      docWalletID: item.docWalletID
                    }}
                  />
                ))}
              {/* {generateNewAppointment(3)} */}
            </Box>
          </Box>
          <Box id="do">
            <Box className={mystyles.date}>
              <Box className={mystyles.datenum}>{dateThursday[0]} </Box>
              <Box className={mystyles.dateday}>Don</Box>
            </Box>
            <Box
              className={mystyles.events}
              onClick={() => {
                handleDayClick(4)
              }}
            >
              {weekAppointments
                .filter(function (obj) {
                  if (
                    weekDay(
                      obj.dateTime[0],
                      obj.dateTime[1],
                      obj.dateTime[2]
                    ) == 3
                  ) {
                    return obj
                  }
                })
                .map((item) => (
                  <Appointment
                    appointment={{
                      id: item.id,
                      ownerWalletId: item.ownerWalletId,
                      dateTime: item.dateTime,
                      durationInSecs: item.durationInSecs,
                      docWalletID: item.docWalletID
                    }}
                  />
                ))}
              {/* {generateNewAppointment(4)} */}
            </Box>
          </Box>
          <Box id="fr">
            <Box className={mystyles.date}>
              <Box className={mystyles.datenum}>{dateFriday[0]} </Box>
              <Box className={mystyles.dateday}>Fr</Box>
            </Box>
            <Box
              className={mystyles.events}
              onClick={() => {
                handleDayClick(5)
              }}
            >
              {weekAppointments
                .filter(function (obj) {
                  if (
                    weekDay(
                      obj.dateTime[0],
                      obj.dateTime[1],
                      obj.dateTime[2]
                    ) == 4
                  ) {
                    return obj
                  }
                })
                .map((item) => (
                  <Appointment
                    appointment={{
                      id: item.id,
                      ownerWalletId: item.ownerWalletId,
                      dateTime: item.dateTime,
                      durationInSecs: item.durationInSecs,
                      docWalletID: item.docWalletID
                    }}
                  />
                ))}
              {/* {generateNewAppointment(5)} */}
            </Box>
          </Box>
        </Box>
      </Box>
      <AppointmentInputForm
        open={inputFormOpen}
        handleClose={handleInputFormClose}
        date={selectedDay}
        docId={docId}
		consultationCategories={consultationCategories}
        putAppointmentToCalendar={putAppointmentToCalendar}
      />
    </Box>
  )
}
