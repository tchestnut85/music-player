import React from 'react';
import AddSong from './components/AddSong';
import Header from './components/Header';
import SongList from './components/SongList';
import SongPlayer from './components/SongPlayer';
import { Grid, useMediaQuery, Hidden } from '@mui/material';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';

const GQL_URI = 'wss://music-player-tc.herokuapp.com/v1/graphql';
const client = new ApolloClient({
	link: new WebSocketLink({
		uri: GQL_URI,
		options: {
			reconnect: true,
		},
	}),
	connectToDevTools: true,
	cache: new InMemoryCache(),
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
