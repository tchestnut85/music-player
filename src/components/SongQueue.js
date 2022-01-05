import React from 'react';
import { Avatar, IconButton, Typography, useMediaQuery } from '@mui/material';
import { Delete } from '@mui/icons-material';
import { makeStyles } from '@mui/styles';
import { ADD_OR_REMOVE_FROM_QUEUE } from '../utils/mutations';
import { useMutation } from '@apollo/client';

const useStyles = makeStyles({
	avatar: {
		width: 44,
		height: 44,
	},
	text: {
		textOverflow: 'ellipsis',
		overflow: 'hidden',
	},
	container: {
		display: 'grid',
		gridAutoFlow: 'column',
		gridTemplateColumns: '50px auto 50px',
		gridGap: 12,
		alignItems: 'center',
		marginTop: 10,
	},
	songInfoContainer: {
		overflow: 'hidden',
		whiteSpace: 'nowrap',
	},
});

const QueuedSong = ({ song }) => {
	const classes = useStyles();
	const [addOrRemoveFromQueue] = useMutation(ADD_OR_REMOVE_FROM_QUEUE, {
		onCompleted: data =>
			localStorage.setItem('queue', JSON.stringify(data.addOrRemoveFromQueue)),
	});
	const { artist, title, thumbnail } = song;

	const handleAddOrRemoveFromQueue = () => {
		addOrRemoveFromQueue({
			variables: { input: { ...song, __typename: 'Song' } },
		});
	};

	return (
		<div className={classes.container}>
			<Avatar src={thumbnail} alt='Song Thumbnail' className={classes.avatar} />
			<div className={classes.songInfoContainer}>
				<Typography variant='subtitle2' className={classes.text}>
					{title}
				</Typography>
				<Typography
					color='textSecondary'
					variant='body2'
					className={classes.text}
				>
					{artist}
				</Typography>
			</div>
			<IconButton onClick={handleAddOrRemoveFromQueue}>
				<Delete color='error' />
			</IconButton>
		</div>
	);
};

const SongQueue = ({ queue }) => {
	const greaterThanMd = useMediaQuery(theme => theme.breakpoints.up('md'));

	return (
		greaterThanMd && (
			<div style={{ margin: '10px 0' }}>
				<Typography color='textSecondary' variant='button'>
					Queue ({queue.length})
				</Typography>
				{queue.map((song, i) => (
					<QueuedSong key={i} song={song} />
				))}
			</div>
		)
	);
};

export default SongQueue;
