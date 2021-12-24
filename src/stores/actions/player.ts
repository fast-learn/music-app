import { SONG_LIST_INDEX, SONG_LIST } from '../constants';

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
