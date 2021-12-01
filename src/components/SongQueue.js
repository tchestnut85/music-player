import React from 'react';
import { Avatar, IconButton, Typography, useMediaQuery } from '@mui/material';
import { DUMMY_DATA, PLACEHOLDER_URL } from '../utils/data';
import { Delete } from '@mui/icons-material';
import { makeStyles } from '@mui/styles';

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
	const { artist, title } = song;

	return (
		<div className={classes.container}>
			<Avatar
				src={PLACEHOLDER_URL}
				alt='Song Thumbnail'
				className={classes.avatar}
			/>
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
			<IconButton>
				<Delete color='error' />
			</IconButton>
		</div>
	);
};

const SongQueue = () => {
	const greaterThanMd = useMediaQuery(theme => theme.breakpoints.up('md'));

	return (
		greaterThanMd && (
			<div style={{ margin: '10px 0' }}>
				<Typography color='textSecondary' variant='button'>
					Queue (5)
				</Typography>
				{Array.from({ length: 5 }, () => DUMMY_DATA).map((DUMMY_DATA, i) => (
					<QueuedSong key={i} song={DUMMY_DATA} />
				))}
			</div>
		)
	);
};

export default SongQueue;
