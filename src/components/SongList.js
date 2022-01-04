import React, { useEffect, useState } from 'react';
import {
	Card,
	CircularProgress,
	CardMedia,
	Typography,
	CardActions,
	IconButton,
	CardContent,
} from '@mui/material';
import { PlayArrow, Save, Pause } from '@mui/icons-material';
import { makeStyles } from '@mui/styles';
import { useSubscription } from '@apollo/client';
import { GET_SONGS } from '../utils/subscriptions';
import { useSongContext } from '../utils/context/SongState';
import { PLAY_SONG, PAUSE_SONG, SET_SONG } from '../utils/context/songReducer';

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

const Song = ({ song: currentSong }) => {
	const classes = useStyles();

	const [{ song, isPlaying }, dispatch] = useSongContext();
	const [isCurrentSongPlaying, setIsCurrentSongPlaying] = useState(false);

	useEffect(() => {
		const isSongPlaying = isPlaying && currentSong?.id === song?.id;
		setIsCurrentSongPlaying(isSongPlaying);
	}, [currentSong?.id, song?.id, isPlaying]);

	const handleTogglePlay = () => {
		dispatch({ type: SET_SONG, payload: { currentSong } });
		dispatch(isPlaying ? { type: PAUSE_SONG } : { type: PLAY_SONG });
	};

	return (
		<Card className={classes.container}>
			<div className={classes.songInfoContainer}>
				<CardMedia
					image={currentSong?.thumbnail}
					className={classes.thumbnail}
				/>
				<div className={classes.songInfo}>
					<CardContent>
						<Typography gutterBottom variant='h5' component='h2'>
							{currentSong?.title}
						</Typography>
						<Typography variant='body1' component='p' color='textSecondary'>
							{currentSong?.artist}
						</Typography>
					</CardContent>
					<CardActions>
						<IconButton size='small' color='primary' onClick={handleTogglePlay}>
							{isCurrentSongPlaying ? <Pause /> : <PlayArrow />}
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
	const { data, loading, error } = useSubscription(GET_SONGS);

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

	if (error) {
		return <div>Error fetching songs...</div>;
	}

	return (
		<div>
			{data.songs.map(song => (
				<Song key={song.id} song={song} />
			))}
		</div>
	);
};

export default SongList;
