import React from 'react';
import AddSong from './components/AddSong';
import Header from './components/Header';
import SongList from './components/SongList';
import SongPlayer from './components/SongPlayer';
import { Grid, useMediaQuery, Hidden } from '@mui/material';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

const GQL_URI = 'https://music-player-tc.herokuapp.com/v1/graphql';
const client = new ApolloClient({
	uri: GQL_URI,
	cache: new InMemoryCache(),
	connectToDevTools: true,
});

function App() {
	const greaterThanMd = useMediaQuery(theme => theme.breakpoints.up('md'));
	const greaterThanSm = useMediaQuery(theme => theme.breakpoints.up('sm'));

	return (
		<ApolloProvider client={client}>
			<div>
				<Hidden only='xs'>
					<Header />
				</Hidden>
				<Grid container spacing={3} style={{ paddingInline: 50 }}>
					<Grid
						style={{ paddingTop: greaterThanSm ? 100 : 10 }}
						item
						xs={12}
						md={7}
					>
						<AddSong />
						<SongList />
					</Grid>
					<Grid
						style={
							greaterThanMd
								? {
										position: 'fixed',
										width: '100%',
										right: '2%',
										top: 70,
								  }
								: {
										position: 'fixed',
										left: 0,
										bottom: 0,
										width: '100%',
								  }
						}
						item
						xs={12}
						md={5}
					>
						<SongPlayer />
					</Grid>
				</Grid>
			</div>
		</ApolloProvider>
	);
}

export default App;
