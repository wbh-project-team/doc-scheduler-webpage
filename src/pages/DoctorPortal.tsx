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
import { useContext, useEffect, useRef, useState } from 'react'
import { areaOfExpertise, docs, Doctor } from '../models/Doctors'


import {
  WalletContent,
  WalletContext
} from '../services/web3/wallets/walletProvider'
import Calendar from '../components/Calendar/Calendar'

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
  // const [minutes, setMinutes] = useState(0)
  const [currentDocFromWalletID,setCurrentDocFromWalletID] = useState<Doctor | null>(null)
  const [open, setInfoBoxOpen] = useState(false)
  const handleBoxOpen = () => setInfoBoxOpen(true)
  const handleBoxClose = () => setInfoBoxOpen(false)
  const { isLoggedIn, login, logout, getAddress, getBalance, getPrivateKey } =
  useContext<WalletContent>(WalletContext)

  const textFieldRefFirstName = useRef<HTMLInputElement>();
  const textFieldRefName = useRef<HTMLInputElement>();
  const textFieldRefZip = useRef<HTMLInputElement>();
  const textFieldRefAddress = useRef<HTMLInputElement>();
  const textFieldRefCity = useRef<HTMLInputElement>();
  //const textFieldRefSpec = useRef<HTMLInputElement>();
  const textFieldRefDescription = useRef<HTMLInputElement>();

  useEffect(() => {
    if (isLoggedIn){
      setCurrentDocFromWalletID(findDocInList());
    } //else {setCurrentDocFromWalletID(docs[0])}  // TODO: else entfernen!
  },[isLoggedIn]);

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
    let keyname = String(e.target.name);
    // alert(e.target.name + " " + e.target.value)
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
      let name  = textFieldRefName.current ? textFieldRefName.current.value : '' ;
      let firstname = textFieldRefFirstName.current ? textFieldRefFirstName.current.value : ''; 
      let address = textFieldRefAddress.current ? textFieldRefAddress.current.value : '' ;
      let city = textFieldRefCity.current ? textFieldRefCity.current.value : '' ;
      let zipCode = textFieldRefZip.current ? textFieldRefZip.current.value : '' ;
      let description = textFieldRefDescription.current ? textFieldRefDescription.current.value : "";
      let specificationArray = Object.entries(inputValues).map(([key,val], index) =>{
      // alert(  val +  key + inputSelectValues[key] )
      return { category: val, durationInSecs: inputSelectValues[key] *60};
    });
    
      if((name.length >0 && firstname.length >0 && address.length > 0 && city.length > 0 && zipCode.length >0)){
        docs.push(
          {
            id: 0, // TODO: get id from blockchain
            walletId: getAddress(),
            firstname: firstname, 
            name: name, 
            zipCode: Number(zipCode), 
            address: address, 
            city: city, 
            openHours: Array.apply(null, Array(5)).map(()=>( {start:8.3 * 60 * 60 * 1000, end: 16 * 60 * 60 * 1000, lunchStart: 12*60*60*1000, lunchEnd: 13*60*60*1000} )),
            specialization: currentAreaOfExpertise as keyof typeof areaOfExpertise,
            consultationCategories: specificationArray,
            //consultationCategories: inputValues.map((item: string, index: number) => ( { category: item, durationInSecs: inputSelectValues[index] } )),
            // consultationCategories: [{category: "Beratung", durationInSecs: 1800 }, {category: "Chirurgischer Eingriff", durationInSecs: 3600 }, {category: "Nachsorge", durationInSecs: 900 }],
            description:description,
            rating: 0,
          }
        )
      }
      else{
        //input error
        alert("Bitte tragen Sie in alle mit * gekennzeichneten Felder die notwendigen Informationen ein!")
      }
    
   }
   else{
    setInfoBoxOpen(true);

   }
  }

  function findDocInList() {
    let currWalletAddress = getAddress()
    docs.forEach(element => {
      if (element.walletId == currWalletAddress){
        return element
      }
    });
    return null
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
        { 
        // wenn User nicht eingeloggt ist oder unter dieser WalletAdresse noch keine Praxis erstellt wurde //TODO Ausrufezeichen entfernen
        (isLoggedIn || currentDocFromWalletID != null) ? 
          (
            //wenn der User eingeloggt ist und unter der WalletAdresse eine Praxis erstellt wurde
            <Container sx={{ display: 'flex',  flexDirection: 'column', transform: 'translate(-2.5%, 0%)',margin:'20px',paddingBottom: '90px'}}>
              <Typography variant='h1'>
                Ihre Termine, {currentDocFromWalletID ? currentDocFromWalletID.firstname : 'vorname'} {currentDocFromWalletID ? currentDocFromWalletID.name : 'name'}
              </Typography>
              <br></br>
              <Box sx={{paddingBottom: '15px', height: '50%'}}>
                <Calendar
                  anonym={false}
                  docWalletId={currentDocFromWalletID ? currentDocFromWalletID.walletId : ''} 
                  openHours={currentDocFromWalletID ? currentDocFromWalletID.openHours : []} 
                  consultationCategories={currentDocFromWalletID ? currentDocFromWalletID.consultationCategories : []}></Calendar>
              </Box>
            </Container>
          )
          :
          
          (
            <Container sx={{ display: 'flex',  transform: 'translate(-3%, 0%)',paddingBottom: '15px',}}>
                <Box 
                  sx={{
                    display: 'flex',
                    flexDirection: 'column', 
                    width: '33%',
                    // height: '70vh',
                    backgroundColor: 'white',
                    border: '3px solid tomato',
                    borderBottomLeftRadius : '12%',
                    borderTopRightRadius: '12%',
                    margin:'2rem',
                    padding: '15px',
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
                      transform: 'translate(-50px, -22px) rotate(-30deg)',
                      
                    }}
                  />
                  <Typography 
                    variant='h2' 
                    sx={{
                      width: '200%', 
                      transform: 'translate(-35px, 0px)',
                      color: 'tomato',
                      textAlign: 'center',
                      // pt: '1rem',
                      // backgroundColor: 'blue',
                    }}
                  >
                    Werde Teil der Community!
                    </Typography>
                  </Container>
                    <Typography variant='h5'>
                    Registrieren Sie ganz einfach Ihre Praxis und testen Sie 24 Stunden ihren neuen Praxiskalender. 
                    </Typography>
                    <br></br>
                    <Typography variant='h4' sx={{color: 'primary.main',fontWeight: 'bold'}}>
                    Lizenzgebühren: 100 €/ Monat, monatlich kündbar! 
                    </Typography>
                    <br></br>
                    <Typography variant='h5' sx={{}}>
                    Sie können bis zu 6 verschiedene Terminkategorien mit entsprechender Länge definieren und eine individuelle Beschreibung Ihrer Praxis hinzufügen.
                    </Typography>
                    <br></br>
                    <Typography variant='h5' sx={{}}>
                    Seien Sie sichtbar und nutzen Sie die Vorteile unserer Community!
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
                          <Container sx={{display: 'flex', flexDirection: 'row', padding:'0', margin:'0', gap: '10px'}}>
                            <CustomTextField required inputRef={textFieldRefFirstName} id="firstname" label="Vorname und Titel" defaultValue='Dr.'/>
                            <CustomTextField required inputRef={textFieldRefName} id="name" label="Nachname/ Praxisname" defaultValue=''/>
                          </Container>
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
                          <CustomTextField required inputRef={textFieldRefAddress} id="address" label="Strasse und Hausnr." defaultValue=""/>
                          <CustomTextField required inputRef={textFieldRefZip} id="plz" label="PLZ" defaultValue=""/>
                          <CustomTextField required inputRef={textFieldRefCity} id="city" label="Stadt" defaultValue=""/>
                          <CustomTextField inputRef={textFieldRefDescription} id="description" label="Beschreibung" defaultValue="" multiline rows={4}/>
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
                            <FormControl  id={'Spec'+index} sx={{  marginBottom: '1rem', height: '50px', width: '10em' }} size="small">
                            <InputLabel  variant='outlined' sx={{backgroundColor: 'white', color:'grey', }} id="spec">Dauer</InputLabel>
                              <Select
                                key={'S'+index}
                                input={<BootstrapInput />}
                                // sx={{height: '50px'}}
                                name={'Spec'+index}
                                //value={duration}
                                onChange={handleSelectOnChange}
                              >
                              {['15', '30', '45','60'].map((key, index) => {
                                return (
                                  <MenuItem
                                    id={'Spec'+index}
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
            )
        }
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
