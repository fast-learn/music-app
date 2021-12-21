import { SONG_LIST_INDEX } from '../constants';
import { SONG_LIST } from '../constants/index';

const INITIAL_STATE = {
  songListIndex: 0,
  songList: []
};

export default function palyer(state = INITIAL_STATE, action) {

  switch (action.type) {
    case SONG_LIST_INDEX:
      return {
        songListIndex: action.payload
      };
    case SONG_LIST:
    return{
      songList:action.payload
    }

    default:
      return state;
  }
}