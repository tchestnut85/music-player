import {
	Card,
	Typography,
	CardContent,
	IconButton,
	Slider,
	CardMedia,
} from '@mui/material';
import React from 'react';
import { makeStyles } from '@mui/styles';

import SongQueue from './SongQueue';
import { PlayArrow, SkipPrevious } from '@mui/icons-material';
import SkipNextIcon from '@mui/icons-material/SkipNext';

const PLACEHOLDER_URL =
	'https://i1.sndcdn.com/avatars-000002626831-y05l3t-t500x500.jpg';

const useStyles = makeStyles(theme => ({
	container: {
		display: 'flex',
		justifyContent: 'space-between',
	},
	details: {
		display: 'flex',
		flexDirection: 'column',
		padding: '0px 15px',
	},
	content: {
		flex: '1 0 auto',
	},
	thumbnail: {
		width: 150,
	},
	controls: {
		display: 'flex',
		alignItems: 'center',
		paddingLeft: theme.spacing(1),
		paddingRight: theme.spacing(1),
	},
	playIcon: {
		height: 38,
		width: 38,
	},
}));

const SongPlayer = () => {
	const classes = useStyles();

	return (
		<>
			<Card variant='outlined' className={classes.container}>
				<div className={classes.details}>
					<CardContent className={classes.content}>
						<Typography variant='h5' component='h3'>
							Title
						</Typography>
						<Typography variant='subtitle1' component='p' color='textSecondary'>
							Artist
						</Typography>
					</CardContent>
					<div className={classes.controls}>
						<IconButton>
							<SkipPrevious />
						</IconButton>
						<IconButton>
							<PlayArrow className={classes.playIcon} />
						</IconButton>
						<IconButton>
							<SkipNextIcon />
						</IconButton>
						<Typography variant='subtitle1' component='p' color='textSecondary'>
							00:05:30
						</Typography>
					</div>
					<Slider type='range' min={0} max={1} step={0.01} />
				</div>
				<CardMedia image={PLACEHOLDER_URL} className={classes.thumbnail} />
			</Card>
			<SongQueue />
		</>
	);
};

export default SongPlayer;
