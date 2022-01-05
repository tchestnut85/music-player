import { createContext, useContext, useReducer } from 'react';
import songReducer from './songReducer';

const SongContext = createContext();
const { Provider } = SongContext;

const initialState = {
	song: {
		id: '',
		title: '',
		artist: '',
		thumbnail: '',
		url: '',
		duration: 0,
	},
	isPlaying: false,
};

const SongProvider = ({ value = [], ...props }) => {
	const [state, dispatch] = useReducer(songReducer, initialState);
	return <Provider value={[state, dispatch]} {...props} />;
};

const useSongContext = () => useContext(SongContext);

export { SongProvider, useSongContext };
