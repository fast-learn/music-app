import { useEffect, useState } from 'react';
import Taro from '@tarojs/taro';

const ERROR = {
  '10001': '系统错误',
  '10002': '网络错误',
  '10003': '文件错误',
  '10004': '格式错误',
  '-1': '未知错误',
};
// 音乐播放实例
const innerAudioContext = Taro.createInnerAudioContext();
export default function usePlay() {
  // 歌曲列表
  // eslint-disable-next-line no-unused-vars
  const [songList, setSongList] = useState([
    {
      // url: 'http://192.168.31.148:8081/music/1903299149.mp3',
      url: 'http://192.168.31.244:8089/music/1903299149.mp3',
      // url: 'http://localhost:8089/music/1903299149.mp3',
    },
    {
      url: 'http://192.168.31.244:8089/music/1897658456.mp3',
      // url: 'http://localhost:8089/music/1897658456.mp3',
    },
  ]);
  // 正在播放歌曲的序号
  const [current, setCurrent] = useState(0);
  // 正在播放的歌曲信息
  const [playingSong, setPlayingSong] = useState(null);
  // 正在播放歌曲总时长
  const [duration, setDuration] = useState(null);
  // 正在播放歌曲当前时间
  const [currentTime, setCurrentTime] = useState(null);
  // 播放错误信息
  const [error, setError] = useState(null);
  // 播放状态
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    console.log('current updated!', current);
    if (playingSong) {
      replay();
    }
  }, [current]);

  // 播放歌曲
  function play() {
    // 如果正在播放则直接跳过
    if (isPlaying) {
      return;
    }
    // 如果没有播放，但已经有播放歌曲，则继续播放
    if (playingSong) {
      doPlay();
    } else {
      // 首次播放，设置播放歌曲
      const song = songList[current].url;
      innerAudioContext.autoplay = true;
      innerAudioContext.src = song;
      // 卸载监听事件
      innerAudioContext.offPlay();
      innerAudioContext.offError();
      innerAudioContext.offTimeUpdate();
      innerAudioContext.offCanplay();
      // 重新监听事件
      innerAudioContext.onCanplay(onCanPlay);
      innerAudioContext.onPlay(onPlay);
      innerAudioContext.onError(onError);
      innerAudioContext.onTimeUpdate(onTimeUpdate);
    }
  }

  // 重新播放
  async function replay() {
    console.log('replay...', innerAudioContext);
    try {
      if (!innerAudioContext) {
        return;
      }
      // 暂停前一首播放
      if (!IS_RN) {
        await innerAudioContext.stop();
      }
      console.log('replay stop...');
      // 更换下一首链接
      const nextSong = songList[current].url;
      innerAudioContext.src = nextSong;
      console.log('replay', nextSong);
      // 播放下一首歌曲
      await doPlay();
    } catch (e) {
      console.log('replay', e);
    }
  }

  // 暂停播放
  async function pause() {
    if (isPlaying) {
      setIsPlaying(false);
      await innerAudioContext.pause();
      console.log('pause', innerAudioContext.paused);
    }
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
    setCurrent(nextIndex);
    console.log('下一首', nextIndex);
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
    setCurrent(previousIndex);
  }

  async function doPlay() {
    if (!innerAudioContext) {
      onError({ message: '播放器初始化失败' });
      return;
    }
    try {
      // h5播放器需要监听Promise异常
      await innerAudioContext.play();
      // 更新播放状态和歌曲时长
      setIsPlaying(true);
      setCurrentTime(innerAudioContext.currentTime);
      setDuration(innerAudioContext.duration);
      // 保存歌曲基本信息
      const song = songList[current].url;
      const currentSong = {
        src: song,
        currentTime: innerAudioContext.currentTime,
        duration: innerAudioContext.duration,
      };
      setPlayingSong(currentSong);
      console.log('doPlay', currentSong);
    } catch (e) {
      console.log('from playPromise.onError');
      onError(e);
    }
  }

  function onCanPlay() {
    console.log('onCanPlay');
    doPlay();
  }

  function onPlay(res) {
    console.log('onPlay', res);
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
    setPlayingSong(null);
    Taro.showToast({
      title: '播放失败，失败原因：' + errMsg,
      icon: 'none',
      duration: 1500,
      mask: true,
    });
  }

  function onTimeUpdate() {
    console.log('onTimeUpdate', innerAudioContext.currentTime);
    setTimeout(() => setCurrentTime(innerAudioContext.currentTime), 0);
    if (!duration) {
      setDuration(innerAudioContext.duration);
    }
  }

  function formatTime(time) {
    const minute = Math.floor(time / 60);
    const second = Math.floor(time % 60);
    return `${minute < 10 ? `0${minute}` : minute}:${second < 10 ? `0${second}` : second}`;
  }

  return {
    songList,
    current,
    duration,
    currentTime,
    isPlaying,
    error,
    playingSong,
    play,
    replay,
    pause,
    seek,
    next,
    previous,
    formatTime,
  };
}
