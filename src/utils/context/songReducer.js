// action types
export const PLAY_SONG = 'PLAY_SONG';
export const PAUSE_SONG = 'PAUSE_SONG';
export const SET_SONG = 'SET_SONG';

function songReducer(state, { type, payload }) {
	console.log('payload:', payload);
	switch (type) {
		case PLAY_SONG:
			return {
				...state,
				isPlaying: true,
			};
		case PAUSE_SONG:
			return {
				...state,
				isPlaying: false,
			};
		case SET_SONG:
			return {
				...state,
				song: payload.currentSong,
			};
		default:
			return state;
	}
}

export default songReducer;
