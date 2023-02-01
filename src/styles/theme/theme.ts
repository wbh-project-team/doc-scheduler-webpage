import { createTheme, responsiveFontSizes } from '@mui/material/styles';

import '@fontsource/roboto-flex/variable-full.css'; // This contains ALL variable axes. Font files are larger.

declare module '@mui/material/styles' {
	interface BreakpointOverrides {
		xs: false; // removes the `xs` breakpoint
		sm: false;
		md: false;
		lg: false;
		xl: false;
		mobile: true; // adds the `mobile` breakpoint
		tablet: true;
		laptop: true;
		desktop: true;
	}
}

declare module '@mui/material/styles' {
	interface Palette {
		neutral: Palette['primary'];
	}

	interface PaletteOptions {
		neutral: PaletteOptions['primary'];
	}
}

let theme = createTheme({
	palette: {
		primary: {
			main: '#4021FF',
			light: '#8754ff',
			dark: '#0000ca',
			contrastText: '#fff',
		},
		secondary: {
			main: '#fff',
			contrastText: '#000',
		},
		neutral: {
			main: '#fff',
		},
		text: {
			primary: '#fff',
			secondary: '#fff',
		},
		background: {
			default: '#0A0A0A',
			paper: '#333',
		},
		divider: 'rgba(255, 255, 255, 0.06)',
		common: {
			black: '#000',
			white: '#fff',
		},
		grey: {
			'50': '#fafafa',
			'100': '#f5f5f5',
			'200': '#eeeeee',
			'300': '#e0e0e0',
			'400': '#bdbdbd',
			'500': '#9e9e9e',
			'600': '#757575',
			'700': '#616161',
			'800': '#424242',
			'900': '#212121',
		},
		// Used by `getContrastText()` to maximize the contrast between
		// the background and the text.
		contrastThreshold: 4.5,
		// Used by the functions below to shift a color's luminance by approximately
		// two indexes within its tonal palette.
		// E.g., shift from Red 500 to Red 300 or Red 700.
		tonalOffset: 0.2,
	},
	typography: {
		fontFamily: ['Roboto Flex', 'sans-serif'].join(','),
		h1: {
			fontWeight: 900,
		},
		h2: {
			fontWeight: 900,
		},
		button: {
			fontWeight: 700,
			fontSize: 14,
			textTransform: 'none',
		},
		h6: {
			fontWeight: 700,
			fontSize: 14,
		},
	},
	components: {
		MuiLink: {
			defaultProps: {
				color: '#fff',
			},
		},
		MuiButton: {
			defaultProps: {
				style: {
					borderRadius: 12,
				},
			},
			styleOverrides: {
				root: ({ ownerState }) => ({
					...(ownerState.variant === 'contained' &&
						ownerState.color === 'primary' && {
							background: 'linear-gradient(95.97deg, #4021FF 73.59%, #1582D0 109.56%)',
							backgroundColor: 'rgba(255, 255, 255, 0.06)',
							':hover': {
								background: '#1582D0',
							},
						}),
					...(ownerState.variant === 'outlined' && {
						border: '1px solid rgba(255, 255, 255, 0.06)',
						color: '#fff',
					}),
				}),
			},
		},
	},
	breakpoints: {
		values: {
			mobile: 0,
			tablet: 640,
			laptop: 1105,
			desktop: 1536,
		},
	},
});

theme.spacing(2);

export default theme = responsiveFontSizes(theme);
