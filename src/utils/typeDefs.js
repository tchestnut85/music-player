import { gql } from '@apollo/client';

export const typeDefs = gql`
	type Song {
		id: uuid!
		title: String!
		artist: String!
		thumbnail: String!
		duration: Float!
		url: String!
	}

	input SongInput {
		id: uuid!
		title: String!
		artist: String!
		thumbnail: String!
		duration: Float!
		url: String!
	}

	type Query {
		queue: [Song]!
	}

	type Mutation {
		addOrRemoveFromQueue(input: SongInput!): [Song]!
	}
`;
