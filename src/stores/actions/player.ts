import { SONG_LIST_INDEX, SONG_LIST } from '../constants/bottomBar';

export const setSongListIndex = (payload) => {
  return {
    type: SONG_LIST_INDEX,
    payload
  };
};
export const setSongList = (payload) => {
  return {
    type: SONG_LIST,
    payload
  };
};
