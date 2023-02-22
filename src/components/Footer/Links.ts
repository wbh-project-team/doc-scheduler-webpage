

import { SvgIconProps } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import SendIcon from '@mui/icons-material/Send';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import { Url } from 'url';

export interface Links {
	name: string;
	link: string;
	icon: (props: SvgIconProps) => JSX.Element;
}

export const links_left: Links[] = [
	{ name: 'Hotline', link: '/YourAppointments', icon:ContactPhoneIcon  },
	{ name: 'Email', link: '/YourAppointments', icon:SendIcon },
	{ name: 'FAQs', link: '/DoctorsOffice', icon:QuestionAnswerIcon  }
	
];

export const links_right: Links[] = [
	{ name: 'Datenschutz', link: '/YourAppointments' , icon:SendIcon },
	{ name: 'AGBs', link: '/DoctorsOffice', icon:SendIcon },
	{ name: 'Impressum', link: '/YourAppointments', icon: SendIcon  }  // is there a possibility to simply put no icon?
	
];

