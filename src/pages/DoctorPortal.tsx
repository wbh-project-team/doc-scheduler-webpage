import {
  Box,
  Button,
  Container,
  Typography,
  ListItem,
  ListItemText,
  TextField,
  styled,
  InputLabel,
  Select,
  MenuItem,
  InputBase,
  FormControl,
  Modal
} from '@mui/material'
import Head from 'next/head'

import { useRouter } from 'next/router'
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'
import OfficeForm from '../components/OfficeForm/OfficeForm'
import { useContext, useRef, useState } from 'react'
import { areaOfExpertise, docs } from '../models/Doctors'


import {
  WalletContent,
  WalletContext
} from '../services/web3/wallets/walletProvider'

const CustomTextField = styled(TextField)(({ theme }) => ({
  color: 'secondary.main',
  "& label": {
    color: theme.palette.secondary.main,
  },
  '& .MuiInputBase-input': {
    color: theme.palette.secondary.main,
    padding: '10px 26px 15px 12px',
  },
  '& .MuiOutlinedInput-root': {
    borderRadius: 12,
    
    backgroundColor: theme.palette.background.paper,
    padding: '0',
    '& fieldset': {
      color: '#000',
      padding: '0px',
      margin: '0px',
      border: '2px solid #ced4da',
    },
    // '&.Mui-focused fieldset': {
    //   border: 'solid 1px #808080'
    // }
  }
}))

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  "& label": {
    color: theme.palette.secondary.main,
  },
  'label + &': {
    // margin: '0px',
    
    color: theme.palette.secondary.main,
    backgroundColor: 'white',
  },
  '& .MuiInputBase-input': {
    color: theme.palette.secondary.main,
    borderRadius: 12,
    
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #ced4da',
    // boxShadow: 'inset 0px 4px 4px rgba(0, 0, 0, 0.25);',
    padding: '10px 26px 10px 12px',

    '&:focus': {
      borderRadius: 12,
      color: theme.palette.secondary.main,
    },
    // '&:label': {
    //   backgroundColor: 'white',
    //   color: theme.palette.secondary.main,
    // }
  }
}))

const getEnumKeys = <T extends Object>(
  enumToDeconstruct: T
): Array<keyof typeof enumToDeconstruct> => {
  return Object.keys(enumToDeconstruct) as Array<
    keyof typeof enumToDeconstruct
  >
}

