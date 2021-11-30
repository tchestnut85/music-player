import { createTheme } from '@mui/material/styles';
import { teal, purple } from '@mui/material/colors';

const theme = createTheme({
	palette: {
		primary: teal,
		secondary: purple,
		mode: 'dark',
	},
});

export default theme;
