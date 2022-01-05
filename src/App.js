import React from 'react';
import AddSong from './components/AddSong';
import Header from './components/Header';
import SongList from './components/SongList';
import SongPlayer from './components/SongPlayer';
import { Grid, useMediaQuery, Hidden } from '@mui/material';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';
import { SongProvider } from './utils/context/SongState';
import { GET_QUEUED_SONGS } from './utils/queries';
import { typeDefs } from './utils/typeDefs';

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
	typeDefs: typeDefs,
	resolvers: {
		Mutation: {
			addOrRemoveFromQueue: (_, { input }, { cache }) => {
				const queryResult = cache.readQuery({
					query: GET_QUEUED_SONGS,
				});
				if (queryResult) {
					const { queue } = queryResult;
					const isInQueue = queue.some(song => song.id === input.id);
					const newQueue = isInQueue
						? queue.filter(song => song.id !== input.id)
						: [...queue, input];
					cache.writeQuery({
						query: GET_QUEUED_SONGS,
						data: { queue: newQueue },
					});
					return newQueue;
				}
				return [];
			},
		},
	},
});

const hasQueue = Boolean(localStorage.getItem('queue'));

const data = {
	queue: hasQueue ? JSON.parse(localStorage.getItem('queue')) : [],
};

client.writeQuery({
	query: GET_QUEUED_SONGS,
	data,
});

function App() {
	const greaterThanMd = useMediaQuery(theme => theme.breakpoints.up('md'));
	const greaterThanSm = useMediaQuery(theme => theme.breakpoints.up('sm'));

	return (
		<ApolloProvider client={client}>
			<div>
				<SongProvider>
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
				</SongProvider>
			</div>
		</ApolloProvider>
	);
}

export default App;
