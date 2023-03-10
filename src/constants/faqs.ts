export interface FAQ {
	question: string;
	answer: string;
}


export const faqsAerzte: FAQ[] = [
{
    question: "Kann die Arztpraxis Urlaubszeiten angeben, zu denen die Praxis geschlossen hat?",
    answer: "Nein, Urlaubszeiten werden nicht unterhalb der Öffnungszeiten angezeigt. Diese Wochen können manuell von der Arztpraxis im Online Kalender geblockt werden",
},
{
    question: "Bis zu welchem Zeitpunkt vor Beginn des Termines kann der termin vom Arzt abgesagt werden?",
    answer: "Bis 24 Stunden vor Beginn des Termins.",
},
{
    question: "Kann auch bei vom Arzt selbst eingetragenen Terminen eine Gebühr verlangt/hinterlegt werden?",
    answer: "Diese Termine werden ohne Patientennamen eingegeben (evtl. eine Nummer) (Datenschutz der nicht registrierten User) und ohne Wallet Adresse, sie werden entsprechend als vom Arzt manuell eingetragenen Termin markiert und es kann keine evtl. anfallende Gebühr eingezogen werden",
},
{
    question: "Muss die Arztpraxis bei Registrierung ein Profilbild hinterlegen?",
    answer: "Nein, es muss kein Profilbild hinterlegt werden. In diesem Fall wird ein Platzhalter angezeigt",
},
{
    question: "Erhält die Arztpraxis bei Absage eines Termines vom Patienten automatisch eine zusätzliche Benachrichtigung oder aktualisiert sich nur der Kalender?",
    answer: "Der Praxiskalender wird automatisch aktualisiert, eine zusätzliche Benachrichtigung/Email gibt es nicht",
},
{
    question: "Ich brauche Hilfe beim Anlegen des Praxiskalenders. Wo finde ich Informationen?",
    answer: "Sie finden eine Schritt-für-Schritt Anleitung in folgenden Dokumenten: "
}



];