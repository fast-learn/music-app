import { SONG_INDEX, SONG_LIST } from '../constants';

const INITIAL_STATE = {
  songIndex: -1,
  songList: [],
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

    default:
      return state;
  }
}
