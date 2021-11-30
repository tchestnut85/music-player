import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import HeadphonesIcon from '@mui/icons-material/Headphones';

const Header = () => {
	return (
		<AppBar color='primary' position='fixed'>
			<Toolbar>
				<HeadphonesIcon />
				<Typography variant='h6' comopnent='h1'>
					Music Player
				</Typography>
			</Toolbar>
		</AppBar>
	);
};

export default Header;
