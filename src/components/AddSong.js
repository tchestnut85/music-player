import React, { useState } from 'react';
import {
	InputAdornment,
	TextField,
	Button,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	useMediaQuery,
} from '@mui/material';
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
}));

const AddSong = () => {
	const [dialog, setDialog] = useState(false);
	const classes = useStyles();
	const greaterThanSm = useMediaQuery(theme => theme.breakpoints.up('sm'));

	const handleCloseDialog = () => {
		setDialog(false);
	};

	return (
		<div className={classes.container}>
			<Dialog
				open={dialog}
				onClose={handleCloseDialog}
				className={classes.dialog}
			>
				<DialogTitle>Edit Song</DialogTitle>
				<DialogContent>
					<img
						// hardcoded image for development
						src='https://i1.sndcdn.com/avatars-000002626831-y05l3t-t500x500.jpg'
						alt='temp thumbnail'
						className={classes.thumbnail}
					/>
					<TextField margin='dense' name='title' label='Title' fullWidth />
					<TextField margin='dense' name='artist' label='Artist' fullWidth />
					<TextField
						margin='dense'
						name='thumbnail'
						label='Thumbnail'
						fullWidth
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
					>
						Add Song
					</Button>
				</DialogActions>
			</Dialog>
			<TextField
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
			>
				Add
			</Button>
		</div>
	);
};

export default AddSong;
