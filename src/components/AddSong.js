import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_SONG } from '../utils/mutations';
import ReactPlayer from 'react-player';
import SoundcloudPlayer from 'react-player/lib/players/SoundCloud';
import YoutubePlayer from 'react-player/lib/players/YouTube';
import {
	InputAdornment,
	TextField,
	Button,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
} from '@mui/material';
import AudiotrackIcon from '@mui/icons-material/Audiotrack';
import { makeStyles } from '@mui/styles';
import { Link, AddBoxOutlined } from '@mui/icons-material';

const useStyles = makeStyles(theme => ({
	container: {
		display: 'flex',
		alignItems: 'center',
	},
	urlInput: {
		margin: theme.spacing(1),
	},
	addSongButton: {
		margin: theme.spacing(1),
	},
	dialog: {
		textAlign: 'center',
	},
	thumbnail: {
		width: '90%',
	},
	noThumbnail: {
		height: 100,
		width: 100,
	},
}));

const INITIAL_SONG_STATE = {
	duration: 0,
	title: '',
	artist: '',
	thumbnail: '',
};

const AddSong = () => {
	const classes = useStyles();
	const [addSong, { error }] = useMutation(ADD_SONG);
	const [dialog, setDialog] = useState(false);
	const [url, setUrl] = useState('');
	const [isPlayable, setIsPlayable] = useState(false);
	const [songState, setSongState] = useState(INITIAL_SONG_STATE);

	useEffect(() => {
		const isValidUrl =
			SoundcloudPlayer.canPlay(url) || YoutubePlayer.canPlay(url);
		setIsPlayable(isValidUrl);
	}, [url]);

	async function handleEditSong({ player }) {
		const nestedPlayer = player.player.player;
		let songData;
		if (nestedPlayer.getVideoData) {
			songData = getYoutubeInfo(nestedPlayer);
		} else if (nestedPlayer.getCurrentSound) {
			songData = await getSoundCloudInfo(nestedPlayer);
		}
		setSongState({ ...songData, url });
	}

	function getSoundCloudInfo(player) {
		return new Promise(resolve => {
			player.getCurrentSound(songData => {
				if (songData) {
					resolve({
						duration: Number(songData.duration / 1000),
						title: songData.title,
						artist: songData.SoundcloudPlayer,
						thumbnail: songData.artwork_url.replace('-large', '-t500x500'),
					});
				}
			});
		});
	}

	function getYoutubeInfo(player) {
		const duration = player.getDuration();
		const { title, video_id, author } = player.getVideoData();
		const thumbnail = `http://img.youtube.com/vi/${video_id}/0.jpg`;
		return {
			duration,
			title,
			artist: author,
			thumbnail,
		};
	}

	const handleChangeSong = e => {
		const { name, value } = e.target;
		setSongState(prevSongData => ({ ...prevSongData, [name]: value }));
	};

	const handleAddSong = async () => {
		try {
			const { artist, title, url, thumbnail, duration } = songState;
			await addSong({
				variables: {
					url: url.length > 0 ? url : null,
					thumbnail: thumbnail.length > 0 ? thumbnail : null,
					duration: duration > 0 ? duration : null,
					title: title.length > 0 ? title : null,
					artist: artist.length > 0 ? artist : null,
				},
			});
			handleCloseDialog();
			setSongState(INITIAL_SONG_STATE);
			setUrl('');
		} catch (error) {
			console.error('Error adding song', error);
		}
	};

	const handleError = field => {
		return error?.graphQLErrors[0]?.extensions?.path?.includes(field);
	};

	const handleCloseDialog = () => {
		setDialog(false);
	};

	const { artist, title, thumbnail } = songState;

	return (
		<div className={classes.container}>
			<Dialog
				open={dialog}
				onClose={handleCloseDialog}
				className={classes.dialog}
			>
				<DialogTitle>Edit Song</DialogTitle>
				<DialogContent>
					{thumbnail ? (
						<img
							src={thumbnail}
							alt={`${artist} - ${title}`}
							className={classes.thumbnail}
						/>
					) : (
						<AudiotrackIcon className={classes.noThumbnail} />
					)}
					<TextField
						onChange={handleChangeSong}
						value={title}
						margin='dense'
						name='title'
						label='Title'
						fullWidth
						error={handleError('title')}
						helperText={handleError('title') && 'Title must be entered'}
					/>
					<TextField
						onChange={handleChangeSong}
						value={artist}
						margin='dense'
						name='artist'
						label='Artist'
						fullWidth
						error={handleError('artist')}
						helperText={handleError('artist') && 'Artist must be entered'}
					/>
					<TextField
						onChange={handleChangeSong}
						value={thumbnail}
						margin='dense'
						name='thumbnail'
						label='Thumbnail'
						fullWidth
						error={handleError('thumbnail')}
						helperText={
							handleError('thumbnail') && 'Thumbnail URL must be entered'
						}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleCloseDialog} color='secondary'>
						Cancel
					</Button>
					<Button
						variant='outlined'
						color='primary'
						className={classes.addSongButton}
						onClick={handleAddSong}
					>
						Add Song
					</Button>
				</DialogActions>
			</Dialog>
			<TextField
				onChange={e => setUrl(e.target.value)}
				value={url}
				placeholder='Add Youtube or Soundcloud URL'
				fullWidth
				margin='normal'
				type='url'
				InputProps={{
					startAdornment: (
						<InputAdornment position='start'>
							<Link />
						</InputAdornment>
					),
				}}
				className={classes.urlInput}
			/>
			<Button
				variant='contained'
				color='primary'
				endIcon={<AddBoxOutlined />}
				onClick={() => setDialog(true)}
				disabled={!isPlayable}
			>
				Add
			</Button>
			<ReactPlayer url={url} hidden onReady={handleEditSong} />
		</div>
	);
};

export default AddSong;
