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

export { GET_SONGS };
