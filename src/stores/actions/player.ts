import { SONG_INDEX, SONG_LIST, SONG_LYRIC } from '../constants';

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

export const setSongLyric = (payload) => {
  return {
    type: SONG_LYRIC,
    payload
  };
}
