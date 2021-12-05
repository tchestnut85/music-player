import { gql } from '@apollo/client';

const GET_SONGS = gql`
	subscription getSongs {
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

export { GET_SONGS };
