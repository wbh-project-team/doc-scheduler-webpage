import { Box, Typography } from '@mui/material'
import Head from 'next/head'
import Footer from '../components/Footer/Footer'
import Navbar from '../components/Navbar/Navbar'
import styles from '../styles/YourAppointments.module.css'
// import { makeStyles } from '@mui/styles'
import { appointmentsArray, IAppointment } from '../models/Appointments'
import Appointment from '../components/Appointment/Appointment'
import { useEffect, useState } from 'react'

import { useRouter } from 'next/router';


export default function YourAppointments() {
  const router = useRouter();
  // TODO: anpassen
  // let weekAppointmentsArray = appointmentsArray.filter(function(obj) {
  // 	//alert(checkNumberMonday + checkNumberFriday + obj.dateTime[2]*10000+obj.dateTime[1]*100+obj.dateTime[0])
  // 	if(
  // 		obj.docWalletID == docId &&
  // 		obj.dateTime[2]*10000+obj.dateTime[1]*100+obj.dateTime[0] >=checkNumberMonday &&
  // 		obj.dateTime[2]*10000+obj.dateTime[1]*100+obj.dateTime[0] <= checkNumberFriday
  // 	){
  // 		return obj;
  // 	}
  // });
  // useEffect(() => {
  //   const handleStart = () => {
  //     const box = document.querySelector('#shaking-box');
  //     box!.classList.add(styles.bounce);
  //     setTimeout(() => {
  //       box!.classList.remove(styles.bounce);
  //     }, 10000);
  //   };

  //   router.events.on('routeChangeStart', handleStart);

  //   return () => {
  //     router.events.off('routeChangeStart', handleStart);
  //   };
  // }, []);
  
  return (

    <>
      <Head>
        <title>Ärzte ohne Grenzen</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <Box
        component="main"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100vw',
          mt: '70px'
        }}
      >

<Box id="shaking-box" className='shake' sx={{ animationName: 'shaking',animationDuration: '2s', mt: '300px', height: '40px', backgroundColor: 'lightblue'}}>This box shakes for 1 second on page load</Box>)
       


      </Box>
      <Footer />
    </>
  )
}
