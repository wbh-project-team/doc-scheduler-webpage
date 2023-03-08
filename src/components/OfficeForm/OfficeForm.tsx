import { Avatar, Typography, Link, styled, TextField, InputBase, Container, FormControl, InputLabel, Select, MenuItem, Button, Modal } from '@mui/material'
import { Box } from '@mui/system'
import { useRouter } from 'next/router'
import { useContext, useEffect, useRef, useState } from 'react'
import { areaOfExpertise, docs, Doctor } from '../../models/Doctors'

import {
  WalletContent,
  WalletContext
} from '../../services/web3/wallets/walletProvider'

const weekdays = ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag']

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

interface Props {
  currdoctor: Doctor | null
  changeExistingData: boolean
}

export default function OfficeForm({ currdoctor, changeExistingData }: Props) {
  const [inputValues, setInputValues] = useState<{[key: string]: any }>({});
  const [inputSelectValues, setInputSelectValues] = useState<{[key: string]: any }>({});
  const [counter, setCounter] = useState(currdoctor ? currdoctor.consultationCategories.length : 1 );
  const [currentAreaOfExpertise, setAreaOfExpertise] = useState<string>(currdoctor ? currdoctor.specialization : '')
  const [open, setInfoBoxOpen] = useState(false)
  const handleBoxOpen = () => setInfoBoxOpen(true)
  const handleBoxClose = () => setInfoBoxOpen(false)
  const [formVisible, setFormVisible] = useState(false)
  const { isLoggedIn, login, logout, getAddress, getBalance, getPrivateKey } =
  useContext<WalletContent>(WalletContext)

  const textFieldRefFirstName = useRef<HTMLInputElement>();
  const textFieldRefName = useRef<HTMLInputElement>();
  const textFieldRefZip = useRef<HTMLInputElement>();
  const textFieldRefAddress = useRef<HTMLInputElement>();
  const textFieldRefCity = useRef<HTMLInputElement>();
  const textFieldRefDescription = useRef<HTMLInputElement>();

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

  useEffect(() => {
    if(changeExistingData){
      let specializationDurations: { [key: string]: number }  = {};
      let specializations: { [key: string]: string }  = {};
      currdoctor?.consultationCategories.forEach((element,index) =>{
        let keyname = "Spec"+String(index)
        specializations[keyname] = currdoctor.consultationCategories[index].category;
        specializationDurations[keyname] = currdoctor.consultationCategories[index].durationInSecs/60
      })
      setInputValues( specializations )
      setInputSelectValues(specializationDurations)
    }else{
      setFormVisible(true)
    }
      
  }, []);

  useEffect(() => {
    if (changeExistingData){
      setFormVisible(true)
    }
  },[inputSelectValues])

  // const getDefaultValueCC = (index: number) => {
  //   if (currdoctor && index < currdoctor?.consultationCategories.length) {
  //     let specializations: { [key: string]: string }  = {};
  //     let keyname = "Spec"+String(index)
  //     specializations[keyname] = currdoctor.consultationCategories[index].category;
  //     setInputValues({ ...inputValues, ...specializations });
  //     return specializations[keyname]
  //   } else {
  //       return ""
  //     }
  // }

  // const getDefaultValueCD = (index: number) => {
  //   if (currdoctor && index < currdoctor?.consultationCategories.length) {
  //       let specializationDurations: { [key: string]: number }  = {};
  //       let keyname = "Spec"+String(index)
  //       specializationDurations[keyname] = currdoctor.consultationCategories[index].durationInSecs/60
  //       setInputSelectValues({ ...inputSelectValues, ...specializationDurations });
  //       return specializationDurations[keyname]
  //     } else {
  //       return ""
  //     }
  // }

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
        
        const newDocData = {
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
        
        if(!currdoctor){
          docs.push( newDocData )
        } else {
          // Daten ersetzen
          // TODO: Daten in Blockchain aendern!
          let index = -1
          let i = 0;
          for (const element of docs){
            if (element.id == currdoctor.id){
              index=i;
              break;
            }
            i++;
          }
          if (index !== -1){
            docs[index] = newDocData
          }
        }
      }
      else{
        //input error
        alert("Bitte tragen Sie in alle mit * gekennzeichneten Felder die notwendigen Informationen ein!")
      }
   }
   else{
    handleBoxOpen();
   }
  }

  return (
    <>
    { formVisible && (
        <Box
        id='outerform'
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
                      <CustomTextField required inputRef={textFieldRefFirstName} id="firstname" label="Vorname und Titel" defaultValue={currdoctor?.firstname}/>
                      <CustomTextField required inputRef={textFieldRefName} id="name" label="Nachname/ Praxisname" defaultValue={currdoctor?.name}/>
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
                    <CustomTextField required inputRef={textFieldRefAddress} id="address" label="Strasse und Hausnr." defaultValue={currdoctor?.address}/>
                    <CustomTextField required inputRef={textFieldRefZip} id="plz" label="PLZ" defaultValue={currdoctor?.zipCode}/>
                    <CustomTextField required inputRef={textFieldRefCity} id="city" label="Stadt" defaultValue={currdoctor?.city}/>
                    <CustomTextField inputRef={textFieldRefDescription} id="description" label="Beschreibung" defaultValue={currdoctor?.description} multiline rows={4}/>
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
                        value={inputValues['Spec'+index]}
                        onChange={handleOnChange}
                        id={'Spec'+index}
                        type="text"
                      />
                      </Box>
                      <FormControl  id={'Spec'+index} sx={{  marginBottom: '1rem', height: '50px', width: '10em' }} size="small">
                        <InputLabel  variant='outlined' sx={{backgroundColor: 'white', color:'grey', }} id="spec">Dauer</InputLabel>
                        <Select
                          key={'S'+index}
                          input={<BootstrapInput />}
                          // sx={{height: '50px'}}
                          name={'Spec'+index}
                          value={inputSelectValues['Spec'+index]}
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
                  })
                }
              </Container>
            </Box>
            <Box sx={{display: 'flex',justifyContent: 'center', gap: '10px'}}>
              <Button 
                variant={'contained'}
                onClick={() => { handleCreateOfficeClick()}}
                sx={{ height: '3em', fontSize: 14, mt: '2rem'}}
              >
                {changeExistingData ? "Praxis-Daten speichern" : "Praxis erstellen"}
              </Button>
            </Box> 
        </Box>
    )}
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
    </>
  );
}