import React, { useState, useRef } from 'react';
import {
	Card,
	Typography,
	CardContent,
	IconButton,
	Slider,
	CardMedia,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { PlayArrow, SkipPrevious, Pause } from '@mui/icons-material';
import SkipNextIcon from '@mui/icons-material/SkipNext';

import SongQueue from './SongQueue';
import { useSongContext } from '../utils/context/SongState';
import { PLAY_SONG, PAUSE_SONG } from '../utils/context/songReducer';
import { useQuery } from '@apollo/client';
import { GET_QUEUED_SONGS } from '../utils/queries';
import ReactPlayer from 'react-player';

const useStyles = makeStyles(theme => ({
	container: {
		display: 'flex',
		justifyContent: 'space-between',
		margin: '0 24px 24px',
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
	const { data } = useQuery(GET_QUEUED_SONGS);
	const [{ song, isPlaying }, dispatch] = useSongContext();
	const reactPlayerRef = useRef();
	const [played, setPlayed] = useState(0);
	const [seeking, setSeeking] = useState(false);
	const [playedSeconds, setPlayedSeconds] = useState(0);

	const handleTogglePlay = () => {
		dispatch(isPlaying ? { type: PAUSE_SONG } : { type: PLAY_SONG });
	};

	const handleProgressChange = (e, newValue) => {
		setPlayed(newValue);
	};

	const handleSeekMouseDown = () => setSeeking(true);

	const handleSeekMouseUp = () => {
		setSeeking(false);
		reactPlayerRef.current.seekTo(played);
	};

	const formatDuration = seconds =>
		new Date(seconds * 1000).toISOString().substring(11, 19);

	return (
		<>
			<Card variant='outlined' className={classes.container}>
				<div className={classes.details}>
					<CardContent className={classes.content}>
						<Typography variant='h5' component='h3'>
							{song?.title}
						</Typography>
						<Typography variant='subtitle1' component='p' color='textSecondary'>
							{song?.artist}
						</Typography>
					</CardContent>
					<div className={classes.controls}>
						<IconButton>
							<SkipPrevious />
						</IconButton>
						<IconButton onClick={handleTogglePlay}>
							{isPlaying ? (
								<Pause className={classes.playIcon} />
							) : (
								<PlayArrow className={classes.playIcon} />
							)}
						</IconButton>
						<IconButton>
							<SkipNextIcon />
						</IconButton>
						<Typography variant='subtitle1' component='p' color='textSecondary'>
							{formatDuration(playedSeconds)}
						</Typography>
					</div>
					<Slider
						onMouseDown={handleSeekMouseDown}
						onMouseUp={handleSeekMouseUp}
						onChange={handleProgressChange}
						value={played}
						type='range'
						min={0}
						max={1}
						step={0.01}
					/>
				</div>
				<ReactPlayer
					ref={reactPlayerRef}
					url={song?.url}
					playing={isPlaying}
					hidden
					onProgress={({ played, playedSeconds }) => {
						if (!seeking) {
							setPlayed(played);
							setPlayedSeconds(playedSeconds);
						}
					}}
				/>
				<CardMedia
					image={song?.thumbnail}
					alt={song?.title}
					className={classes.thumbnail}
				/>
			</Card>
			<SongQueue queue={data?.queue} />
		</>
	);
};

export default SongPlayer;
