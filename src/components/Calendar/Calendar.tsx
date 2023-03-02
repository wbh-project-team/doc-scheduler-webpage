import { Avatar, Typography, Link, Select, MenuItem, InputLabel, Container } from '@mui/material';

import { Box } from '@mui/system';
import { useRouter } from 'next/router';
import { SetStateAction, useEffect, useState } from 'react';
import mystyles from './calendarStyle.module.css';

interface Props {
	//onclick: any;
}

const monthsMap = new Map([
	['Januar', 1],
	['Februar', 2],
	['Maerz', 3],
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

export default function Calendar({ }: Props) {
	//const router = useRouter();
	const [selectedYear, setSelectedYear] = useState<string>('2023');
	const [yearValues, setYearValues] = useState<string[]>([
		'2023',
		'2024',
	  ]);
	const [selectedMonth, setSelectedMonth] = useState<string>('Maerz');
	const [monthValues, setMonthValues] = useState<string[]>(Array.from( monthsMap ).map(([key, value]) => ( key)));

	const [selectedKW, setSelectedKW] = useState<string>('9');
	const [kwValues, setkwValues] = useState<string[]>(["9","10","11","12"]);

	const [dateMonday, setDateMonday] = useState<number>(27);
	const [dateTuesday, setDateTuesday] = useState<number>(28);
	const [dateWednesday, setDateWednesday] = useState<number>(1);
	const [dateThursday, setDateThursday] = useState<number>(2);
	const [dateFriday, setDateFriday] = useState<number>(3);

	
	useEffect(() => {
		//alert(selectedMonth);
		let firstKW = calcKwFromSelectedMonth();
		let kws = [];
		for (let i = 0; i < 4; i++) {
			kws.push(String(i+firstKW));
		}
		setkwValues(kws);
		
	}, [selectedMonth]);

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

	useEffect(() => {
		calcWeekstartdate();
	}, [selectedKW]);

	function calcWeekstartdate(){
		let year = Number(selectedYear);
		let month = monthsMap.get(selectedMonth);
		//let kw = selectedKW;
		let firstdayKW1 = [2,1]; // starts with 2023
		let numberFeb = 28+leapYear();
		let numberDays = [31,numberFeb,31,30,31,30,31,31,30,31,30,31];
		

		let value = Number(selectedKW)*7-7;
		for(let i=0; i<(month!-1); i++){ 
			value -= numberDays[i];
			//alert(value);
		}
		let mondaydate= value + firstdayKW1[year-2023];
		if (mondaydate < 1) mondaydate += calcEndOfMonth(month!-1);
		setDateMonday(mondaydate);
		//return ([mondaydate, monthsMap.get(selectedMonth)]);
		//return[28,2]
	}

	useEffect(() => {
	//function setWeekdays(){
		//if(dateMonday)
		let endOfMonth = 0;
		//alert(calcKwFromSelectedMonth());
		if(calcKwFromSelectedMonth() == Number(selectedKW)){
			endOfMonth = calcEndOfMonth(monthsMap.get(selectedMonth)!-1> 0 ? monthsMap.get(selectedMonth)!-1 : 12);
		} else {
			endOfMonth = calcEndOfMonth(monthsMap.get(selectedMonth)!);
		}
		//let endOfMonth = calcEndOfMonth(monthsMap.get(selectedMonth)!-);
		//alert(endOfMonth);
		let tuesday = (dateMonday<endOfMonth) ? dateMonday + 1 : 1;
		let wednesday = (tuesday<endOfMonth) ? tuesday + 1 : 1;
		let thursday = (wednesday<endOfMonth) ? wednesday + 1 : 1;
		let friday = (thursday<endOfMonth) ? thursday + 1 : 1;
		//useState hook asynchronuous!
		setDateTuesday(tuesday);
		setDateWednesday(wednesday);
		setDateThursday(thursday);
		setDateFriday(friday);
	}, [dateMonday]);

	function leapYear() {
		//let year = selectedYear;
		//some calc
		//return 1 if leapyear, else 0
		return 0;
	}

	function calcEndOfMonth(month: number){
		let year = Number({selectedYear});
		let numberFeb = 28+leapYear();
		let numberDays = [31,numberFeb,31,30,31,30,31,31,30,31,30,31];
		return numberDays[month-1];
	}
	const numRows = 13*4; // 7-20Uhr, pro Stunde 4*15 Minuten (1/4 Stunde timeslots)
	
	return (
	<Box sx={{mt: '1rem', ml:'1rem'}}>
		{/* <Container sx={{width: '100%'}}> */}
		{/* <InputLabel htmlFor="agent-simple" sx={{ color: 'secondary.main' }}>Jahr</InputLabel> */}
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
		{/* </Container > */}
		{/* <Container sx={{width: '100%'}}> */}
		<Box className={mystyles.calendar}>
			<Box id='timeline' className={mystyles.timeline}>
				<Box className={mystyles.spacer}></Box>
				<Box sx={{gridRow: '5', backgroundColor: 'black'}}> 7Uhr</Box>
				<Box sx={{gridRow: '9',}}> 8 Uhr</Box>
				<Box sx={{gridRow: '13',}}> 9 Uhr</Box>
				<Box sx={{gridRow: '17',}}>10 Uhr</Box>
				<Box sx={{gridRow: '21',}}>11 Uhr</Box>
				<Box sx={{gridRow: '25',}}>12 Uhr</Box>
				<Box sx={{gridRow: '29',}}>13 Uhr</Box>
				<Box sx={{gridRow: '33',}}>14 Uhr</Box>
				<Box sx={{gridRow: '37',}}>15 Uhr</Box>
				<Box sx={{gridRow: '41',}}>16 Uhr</Box>
				<Box sx={{gridRow: '45',}}>17 Uhr</Box>
				<Box sx={{gridRow: '49',}}>18 Uhr</Box>
				<Box sx={{gridRow: '53',}}>19 Uhr</Box>
			</Box>
			<Box id='days'className={mystyles.days}>
				<Box id='mo'>
					<Box className={mystyles.date}>
						<Box className={mystyles.datenum}>{dateMonday} </Box>
						<Box className={mystyles.dateday}>Mon</Box>
					</Box>
					<Box className={mystyles.events}>
					</Box>
				</Box>
				{/* Eventbox? */}
				<Box id='di'>
					<Box className={mystyles.date}>
						<Box className={mystyles.datenum}>{dateTuesday} </Box>
						<Box className={mystyles.dateday}>Die</Box>
					</Box>
					<Box className={mystyles.events}>
					</Box>
				</Box>
				<Box id='mi'>
					<Box className={mystyles.date}>
						<Box className={mystyles.datenum}>{dateWednesday} </Box>
						<Box className={mystyles.dateday}>Mit</Box>
					</Box>
					<Box className={mystyles.events}>
					</Box>
				</Box>
				<Box id='do'>
					<Box className={mystyles.date}>
						<Box className={mystyles.datenum}>{dateThursday} </Box>
						<Box className={mystyles.dateday}>Don</Box>
					</Box>
					<Box className={mystyles.events}>
					</Box>
				</Box>
				<Box id='fr'>
					<Box className={mystyles.date}>
						<Box className={mystyles.datenum}>{dateFriday} </Box>
						<Box className={mystyles.dateday}>Fr</Box>
					</Box>
					<Box className={mystyles.events}>
					</Box>
				</Box>



			</Box>
				
			
			
		</Box>
		{/* </Container> */}
	</Box>
	
	);
}
