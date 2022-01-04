import { createTheme } from '@mui/material/styles';
import { cyan, blueGrey } from '@mui/material/colors';

const theme = createTheme({
	palette: {
		primary: {
			main: cyan[800],
		},
		secondary: {
			main: blueGrey[500],
		},
		mode: 'dark',
	},
});

export default theme;
