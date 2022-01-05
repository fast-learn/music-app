import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import clonedeep from 'lodash.clonedeep';
import { SONG_LIST, SONG_INDEX, SONG_LYRIC } from '@/stores/constants';
import { getLyric, readSongRealUrl } from '@/services/api';
import { isNumber, lyricParser } from '@/utils';

/**
 * hooks：管理播放列表
 *
 * 属性：
 * ✔ list：播放列表
 * ✔ index：正在播放歌曲的序号
 * ✔ lyric：与播放列表对应的歌词列表
 *
 * API：
 * ✔ setSongList：更新播放列表
 * ✔ setPlayIndex：更新播放序号
 * ✔ setSongLyric：更新歌词信息
 * ✔ setPlayingLyric：更新正在播放的歌词信息
 * ✔ setNextIndex：更新下一首歌曲的index
 * ✔ setPreviousIndex：更新上一首歌曲的index
 * ✔ getPlayingSong：获取正在播放的歌曲
 * ✔ getPlayingId：获取正在播放歌曲的ID
 * ✔ getPlayingUrl：获取正在播放歌曲的链接
 * ✔ getPlayingRealUrl：获取正在播放歌曲的真实链接（针对RN不能播放302歌曲的问题）
 * ✔ getPlayingLyric：获取正在播放歌曲的歌词
 */
export function useSong() {
  const dispatch = useDispatch();

  const list = useSelector((state: any) => state.player.songList);
  const index = useSelector((state: any) => state.player.songIndex);
  const lyric = useSelector((state: any) => state.player.songLyric);

  // 播放列表更新后，创建歌词列表
  // 播放序号更新后，更新歌词信息
  useEffect(() => {
    console.log('useSong list', list);
    if (list && list.length > 0 && list.length !== lyric.length) {
      const songLyric = new Array(list.length);
      dispatch({ type: SONG_LYRIC, payload: songLyric });
    }
    const playingSong = getPlayingSong(); // index更新后更新歌词信息
    if (!playingSong) {
      return;
    }
    if (!lyric[index]) {
      const songDuration = playingSong.song.duration; // 获取歌曲长度
      const duration = +songDuration / 1000;
      if (playingSong) {
        const { id } = playingSong; // 获取歌曲id
        getLyric(id).then(lyricData => {
          lyricData = lyricParser(lyricData, duration); // 处理歌词信息
          const songLyric = clonedeep(lyric); // 深拷贝歌词
          songLyric[index] = lyricData; // 更新歌词信息
          setSongLyric(songLyric); // 存入redux
        });
      }
    }
  }, [list, index]);

  function getPlayingSong() {
    return list && isNumber(index) && index >= 0 && list[index];
  }

  function setSongList(songList) {
    dispatch({ type: SONG_LIST, payload: songList });
  }

  function setPlayIndex(playIndex = 0) {
    dispatch({ type: SONG_INDEX, payload: playIndex });
  }

  function setSongLyric(songLyric) {
    dispatch({ type: SONG_LYRIC, payload: songLyric });
  }

  function setPlayingLyric(playingLyric) {
    const songLyric = clonedeep(lyric);
    songLyric[index] = playingLyric;
    dispatch({ type: SONG_LYRIC, payload: songLyric });
  }

  function setNextIndex() {
    if (list.length === 0) {
      return;
    }
    let nextIndex: any = index;
    if (nextIndex === list.length - 1) {
      nextIndex = 0;
    } else {
      nextIndex++;
    }
    console.log('下一首', nextIndex);
    setPlayIndex(nextIndex);
  }

  function setPreviousIndex() {
    if (list.length === 0) {
      return;
    }
    let previousIndex: any = index;
    if (previousIndex === 0) {
      previousIndex = list.length - 1;
    } else {
      previousIndex--;
    }
    console.log('上一首', previousIndex);
    setPlayIndex(previousIndex);
  }

  function getPlayingUrl() {
    return getPlayingSong() && getPlayingSong().playUrl;
  }

  function getPlayingSongId() {
    return getPlayingSong().id;
  }

  function getPlayingRealUrl() {
    return readSongRealUrl(getPlayingSongId())
      .then(realPlayUrl => {
        return realPlayUrl.replace('http://', 'https://');
      });
  }

  function getPlayingLyric() {
    return lyric && lyric[index];
  }

  return {
    list,
    index,
    lyric,
    setSongList,
    setPlayIndex,
    setPlayingLyric,
    setNextIndex,
    setPreviousIndex,
    getPlayingSong,
    getPlayingUrl,
    getPlayingRealUrl,
    getPlayingLyric,
  };
}
