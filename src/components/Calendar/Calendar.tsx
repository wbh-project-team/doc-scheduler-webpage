import { Select, MenuItem, InputLabel, Container } from '@mui/material';
import { appointmentsArray, IAppointment } from '../../models/Appointments';
import { Box } from '@mui/system';
//import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import AppointmentInputForm from '../AppointmentInputForm/AppointmentInputForm';
import mystyles from './calendarStyle.module.css';
import Appointment from '../Appointment/Appointment';

// interface Props {
// 	//onclick: any;
// }

const monthsMap = new Map([
	['Januar', 1],
	['Februar', 2],
	['März', 3],
	['April', 4],
	['Mai',5],
	['Juni',6],
	['Juli',7],
	['August',8],
	['September',9],
	['Oktober',10],
	['November',11],
	['Dezember',12],
])

export default function Calendar() {
	//const router = useRouter();
	const [selectedYear, setSelectedYear] = useState<string>('2023');
	const [yearValues, setYearValues] = useState<string[]>([
		'2023',
		'2024',
	  ]);
	const [selectedMonth, setSelectedMonth] = useState<string>('März');
	const [monthValues, setMonthValues] = useState<string[]>(Array.from( monthsMap ).map(([key, value]) => ( key)));

	const [selectedKW, setSelectedKW] = useState<string>('9');
	const [kwValues, setkwValues] = useState<string[]>(["9","10","11","12"]);

	const [dateMonday, setDateMonday] = useState<number>(27);
	const [dateTuesday, setDateTuesday] = useState<number>(28);
	const [dateWednesday, setDateWednesday] = useState<number>(1);
	const [dateThursday, setDateThursday] = useState<number>(2);
	const [dateFriday, setDateFriday] = useState<number>(3);

	useEffect(() => {
		let firstKW = calcKwFromSelectedMonth();
		let kws = [];
		for (let i = 0; i < 4; i++) {
			kws.push(String(i+firstKW));
		}
		setkwValues(kws);
		setSelectedKW(kws[0]);
	}, [selectedMonth]);

	useEffect(() => {
		calcWeekStartDate();
	}, [selectedKW, selectedYear]);

	useEffect(() => {
		let endOfMonth = 0;
		if(calcKwFromSelectedMonth() == Number(selectedKW)){
			endOfMonth = calcEndOfMonth(monthsMap.get(selectedMonth)!-1> 0 ? monthsMap.get(selectedMonth)!-1 : 12);
		} else {
			endOfMonth = calcEndOfMonth(monthsMap.get(selectedMonth)!);
		}
		let tuesday = (dateMonday<endOfMonth) ? dateMonday + 1 : 1;
		let wednesday = (tuesday<endOfMonth) ? tuesday + 1 : 1;
		let thursday = (wednesday<endOfMonth) ? wednesday + 1 : 1;
		let friday = (thursday<endOfMonth) ? thursday + 1 : 1;
		//useState hook works asynchronuous!
		setDateTuesday(tuesday);
		setDateWednesday(wednesday);
		setDateThursday(thursday);
		setDateFriday(friday);
	}, [dateMonday]);

	function calcKwFromSelectedMonth(){
		let firstdayKW1 = [2,1]; // starts with 2023
		let numberFeb = 28+leapYear();
		let numberDays = [31,numberFeb,31,30,31,30,31,31,30,31,30,31];
		let month = monthsMap.get(selectedMonth);
		let value = 0;
		for(let i=0; i<(month!-1); i++){ 
			value += numberDays[i];
		}
		value -= firstdayKW1[Number(selectedYear)-2023]-1;
		value /= 7;
		return Math.trunc(value)+1;
	}

	function calcWeekStartDate(){
		let year = Number(selectedYear);
		let month = monthsMap.get(selectedMonth);
		//let kw = selectedKW;
		let firstdayKW1 = [2,1]; // starts with 2023
		let numberFeb = 28+leapYear();
		let numberDays = [31,numberFeb,31,30,31,30,31,31,30,31,30,31];
		
		let value = Number(selectedKW)*7-7;
		for(let i=0; i<(month!-1); i++){ 
			value -= numberDays[i];
		}
		let mondaydate= value + firstdayKW1[year-2023];
		if (mondaydate < 1) mondaydate += calcEndOfMonth(month!-1);
		setDateMonday(mondaydate);
	}

	function leapYear() {
		let year = Number(selectedYear);
		if (!(((year%4!=0) && (year%100!=0)) || (year%400==0))) return 1;
    	return 0;
	}

	function weekDay(day: number, month: number, year: number) {
		// gets real date as e.g. = 1, 7, 23 for 07.01.2023 (Saturday)
  		// returns 0 for monday, 1 for tuesday, etc.
		const nums = [1,4,4,0,2,5,0,3,6,1,4,6];
		let num = (year % 100) + Math.trunc((year %100) / 4) + day + nums[month-1];
		if ((leapYear() == 0 ? false: true) && month <= 2) num -= 1;
		return (num-1-2)%7; // gilt nur zwischen 2000 und 2099
	  }

	function calcEndOfMonth(month: number){
		let numberFeb = 28+leapYear();
		let numberDays = [31,numberFeb,31,30,31,30,31,31,30,31,30,31];
		return numberDays[month-1];
	}

	// Click on Calendar:

	const [selectedDay, setSelectedDay] = useState<number>(0);
	const handleDayClick = (day: number) => {
		setSelectedDay(day); // 1=Monday
	}

	useEffect(() => {
		if (selectedDay > 0){
			setInputFormOpen(true);
		}
	},[selectedDay]);

	const [inputFormOpen, setInputFormOpen] = useState(false);
	const handleInputFormClose = () => {
		setInputFormOpen(false);
		setSelectedDay(0);
		document.body.scrollTo({ top: 0, behavior: "smooth" });
	}

	const numRows = 13*4; // 7-20Uhr, pro Stunde 4*15 Minuten (1/4 Stunde timeslots)
	
	return (
	<Box sx={{mt: '1rem', ml:'1rem'}}>
		<Container sx={{width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', gap:'10px', mb: '10px'}}>
			<Box >	
				<Select
					sx={{ color: 'secondary.main', height: '20px'}}
					value={selectedYear}
					onChange={(event) => setSelectedYear(event.target.value)}
					inputProps={{
						name: "agent",
						id: "age-simple"
					}}>
					
					{yearValues.map((value, index) => {
					return <MenuItem key={index} value={value} sx={{ color: 'secondary.main' }}>{value}</MenuItem>;
					})}

				</Select>
				<InputLabel sx={{ color: 'secondary.main',fontSize:'0.8rem', textAlign: 'center' }}>Jahr</InputLabel>
			</Box>	
			<Box>
				<Select
					sx={{ color: 'secondary.main', height: '20px'}}
					value={selectedMonth}
					onChange={(event) => setSelectedMonth(event.target.value)}
					inputProps={{
						name: "agent",
						id: "age-simple"
					}}>
					
					{monthValues.map((value, index) => {
					return <MenuItem key={index} value={value} sx={{ color: 'secondary.main' }}>{value}</MenuItem>;
					})}

				</Select>
				<InputLabel sx={{ color: 'secondary.main',fontSize:'0.8rem', textAlign: 'center' }}>Monat</InputLabel>
			</Box>
			<Box>
			<Select
				sx={{ color: 'secondary.main', height: '20px'}}
				value={selectedKW}
				onChange={(event) => setSelectedKW(event.target.value)}
				inputProps={{
					name: "agent",
					id: "age-simple"
				}}>
				
				{kwValues!.map((value, index) => {
				return <MenuItem key={index} value={value} sx={{ color: 'secondary.main' }}>{value}</MenuItem>;
				})}
			</Select>
			<InputLabel sx={{ color: 'secondary.main',fontSize:'0.8rem', textAlign: 'center' }}>KW</InputLabel>
		</Box>
		</Container >
		{/* <Container sx={{width: '100%'}}> */}
		<Box className={mystyles.calendar}>
			<Box id='timeline' className={mystyles.timeline}>
				{/* <Box sx={{backgroundColor: 'pink'}}></Box> */}
				<Box sx={{gridRow: '4', }}> 7 Uhr</Box>
				<Box sx={{gridRow: '8',}}> 8 Uhr</Box>
				<Box sx={{gridRow: '12',}}> 9 Uhr</Box>
				<Box sx={{gridRow: '16',}}>10 Uhr</Box>
				<Box sx={{gridRow: '20',}}>11 Uhr</Box>
				<Box sx={{gridRow: '24',}}>12 Uhr</Box>
				<Box sx={{gridRow: '28',}}>13 Uhr</Box>
				<Box sx={{gridRow: '32',}}>14 Uhr</Box>
				<Box sx={{gridRow: '36',}}>15 Uhr</Box>
				<Box sx={{gridRow: '40',}}>16 Uhr</Box>
				<Box sx={{gridRow: '44',}}>17 Uhr</Box>
				<Box sx={{gridRow: '48',}}>18 Uhr</Box>
				<Box sx={{gridRow: '52',}}>19 Uhr</Box>
			</Box>
			<Box id='days'className={mystyles.days}>
				<Box id='mo'>
					<Box className={mystyles.date}>
						<Box className={mystyles.datenum}>{dateMonday} </Box>
						<Box className={mystyles.dateday}>Mon</Box>
					</Box>
					<Box className={mystyles.events} onClick={() => {handleDayClick(1)}}>
						{appointmentsArray.filter(function(obj) {
							if(weekDay(obj.dateTime[0],obj.dateTime[1], obj.dateTime[2]) == 0 ){
								//alert(obj.id);
								return obj;
							}
						 }).map((item) => (
							<Appointment 
								appmnt={{
									id: item.id,
									ownerWalletId: item.ownerWalletId,
									dateTime: item.dateTime,
									durationInSecs: item.durationInSecs,
									docWalletID: item.docWalletID,
								}}
								day={1}
							/> 
							
						))}
					</Box>
				</Box>
				<Box id='di'>
					<Box className={mystyles.date}>
						<Box className={mystyles.datenum}>{dateTuesday} </Box>
						<Box className={mystyles.dateday}>Die</Box>
					</Box>
					<Box className={mystyles.events} onClick={() => {handleDayClick(2)}}>
						{/* {generateAppointments(2)} */}
					</Box>
				</Box>
				<Box id='mi'>
					<Box className={mystyles.date}>
						<Box className={mystyles.datenum}>{dateWednesday} </Box>
						<Box className={mystyles.dateday}>Mit</Box>
					</Box>
					<Box className={mystyles.events} onClick={() => {handleDayClick(3)}}>
						{/* {generateAppointments(3)} */}
					</Box>
				</Box>
				<Box id='do'>
					<Box className={mystyles.date}>
						<Box className={mystyles.datenum}>{dateThursday} </Box>
						<Box className={mystyles.dateday}>Don</Box>
					</Box>
					<Box className={mystyles.events} onClick={() => {handleDayClick(4)}}>
					{/* <Box className={mystyles.event} sx={{gridRow: '2/10', backgroundColor: 'lightblue'}}></Box> */}
						{/* {generateAppointments(4)} */}
					</Box>
				</Box>
				<Box id='fr'>
					<Box className={mystyles.date}>
						<Box className={mystyles.datenum}>{dateFriday} </Box>
						<Box className={mystyles.dateday}>Fr</Box>
					</Box>
					<Box className={mystyles.events} onClick={() => {handleDayClick(5)}}>
						{/* {generateAppointments(5)} */}
					</Box>
				</Box>


				
			</Box>
				
			
			
		</Box>
		<AppointmentInputForm open={inputFormOpen} handleClose={handleInputFormClose} />
	</Box>
	
	);
}
