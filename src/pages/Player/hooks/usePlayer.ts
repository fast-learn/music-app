import { useEffect, useState, useRef } from 'react';
import Taro from '@tarojs/taro';
import clonedeep from 'lodash.clonedeep';
import { getLyric, getSongDetail } from '@/services/api';
import { PLAYER_MODE, lyricParser } from '@/utils';


const ERROR = {
  '10001': '系统错误',
  '10002': '网络错误',
  '10003': '文件错误',
  '10004': '格式错误',
  '-1': '未知错误',
};

// eslint-disable-next-line no-undef
const audioContext = IS_RN ? require('./AudioContext').createInnerAudioContext() : Taro.createInnerAudioContext();

// @ts-ignore
const events = new Taro.Events();
export default function usePlay() {
  // 音乐播放器实例
  const [innerAudioContext] = useState(audioContext);
  // 歌曲列表
  // @ts-ignore
  const [songList, setSongList] = useState([
    {
      url: 'http://192.168.31.148:8089/music/1897658456.mp3',
      // url: 'http://localhost:8089/music/1897658456.mp3',
      // url: 'http://172.20.10.3:8089/music/1897658456.mp3',
      id: 1897658456,
    },
    {
      url: 'http://192.168.31.148:8089/music/1903299149.mp3',
      // url: 'http://localhost:8089/music/1903299149.mp3',
      // url: 'http://172.20.10.3:8089/music/1903299149.mp3',
      id: 1903299149,
    },
  ]);
  // 播放器加载状态
  const [isLoaded, setIsLoaded] = useState(false);
  // 正在播放歌曲的序号
  const [current, setCurrent] = useState(0);
  // 正在播放歌曲总时长
  const [duration, setDuration] = useState(null);
  // 正在播放歌曲当前时间
  const [currentTime, setCurrentTime]: any = useState(null);
  // 播放错误信息
  const [error, setError]: any = useState(null);
  // 播放状态
  const [isPlaying, setIsPlaying] = useState(false);
  // seeking状态
  const isSeeking = useRef(false);
  // 播放音量
  const [volume, setVolume] = useState(0.6);
  // 歌词
  const [lyric, setLyric]: any = useState(null);
  // 歌曲信息
  const [songDetail, setSongDetail] = useState(null);
  // 播放模式：1-循环，2-单曲循环，3-随机
  const [mode, setMode] = useState(PLAYER_MODE.LOOP);

  // 注册事件
  useEffect(() => {
    events.on('updateTime', updateTime);
  }, []);

  // 更新歌词方法
  useEffect(() => {
    if (lyric && !!duration) {
      const lastLyric: any = lyric[lyric.length - 1];
      // duration更新后，更新一次歌词最后一位的时间
      if (!lastLyric.endTime) {
        const _lyric = clonedeep(lyric);
        const _lastLyric = _lyric[_lyric.length - 1];
        _lastLyric.endTime = duration;
        _lastLyric.duration = Number((_lastLyric.endTime - _lastLyric.startTime).toFixed(2));
        setLyric(_lyric);
      }
    }
  }, [duration]);

  // 更新歌曲编号后，重新加载歌词和歌曲信息
  useEffect(() => {
    init();
  }, [current]);

  async function init() {
    const id = songList[current ? current : 0].id;
    // 处理歌词信息
    let lyricData = await getLyric(id);
    lyricData = lyricParser(lyricData);
    // 获取歌曲详情
    const songDetailData = await getSongDetail(id);
    setLyric(lyricData);
    setSongDetail(songDetailData);
    console.log(songDetailData, lyricData);
  }

  function initInnerAudioContext(song) {
    innerAudioContext.autoplay = true;
    innerAudioContext.src = song;
    innerAudioContext.volume = volume;
    // 重新监听事件
    innerAudioContext.onCanplay(onCanPlay);
    innerAudioContext.onPlay(onPlay);
    innerAudioContext.onError(onError);
    innerAudioContext.onTimeUpdate(onTimeUpdate);
    innerAudioContext.onEnded(onEnd);
    // 更新状态
    setIsLoaded(true);
  }

  // 更换播放模式
  function nextPlayerMode() {
    switch (mode) {
      case PLAYER_MODE.LOOP:
        setMode(PLAYER_MODE.LOOP_ONE);
        break;
      case PLAYER_MODE.LOOP_ONE:
        setMode(PLAYER_MODE.RANDOM);
        break;
      case PLAYER_MODE.RANDOM:
        setMode(PLAYER_MODE.LOOP);
        break;
      default:
        setMode(PLAYER_MODE.LOOP);
        break;
    }
  }

  // 首次播放
  function firstPlay() {
    // 首次播放，设置播放歌曲
    initInnerAudioContext(songList[0].url);
  }

  // 播放歌曲
  function play() {
    // 如果current为-1，则视为首次播放
    if (!isLoaded && !isPlaying) {
      firstPlay();
    } else {
      // 如果不是首次播放，说明是暂停后播放，则直接播放
      return doPlay();
    }
  }

  async function reset() {
    await pause();
    events.trigger('stopPlay');
    setCurrentTime(null);
    setDuration(null);
  }

  // 播放指定位置歌曲
  async function playIndex(index) {
    try {
      if (index >= 0) {
        await reset();
        const song = songList[index].url;
        console.log('playIndex', index, song);
        // eslint-disable-next-line no-undef
        if (IS_RN) {
          await innerAudioContext.unload();
          await innerAudioContext.init();
          initInnerAudioContext(song);
        } else {
          // 更新src属性，注意在RN环境下不会自动执行（@taro/taro-rn库暂不支持）
          innerAudioContext.src = song;
        }
      }
    } catch (e) {
      console.log('playIndex', e);
    }
  }

  // 暂停播放
  async function pause() {
    await innerAudioContext.pause();
    setIsPlaying(false);
    console.log('pause', innerAudioContext.paused);
  }

  // 跳转到指定位置播放
  async function seek(seekValue) {
    if (!currentTime) return;
    let value;
    // eslint-disable-next-line no-undef
    if (IS_RN) {
      value = seekValue;
    } else {
      value = seekValue.detail.value;
    }
    await innerAudioContext.seek(value);
    // eslint-disable-next-line no-undef
    if (IS_WEAPP) {
      await pause();
    }
    // console.log('seek', value, currentTime);
    setCurrentTime(value);
    isSeeking.current = false;
  }

  // 处理拖动过程事件
  function seeking(seekValue) {
    if (!currentTime) return;
    let value;
    // eslint-disable-next-line no-undef
    if (IS_RN) {
      value = seekValue;
    } else {
      value = seekValue.detail.value;
    }
    // console.log('seeking', value, isSeeking.current);
    setCurrentTime(value);
    isSeeking.current = true;
  }

  function volumeChange(volumeValue) {
    isSeeking.current = false;
    return setVolumeValue(volumeValue);
  }

  function volumeChanging(volumeValue) {
    isSeeking.current = true;
    return setVolumeValue(volumeValue);
  }

  function setVolumeValue(volumeValue) {
    let value;
    // eslint-disable-next-line no-undef
    if (IS_RN) {
      try {
        value = volumeValue;
      } catch (e) {
        console.log(e);
      }
    } else {
      value = volumeValue.detail.value;
    }
    setVolume(value);
    // eslint-disable-next-line no-undef
    if (IS_RN) {
      return innerAudioContext.setVolume(value[0]);
    } else {
      innerAudioContext.volume = value;
    }
    // console.log('volumeChange', value);
  }

  // 下一首
  function next() {
    if (songList.length === 0) {
      return;
    }
    let nextIndex = current;
    if (nextIndex === songList.length - 1) {
      nextIndex = 0;
    } else {
      nextIndex++;
    }
    console.log('下一首', nextIndex);
    setCurrent(nextIndex);
    setTimeout(() => playIndex(nextIndex), 1000);
  }

  // 上一首
  function previous() {
    if (songList.length === 0) {
      return;
    }
    let previousIndex = current;
    if (previousIndex === 0) {
      previousIndex = songList.length - 1;
    } else {
      previousIndex--;
    }
    console.log('上一首', previousIndex);
    setCurrent(previousIndex);
    setTimeout(() => playIndex(previousIndex), 1000);
  }

  async function doPlay() {
    try {
      // h5播放器需要监听Promise异常
      await innerAudioContext.play();
      console.log('doPlay', innerAudioContext);
    } catch (e) {
      console.log('doPlay', e);
      onError(e);
    }
  }

  async function doSeek(value) {
    await innerAudioContext.seek(value);
    // eslint-disable-next-line no-undef
    if (IS_WEAPP) {
      await pause();
    }
    if (!isPlaying) {
      await play();
    }
  }

  function onCanPlay() {
    console.log('onCanPlay');
    // eslint-disable-next-line no-undef
    if (!IS_RN) {
      doPlay();
    } else {
      innerAudioContext.setVolume(volume);
    }
  }

  function onPlay(res) {
    console.log('onPlay', res);
    setIsPlaying(true);
  }

  function onError(e) {
    console.log('onError', e);
    let errMsg;
    if (e.errCode) {
      errMsg = ERROR[e.errCode] || '未知错误';
    } else {
      errMsg = e.message || '未知错误';
    }
    setError({ message: errMsg });
    setIsPlaying(false);
    Taro.showToast({
      title: '播放失败，失败原因：' + errMsg,
      icon: 'none',
      duration: 1500,
      mask: true,
    });
  }

  function updateTime(_currentTime, _duration) {
    // console.log('onTimeUpdateTask', _currentTime, _duration);
    _currentTime >= 0 && setCurrentTime(_currentTime);
    if (!duration && _duration > 0) {
      setDuration(_duration);
    }
  }

  function onTimeUpdate() {
    // console.log('onTimeUpdate', innerAudioContext.currentTime, innerAudioContext.duration, isSeeking.current);
    if (isSeeking.current) {
      return;
    }
    events.trigger('updateTime', innerAudioContext.currentTime, innerAudioContext.duration);
  }

  function onEnd() {
    console.log('onEnd');
    innerAudioContext.offCanplay();
    innerAudioContext.offPlay();
    innerAudioContext.offTimeUpdate();
    innerAudioContext.offError();
    innerAudioContext.offEnded();
    setDuration(null);
    setCurrentTime(null);
    setError(null);
    setIsPlaying(false);
    setIsLoaded(false);
  }

  function formatTime(time) {
    const minute = Math.floor(time / 60);
    const second = Math.floor(time % 60);
    return `${minute < 10 ? `0${minute}` : minute}:${second < 10 ? `0${second}` : second}`;
  }

  return {
    innerAudioContext, // 播放器实例
    isLoaded, // 是否已经加载
    songList, // 播放列表歌曲
    current, // 当前歌曲在播放列表中的位置
    duration, // 当前歌曲时长
    currentTime, // 当前播放位置
    isPlaying, // 是否在播放
    isSeeking: isSeeking.current, // 是否在拖动播放位置
    volume, // 音量
    lyric, // 歌词信息
    songDetail, // 播放歌曲信息
    error, // 异常
    play, // 播放
    pause, // 暂停
    seek, // 改变播放位置事件
    seeking, // 拖动播放位置事件
    doSeek, // 播放指定位置
    volumeChange, // 改变音量事件
    volumeChanging, // 拖动音量事件
    next, // 播放下一首
    previous, // 播放上一首
    formatTime, // 格式化事件
    mode, // 播放模式
    nextPlayerMode, // 设置播放模式
  };
}
