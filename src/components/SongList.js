import React, { useState } from 'react';
import {
	Card,
	CircularProgress,
	CardMedia,
	Typography,
	CardActions,
	IconButton,
	CardContent,
} from '@mui/material';
import { PlayArrow, Save } from '@mui/icons-material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(theme => ({
	container: {
		margin: theme.spacing(3),
	},
	songInfoContainer: {
		display: 'flex',
		alignItems: 'center',
	},
	songInfo: {
		width: '100%',
		display: 'flex',
		justifyContent: 'space-between',
	},
	thumbnail: {
		objectFit: 'cover',
		width: 140,
		height: 140,
	},
}));

const Song = ({ song }) => {
	const { artist, title, thumbnail } = song;
	const classes = useStyles();

	return (
		<Card className={classes.container}>
			<div className={classes.songInfoContainer}>
				<CardMedia image={thumbnail} className={classes.thumbnail} />
				<div className={classes.songInfo}>
					<CardContent>
						<Typography gutterBottom variant='h5' component='h2'>
							{title}
						</Typography>
						<Typography variant='body1' component='p' color='textSecondary'>
							{artist}
						</Typography>
					</CardContent>
					<CardActions>
						<IconButton size='small' color='primary'>
							<PlayArrow />
						</IconButton>
						<IconButton size='small' color='secondary'>
							<Save color='secondary' />
						</IconButton>
					</CardActions>
				</div>
			</div>
		</Card>
	);
};

const SongList = () => {
	let loading = false;

	const DUMMY_DATA = {
		title: 'Deceiver of the Gods',
		artist: 'Amon Amarth',
		thumbnail: 'https://i1.sndcdn.com/avatars-000002626831-y05l3t-t500x500.jpg',
	};

	if (loading) {
		return (
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					marginTop: 50,
				}}
			>
				<CircularProgress />
			</div>
		);
	}

	return (
		<div>
			{Array.from({ length: 10 }, () => DUMMY_DATA).map((DUMMY_DATA, i) => (
				<Song key={i} song={DUMMY_DATA} />
			))}
		</div>
	);
};

export default SongList;
