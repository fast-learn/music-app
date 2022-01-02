import { SONG_INDEX, SONG_LIST } from '../constants';

export const setSongIndex = (payload) => {
  return {
    type: SONG_INDEX,
    payload
  };
};
export const setSongList = (payload) => {
  return {
    type: SONG_LIST,
    payload
  };
};
