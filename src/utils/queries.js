import { gql } from '@apollo/client';

const GET_SONGS = gql`
	query getSongs {
		songs(order_by: { created_at: desc }) {
			url
			thumbnail
			title
			id
			duration
			artist
		}
	}
`;

const GET_QUEUED_SONGS = gql`
	query getQueuedSongs {
		queue @client {
			id
			duration
			title
			artist
			thumbnail
			url
		}
	}
`;

export { GET_SONGS, GET_QUEUED_SONGS };
