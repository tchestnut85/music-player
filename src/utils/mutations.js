import { gql } from '@apollo/client';

const ADD_SONG = gql`
	mutation addSong(
		$title: String!
		$artist: String!
		$thumbnail: String!
		$duration: Float!
		$url: String!
	) {
		insert_songs(
			objects: {
				thumbnail: $thumbnail
				artist: $artist
				duration: $duration
				title: $title
				url: $url
			}
		) {
			affected_rows
		}
	}
`;

const ADD_OR_REMOVE_FROM_QUEUE = gql`
	mutation addOrRemoveFromQueue($input: SongInput!) {
		addOrRemoveFromQueue(input: $input) @client
	}
`;

export { ADD_SONG, ADD_OR_REMOVE_FROM_QUEUE };
