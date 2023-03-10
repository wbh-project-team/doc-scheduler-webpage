import {
  Box,
  Button,
  Container,
  Typography,
  ListItem,
  ListItemText
} from '@mui/material'
import Head from 'next/head'

import { useRouter } from 'next/router'
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'
import Calendar from '../components/Calendar/Calendar'

export default function Home() {
  const router = useRouter()

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
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            width: '95%',
            // height: '120vh',
            color: 'secondary.main',
            fontSize: '120%',
            padding: '2vw',
            mt: '100px',
            marginBottom: '220px',
            pb: '100px',
            gap: '15px',
            transform: 'translate(2.5%, 0%)',
            display: 'flex',
						flexDirection: 'column',
          }}
        >
          <Typography variant='h2'>IMPRESSUM</Typography>
          <Container>
            <Typography sx={{fontWeight: 'bold'}}> Anbieter dieser Seite ist: </Typography>
            <Typography>
              ÄOG<br/>
              Musterstr. 51<br/>
              60441 Nürnberg<br/>
              Telefon: +49 (0)66 1234567<br/>
              E-Mail: kontakt@aog.de<br/>
              Geschäftsführer: Marko Muster<br/>
              Handelsregister: Amtsgericht Nürnberg <br/>
              Umsatzsteuer-Identifikationsnummer: DExxxxxxxx<br/>
            </Typography>
          </Container>
          <Container>
            <Typography sx={{fontWeight: 'bold'}}>
              Webdesign und technische Umsetzung:
            </Typography>
            <Typography>
              ÄOG 
            </Typography>
          </Container>
          <Typography variant='h4' sx={{fontWeight: 'bold'}}>
              DISCLAIMER
            </Typography>
          <Container>
            <Typography sx={{fontWeight: 'bold'}}>
              Haftung für Inhalte:
            </Typography>
            <Typography>
Die Erstellung der Inhalte dieser Webseite erfolgte mit größtmöglicher Sorgfalt. Allerdings können wir keine Gewähr für die Vollständigkeit der bereitgestellten Inhalte, ihre Aktualität sowie Richtigkeit übernehmen. Gem. §§ 8 - 10 TMG trifft uns als Dienstanbieter keine Pflicht, fremde Informationen, die übermittelt oder gespeichert wurden, zu überwachen oder nach Anhaltspunkten und Umständen zu forschen, die die Rechtswidrigkeit von Tätigkeiten und Informationen indizieren.
Eine Verpflichtung unsererseits zur Nutzungssperrung von Inhalten im Rahmen der allgemeinen Gesetze bleibt hiervon stets unberührt. Diese Haftung kommt jedoch erst im Moment der Kenntnisnahme einer konkreten Verletzung von Rechten in Frage. Sollten uns Rechtsverletzungen bekannt werden, so sind die entsprechenden Inhalte von uns unverzüglich zu entfernen.
Unsere Haftung für eigene Inhalte richtet sich, als Dienstanbieter, nach den allgemeinen Gesetzen.
</Typography>
<Typography sx={{fontWeight: 'bold'}}>
Urheberrecht/Leistungsschutzrecht:
</Typography>
<Typography>
Alle Inhalte (Texte, Bilder sowie deren Anordnung, Layout-, Schrift- und Farbgestaltung) auf den Webseiten der ÄoG unterliegen dem Schutz des Urheberrechts.
</Typography>
<Typography sx={{fontWeight: 'bold'}}>
Änderungen der Datenschutzerklärung:
</Typography>
<Typography>
Sollten zukünftig Änderungen unserer Datenschutzerklärung vorgenommen werden, so werden die Änderungen stets auf diesen Seiten zu finden sein.
</Typography>
<Typography sx={{fontWeight: 'bold'}}>
Ärzteverzeichnis und verlinkte Webseiten:
</Typography>
<Typography>
Das Ärzteverzeichnis wird auf der Basis von Eigenangaben durch die einzelnen Ärzte erstellt. 
Für die Richtigkeit der externen Angaben kann trotz sorgfältiger Prüfung keine Gewähr übernommen werden. 
Unsere Webseite enthält auch Links auf externe Webseiten, z.B. von Ärzten. 
Auf Inhalte dieser direkt oder indirekt verlinkten Webseiten haben wir keinen Einfluss und können
keine Gewähr für die Richtigkeit der Inhalte dieser „externen Links“ übernehmen. 
</Typography>
</Container>
<Container>
  <Typography sx={{fontWeight: 'bold'}}>
    Durchschnittliche monatlichen Anzahl aktiver Nutzer des Ärzteverzeichnisses:
</Typography>
<Typography>
    In Übereinstimmung mit Artikel 24(2) der Verordnung des europäischen Parlaments und des Rates über einen Binnenmarkt für digitale Dienste und zur Änderung der Richtlinie 2000/31/EG (Gesetz über digitale Dienste), sind Online-Plattformen verpflichtet Informationen zu der durchschnittlichen monatlichen Zahl aktiver Nutzer des Dienstes in der Union, berechnet aus einem Durchschnitt der letzten sechs Monate, zu veröffentlichen.
    Der Zweck dieser Veröffentlichung ist es festzustellen, ob eine Online-Plattform als “sehr große Online-Plattform”, mit mindestens durchschnittlich 45 Millionen aktiven Nutzern, im Sinne des Gesetzes über digitale Dienste zu qualifizieren ist.
    Für den Zeitraum vom 1. Januar 2023 bis zum 31. Januar 2023 war die durchschnittliche Anzahl der aktiven Nutzer unter 45 Millionen, also unter dem Schwellenwert, um als “sehr große Online-Plattform" qualifiziert zu werden.
    Diese Information wird mindestens einmal alle sechs Monate geupdatet.
          </Typography>
          </Container>
        </Container>
      </Box>

      <Footer />
    </>
  )
}
