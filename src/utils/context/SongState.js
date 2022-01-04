import { createContext, useContext, useReducer } from 'react';
import songReducer from './songReducer';

const SongContext = createContext();
const { Provider } = SongContext;

const initialState = {
	song: {
		id: 'd44d6966-5825-4d89-9ebc-f3f7fb8de6ba',
		title: 'Deceiver of the Gods',
		artist: 'Amon Amarth',
		thumbnail: 'http://img.youtube.com/vi/5Z3spJ_z3Es/0.jpg',
		url: 'https://www.youtube.com/watch?v=5Z3spJ_z3Es',
		duration: 260,
	},
	isPlaying: false,
};

const SongProvider = ({ value = [], ...props }) => {
	const [state, dispatch] = useReducer(songReducer, initialState);
	return <Provider value={[state, dispatch]} {...props} />;
};

const useSongContext = () => useContext(SongContext);

export { SongProvider, useSongContext };
