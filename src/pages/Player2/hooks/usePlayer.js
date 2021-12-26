import { useState } from 'react';
import Taro from '@tarojs/taro';

const ERROR = {
  '10001': '系统错误',
  '10002': '网络错误',
  '10003': '文件错误',
  '10004': '格式错误',
  '-1': '未知错误',
};

// eslint-disable-next-line no-undef
const audioContext = IS_RN ? require('./AudioContext').createInnerAudioContext() : Taro.createInnerAudioContext();

export default function usePlay() {
  // 音乐播放器实例
  const [innerAudioContext] = useState(audioContext);
  // 歌曲列表
  // eslint-disable-next-line no-unused-vars
  const [songList, setSongList] = useState([
    {
      url: 'http://192.168.31.148:8089/music/1903299149.mp3',
      // url: 'http://localhost:8089/music/1903299149.mp3',
    },
    {
      url: 'http://192.168.31.148:8089/music/1897658456.mp3',
      // url: 'http://localhost:8089/music/1897658456.mp3',
    },
  ]);
  // 播放器加载状态
  const [isLoaded, setIsLoaded] = useState(false);
  // 正在播放歌曲的序号
  const [current, setCurrent] = useState(0);
  // 正在播放歌曲总时长
  const [duration, setDuration] = useState(null);
  // 正在播放歌曲当前时间
  const [currentTime, setCurrentTime] = useState(null);
  // 播放错误信息
  const [error, setError] = useState(null);
  // 播放状态
  const [isPlaying, setIsPlaying] = useState(false);

  function initInnerAudioContext(song) {
    innerAudioContext.autoplay = true;
    innerAudioContext.src = song;
    // 重新监听事件
    innerAudioContext.onCanplay(onCanPlay);
    innerAudioContext.onPlay(onPlay);
    innerAudioContext.onError(onError);
    innerAudioContext.onTimeUpdate(onTimeUpdate);
    innerAudioContext.onEnded(onEnd);
    // 更新状态
    setIsLoaded(true);
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
      doPlay();
    }
  }

  // 播放指定位置歌曲
  async function playIndex(index) {
    try {
      if (index >= 0) {
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
        setCurrent(index);
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
  function seek() {
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
    playIndex(nextIndex);
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
    playIndex(previousIndex);
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

  function onCanPlay() {
    console.log('onCanPlay');
    // eslint-disable-next-line no-undef
    if (!IS_RN) {
      doPlay();
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

  function onTimeUpdate() {
    console.log('onTimeUpdate', innerAudioContext.currentTime, innerAudioContext.duration);
    setTimeout(() => {
      innerAudioContext.currentTime >= 0 && setCurrentTime(innerAudioContext.currentTime);
      innerAudioContext.duration > 0 && setDuration(innerAudioContext.duration);
    }, 0);
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
    innerAudioContext,
    songList,
    current,
    duration,
    currentTime,
    isPlaying,
    error,
    play,
    pause,
    seek,
    next,
    previous,
    formatTime,
  };
}
