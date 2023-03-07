import {
  Box,
  Container,
  InputBase,
  styled,
  TextField,
  Typography
} from '@mui/material'
import Head from 'next/head'
import { useRouter } from 'next/router'
//import { useReducer } from 'react';
import { useEffect, useState } from 'react'
import { areaOfExpertise, Doctor, docs } from '../models/Doctors'
import DoctorCard from '../components/DoctorCard/DoctorCard'
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'
import DoctorDetails from '../components/DoctorDetails/DoctorDetails'

// const StyledBox = styled(Box)({
// 	background: 'url("/images/background.png")',
// 	'WebkitTextFillColor': 'transparent',
//   	'WebkitBackgroundClip': 'text',

// 	 // filter: drop-shadow(2px 2px #333);
// 	//display:'block',
// });

const defaultDetailsVisible = false

export default function Home() {
  const router = useRouter()
  const { zipCode, currareaOfExpertise } = router.query
  const [detailsVisible, setDetailsVisible] = useState(defaultDetailsVisible)
  const [docForDetails, setDocForDetails] = useState<Doctor | null>(null)

  function handleCardClick(doc: Doctor) {
    setDetailsVisible(false)
    setDocForDetails(doc)
  }

  useEffect(() => {
    if (docForDetails) {
      setDetailsVisible(true)
      document.body.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [docForDetails])

  function generateDetails() {
    if (detailsVisible) {
      return <DoctorDetails doctor={docForDetails!}></DoctorDetails>
    }
    return ''
  }

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
          height: `calc(100vh - 60px)`, // Footer ist 60 hoch
          pt: '80px' // Navbar ist 80 hoch
        }}
      >
        {/* {detailsVisible && (
          <Box
            id="Details"
            sx={{
              zIndex: 1,
              display: 'flex',
              backgroundColor: 'tomato',
              marginTop: '15px',
              width: '95%',
              fontSize: '200%',
              fontWeight: 'light'
            }}
          >
            {generateDetails()}
          </Box>
        )} */}

        <Container
          component="section"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            height: '100%',
            p: '24px',
            position: 'relative',
            '&::before': {
              content: '""',
              position: 'fixed',
              display: 'block',
              top: '0px',
              left: '0px',
              bottom: '0px',
              right: '0px',
              backgroundImage: 'url("/images/background.png")',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              paddingBottom: '200px'
            }
          }}
        >
          {detailsVisible && (
          <Box
            id="Details"
            sx={{
              zIndex: 0,
              display: 'flex',
              backgroundColor: 'tomato',
              marginTop: '15px',
              width: '100%',
              fontSize: '200%',
              fontWeight: 'light',
              marginBottom: '15px',
            }}
          >
            {generateDetails()}
          </Box>
        )}
        <Box
        sx={{
          // zIndex: 0,
          display: 'flex',
          backgroundColor: 'blue',
        }}
          >
          <Box
            sx={{
              position: 'absolute',
              transform: 'translate(-50%, 0%)',
              display: 'grid',
              // backgroundColor: 'green',
              //gridTemplateColumns: 'auto auto',
              gridTemplateColumns: 'repeat(auto-fill, minmax(500px, 1fr))',
              gap: '15px',
              width: '95%',
            }}
          >
            <Box
              id="results"
              sx={{
                //zindex: 1,
                gridColumn: '1/-1',
                color: 'secondary.main',
                backgroundColor: 'white',
                padding: '30px 10px',
                overflow: 'hidden',
                fontSize: '200%',
                fontWeight: 'bold',
                textAlign: 'center'
              }}
            >
              Deine Suchergebnisse zu: {areaOfExpertise[currareaOfExpertise as keyof typeof areaOfExpertise]} in {zipCode}
            </Box>
            {docs
              .filter(function(obj) {
                if(obj.specialization == currareaOfExpertise){return obj}
              }).map((element) => (
              <DoctorCard
                key={element.name}
                doctor={{
                  Id: element.Id,
                  name: element.name,
                  address: element.address,
                  zipCode: element.zipCode,
                  city: element.city,
                  openHours: element.openHours,
                  specialization: element.specialization,
				          consultationCategories: element.consultationCategories,
                  description: '',
                  rating: element.rating
                }}
                onclick={() => handleCardClick(element)}
                //onclick={() => {}}
              />
            ))}
          </Box>
          </Box>
        </Container>
      </Box>
      <Footer />
    </>
  )
}
