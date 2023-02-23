import { SvgIconProps, SvgIconTypeMap } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import SendIcon from '@mui/icons-material/Send';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import { Url } from 'url';
import { OverridableComponent } from '@mui/material/OverridableComponent';

export interface Links {
	name: string;
	link: string;
	icon?: OverridableComponent<SvgIconTypeMap<{}, 'svg'>> & {
		muiName: string;
	};
}

export const links_left: Links[] = [
	{ name: 'Hotline', link: '/YourAppointments', icon: ContactPhoneIcon },
	{ name: 'Email', link: '/YourAppointments', icon: SendIcon },
	{ name: 'FAQs', link: '/DoctorsOffice', icon: QuestionAnswerIcon },
];

export const links_right: Links[] = [
	{ name: 'Datenschutz', link: '/YourAppointments' },
	{ name: 'AGBs', link: '/DoctorsOffice' },
	{ name: 'Impressum', link: '/YourAppointments' }, // is there a possibility to simply put no icon?
];
