import React from 'react';
import AddSong from './components/AddSong';
import Header from './components/Header';
import SongList from './components/SongList';
import SongPlayer from './components/SongPlayer';
import { Grid } from '@mui/material';

function App() {
	return (
		<div>
			<Header />
			<Grid container spacing={3} style={{ paddingInline: 50 }}>
				<Grid style={{ paddingTop: 100 }} item xs={12} md={7}>
					<AddSong />
					<SongList />
				</Grid>
				<Grid
					style={{ position: 'fixed', width: '100%', right: '2%', top: 70 }}
					item
					xs={12}
					md={5}
				>
					<SongPlayer />
				</Grid>
			</Grid>
		</div>
	);
}

export default App;