export default function Home() {
  //const router = useRouter();
  const [inputValues, setInputValues] = useState<{[key: string]: any }>({});
  const [inputSelectValues, setInputSelectValues] = useState<{[key: string]: any }>({});
  const [counter, setCounter] = useState(1);
  // const [OfficeFormVisible, setOfficeFormVisible] = useState(false)
  const [currentAreaOfExpertise, setAreaOfExpertise] = useState<string>('')
  const [minutes, setMinutes] = useState(0)
  const [open, setInfoBoxOpen] = useState(false)
  const handleBoxOpen = () => setInfoBoxOpen(true)
  const handleBoxClose = () => setInfoBoxOpen(false)
  const { isLoggedIn, login, logout, getAddress, getBalance, getPrivateKey } =
  useContext<WalletContent>(WalletContext)

  const textFieldRefName = useRef<HTMLInputElement>();

  //const [docForForm, setDocForForm] = useState<Doctor>();
  const handleClick = () => {
    if(counter < 6) setCounter(counter + 1);
  };

  const handleOnChange = (e: any) => {
    let specializations: { [key: string]: string }  = {};
    let keyname = String(e.target.id);
    specializations[keyname] = e.target.value;
    setInputValues({ ...inputValues, ...specializations });
  };

  const handleSelectOnChange = (e: any) => {
    let specializationDurations: { [key: string]: number }  = {};
    let keyname = String(e.target.id);
    specializationDurations[keyname] = e.target.value;
    setInputSelectValues({ ...inputSelectValues, ...specializationDurations });

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
  


  function handleCreateOfficeClick() {
    
    if(!isLoggedIn){ // TODO: Ausrufezeichen entfernen
      let name  = textFieldRefName.current ? textFieldRefName.current.value : '';
      // let name = textFieldRefName.current?.value //as string | undefined;
      let address = document.getElementById('address')!.innerText as string | undefined;
      let city = document.getElementById('city')!.innerText as string | undefined;
      let description = document.getElementById('description')!.innerText as string | undefined;

      // {Object.keys(inputValues).map((c) => {
      //   return <Typography variant='h2'>{inputValues[c] + " "+ c}</Typography>;
      // })}

      
      alert(name);

    let modifiedArr = Object.entries(inputValues).map(([key,val], index) =>{
      alert(  val +  inputSelectValues[key] )
      return { category: val, durationInSecs: inputSelectValues[key] *60};
    });
    
      if((typeof name === 'string' && typeof address === 'string' && typeof city === 'string' && typeof description === 'string')){
          docs.push(
            {
              Id: getAddress(), 
              name: name, 
              zipCode: 45468, 
              address: address, 
              city: city, 
              openHours: Array.apply(null, Array(5)).map(()=>( {start:8.3 * 60 * 60 * 1000, end: 16 * 60 * 60 * 1000, lunchStart: 12*60*60*1000, lunchEnd: 13*60*60*1000} )),
              specialization: currentAreaOfExpertise as keyof typeof areaOfExpertise,
              consultationCategories: modifiedArr,
              //consultationCategories: inputValues.map((item: string, index: number) => ( { category: item, durationInSecs: inputSelectValues[index] } )),
              // consultationCategories: [{category: "Beratung", durationInSecs: 1800 }, {category: "Chirurgischer Eingriff", durationInSecs: 3600 }, {category: "Nachsorge", durationInSecs: 900 }],
              description:description,
              rating: 0,
            }
          )
          alert(docs)
      }
      else{
        //input error
      }
    
   }
   else{
    setInfoBoxOpen(true);

   }
  }

  // function generateCreateOfficeForm() {
  //   if (OfficeFormVisible) {
  //     //let docForForm = null;
  //     //return (<OfficeForm doctor={docForForm!} ></OfficeForm>);
  //     return <OfficeForm />
  //   }
  //   return ''
  // }

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
          height: '100vh',
          position: 'relative',
          gap: '32px',
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
        <Container
          sx={{
            position: 'absolute',
            backgroundColor: 'rgba(255, 255, 255, 1)',
            width: '95%',
            //height: '120vh',
            color: 'secondary.main',
            fontSize: '120%',
            padding: '2vw',
            mt: '100px',
            mb: '120px',
             transform: 'translate(2.5%, 0%)',
            display: 'flex',
            flexDirection: 'row'
          }}
        >
          <Container sx={{ display: 'flex',  transform: 'translate(-2.5%, 0%)',}}>
              <Box 
                sx={{
                  display: 'flex',
                  flexDirection: 'column', 
                  width: '33%',
                  height: '70vh',
                  backgroundColor: 'white',
                  border: '3px solid tomato',
                  borderBottomLeftRadius : '12%',
                  borderTopRightRadius: '12%',
                  margin:'2rem',
                }}>
                  <Container
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    // backgroundColor: 'blue',
                  }}
                  >
                  <img
                  src="/images/logo3.png"
                  alt={'doc scheduler logo'}
                  style={{ 
                    height: '50%', 
                    // width: '35%',
                    backgroundColor: 'white',
                    transform: 'translate(-50px, -15px) rotate(-30deg)',
                  }}
                />
                <Typography 
                  variant='h2' 
                  sx={{
                    width: '100%', 
                    transform: 'translate(-35px, 0px)',
                    color: 'tomato', 
                    pt: '1rem'
                  }}
                >
                  Werde Mitglied der Community!
                  </Typography>
                </Container>
                  <Typography variant='h2'>
                  Werbung
                  </Typography>
              </Box>
              <Box
                id='rightSide'
                sx={{
                  pt: '4vh',
                  width: '100%',
                  display: "flex",
                 
                  flexDirection: "column",
                  // backgroundColor: 'yellow',
                }}
              > 
              
                <Box 
                  component="form"
                  sx={{
                    display: "flex",
                    flexDirection: 'row',
                    // alignItems: "center",
                    justifyContent: "center",
                    color: 'secondary.main',
                    width: '100%',
                    paddingTop: "2rem",
                    // backgroundColor: 'green',
                    '& .MuiTextField-root': { width: '100%', color: 'secondary.main' },
                    
                  }}
                  noValidate
                  autoComplete="off"
                >
                    
                  <Container 
                    sx={{
                      display: 'flex',
                       
                      flexDirection: 'column',
                      width: '100%',
                      rowGap: '1rem',
                      // backgroundColor: 'lightblue'
                    }}>
                    
                        <CustomTextField required inputRef={textFieldRefName} id="name" label="required" defaultValue='Name der Praxis'/>
                        <FormControl size="small">
                        <InputLabel  variant='outlined' sx={{backgroundColor: 'white', color:'grey'}} id="spec">Spezialisierung</InputLabel>
                        <Select
                          labelId="spec"
                          required
                          sx={{ color: 'secondary.main', width: '100%', }}
                          input={<BootstrapInput />}
                          label="Spezia"
                          id="spec"
                          value={currentAreaOfExpertise}
                          //label={currentAreaOfExpertise}
                          onChange={(event) => setAreaOfExpertise(event.target.value)}
                        >
                          {getEnumKeys(areaOfExpertise).map((key, index) => (
                            <MenuItem
                              sx={{ color: 'secondary.main' }}
                              key={index}
                              value={key}
                            >
                              {areaOfExpertise[key]}
                            </MenuItem>
                          ))}
                        </Select>
                        </FormControl>
                        <CustomTextField required id="address" label="required" defaultValue="Strasse und Hausnr."/>
                        <CustomTextField required id="plz" label="required" defaultValue="PLZ"/>
                        <CustomTextField required id="city" label="required" defaultValue="Stadt"/>
                        <CustomTextField required id="description" label="required" defaultValue="Beschreibung" multiline rows={4}/>
                    {/* </Box> */}
                  </Container>  
                  <Container sx={{display: 'flex', flexDirection: 'column', rowGap: '1rem', marginTop:'0.1rem'}}>
                    <Button sx={{width: '15em', height: '2.7rem' }} variant={'contained'} onClick={handleClick}>Terminkategorie hinzufügen</Button>
                      {Array.from(Array(counter)).map((c, index) => {
                        return (
                          <Box sx={{display: 'flex',flexDirection: 'row', gap: '10px', height:'50px', alignItems:'flex-start' }}>
                          <Box sx={{pt:'0em'}}>
                            <CustomTextField
                            key={'I'+index}
                            label="Terminkategorie"
                            required
                            
                            variant="outlined"
                            onChange={handleOnChange}
                            //key={c}
                            id={'Spec'+index}
                            type="text"
                            //  sx={{height: '70px'}}
                          />
                          </Box>
                          <FormControl  sx={{  marginBottom: '1rem', height: '50px', width: '10em' }} size="small">
                          <InputLabel  variant='outlined' sx={{backgroundColor: 'white', color:'grey', }} id="spec">Dauer</InputLabel>
                            <Select
                              key={'S'+index}
                              input={<BootstrapInput />}
                              // sx={{height: '50px'}}
                              id={'Spec'+index}
                              // value={minutes}
                              onChange={handleSelectOnChange}
                            >
                            {['15', '30', '45','60'].map((key, index) => {
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
                          </Box>
                        );
                      })}
                  
                </Container>
                
              </Box>
              <Box sx={{display: 'flex',justifyContent: 'center'}}>
                  <Button 
                    variant={'contained'}
                    onClick={() => handleCreateOfficeClick()}
                    sx={{ height: '3em', fontSize: 14, mt: '2rem'}}
                  >
                    Praxis erstellen
                  </Button>
               
              </Box> 
            </Box>
          {/* Ende rightSide */}
          </Container>
        </Container>
      </Box>

      

      <Modal
        open={open}
        onClose={handleBoxClose}
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

      <Footer />
    </>
  )
}
