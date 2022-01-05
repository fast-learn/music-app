import { SONG_INDEX, SONG_LIST, SONG_LYRIC } from '../constants';

const INITIAL_STATE = {
  songIndex: null,
  songList: [],
  songLyric: [],
};

export default function player(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SONG_INDEX:
      return {
        ...state,
        songIndex: action.payload,
      };
    case SONG_LIST:
      return {
        ...state,
        songList: action.payload,
      };
    case SONG_LYRIC:
      return {
        ...state,
        songLyric: action.payload,
      };
    default:
      return state;
  }
}
