import { useEffect, useState, useRef } from 'react';
import Taro from '@tarojs/taro';
import { PLAYER_MODE, formatTime } from '@/utils';

const ERROR = {
  '10001': '系统错误',
  '10002': '网络错误',
  '10003': '文件错误',
  '10004': '格式错误',
  '-1': '未知错误',
};
const audioContext = IS_RN ? require('./AudioContext').createInnerAudioContext() : Taro.createInnerAudioContext();
// @ts-ignore
const events = new Taro.Events();

/**
 * hooks：管理播放器
 *
 * 属性：
 * ✔ audio：播放器实例
 * ✔ currentTime：当前播放进度
 * ✔ duration：歌曲时长
 * ✔ volume：播放音量
 * ✔ mode：播放模式，1-循环，2-单曲循环，3-随机
 * ✔ isLoaded：播放器是否完成初始化
 * ✔ isPlaying：是否正在播放
 * ✔ isSeeking：是否正在拖动
 * ✔ error：处理播放异常
 *
 * API：
 * ✔ init：播放器初始化
 * ✔ play：播放歌曲
 * ✔ replay：重新加载资源播放
 * ✔ pause：暂停播放
 * ✔ seek：播放指定位置
 * ✔ next：播放下一首
 * ✔ previous：播放上一首
 * ✔ setVolumeValue：更改音量
 * ✔ nextPlayMode：更换下一个播放模式
 * ✔ onSeek：处理播放进度拖动事件
 * ✔ onSeeking：处理播放进度拖动中事件
 * ✔ onVolume：处理音量拖动事件
 * ✔ onVoluming：处理音量拖动中事件
 * ✔ onCanPlay：处理onCanPlay事件
 * ✔ onPlay：处理onPlay事件
 * ✔ onTimeUpdate：处理onTimeUpdate事件
 * ✔ onEnd：处理onEnd事件
 * ✔ formatTime：播放时间格式化
 */
export function usePlayer(props) {
  const {
    list: songList,
    index: playIndex,
    getPlayingUrl,
    getPlayingRealUrl,
    setNextIndex,
    setPreviousIndex,
  } = props;

  const [audio] = useState(audioContext);
  const [currentTime, setCurrentTime]: any = useState(null);
  const [duration, setDuration] = useState(null);
  const [volume, setVolume] = useState(0.6);
  const [mode, setMode] = useState(PLAYER_MODE.LOOP);
  const [isPlaying, setIsPlaying] = useState(false);
  const isLoaded = useRef(false);
  const isSeeking = useRef(false);
  const [error, setError]: any = useState(null);

  // 如果播放列表为空，直接跳转回首页
  if (!songList || songList.length === 0) {
    Taro.navigateTo({ url: '/pages/Home/index' });
  }

  useEffect(() => {
    if (!isLoaded.current) {
      init();
    } else {
      replay();
    }
  }, [playIndex]);

  async function init() {
    // RN环境下需要获取歌曲真实播放链接
    // 因为RN无法播放需要302重定向的资源，微信和H5可以支持
    let playUrl = IS_RN ? await getPlayingRealUrl() : getPlayingUrl();
    // 设置播放器基础属性
    audio.autoplay = true;
    audio.src = playUrl;
    audio.volume = volume;
    // 播放器监听事件
    audio.onCanplay(onCanPlay);
    audio.onPlay(onPlay);
    audio.onError(onError);
    audio.onTimeUpdate(onTimeUpdate);
    audio.onEnded(onEnd);
    // 更新播放器状态
    isLoaded.current = true;
  }

  async function play() {
    try {
      await audio.play();
    } catch (e) {
      onError(e);
    }
  }

  async function replay() {
    try {
      await pause();
      events.trigger('stopPlay');
      setCurrentTime(null);
      setDuration(null);
      if (IS_RN) {
        await audio.unload();
        await audio.init();
        await init();
      } else {
        // 更新src属性，注意在RN环境下不会自动执行（@taro/taro-rn库暂不支持）
        audio.src = getPlayingUrl();
      }
    } catch (e) {
      onError(e);
    }
  }

  async function pause() {
    try {
      await audio.pause();
      setIsPlaying(false);
    } catch (e) {
      onError(e);
    }
  }

  async function seek(value) {
    try {
      isSeeking.current = false;
      setCurrentTime(value);
      await audio.seek(value);
    } catch (e) {
      onError(e);
    }
  }

  function next() {
    setNextIndex();
  }

  function previous() {
    setPreviousIndex();
  }

  async function setVolumeValue(volumeValue) {
    try {
      let value;
      if (IS_RN) {
        try {
          value = volumeValue;
        } catch (e) {
          console.log(e);
        }
      } else {
        value = volumeValue.detail.value;
      }
      if (IS_RN) {
        await audio.setVolume(value);
      } else {
        audio.volume = value;
      }
      isSeeking.current = false;
      setVolume(value);
    } catch (e) {
      onError(e);
    }
  }

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

  async function onSeek(seekValue) {
    if (!currentTime) return;
    let value = IS_RN ? seekValue[0] : seekValue.detail.value;
    await seek(value);
    if (IS_WEAPP) {
      await pause();
    }
  }

  function onSeeking(seekValue) {
    if (!currentTime) return;
    let value = IS_RN ? seekValue[0] : seekValue.detail.value;
    setCurrentTime(value);
    isSeeking.current = true;
  }

  function onVolumeChange(volumeValue) {
    isSeeking.current = false;
    return setVolumeValue(volumeValue);
  }

  function onVolumeChanging(volumeValue) {
    isSeeking.current = true;
    return setVolumeValue(volumeValue);
  }

  function onCanPlay() {
    if (!IS_RN) {
      play();
    } else {
      audio.setVolume(volume);
    }
  }

  function onPlay() {
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
    // setIsPlaying(false);
    Taro.showToast({
      title: '播放失败，失败原因：' + errMsg,
      icon: 'none',
      duration: 1500,
      mask: true,
    });
  }

  function onTimeUpdate() {
    // console.log('onTimeUpdate', audio.currentTime, audio.duration, isSeeking.current);
    if (isSeeking.current) {
      return;
    }
    if (audio.currentTime >= 0) {
      setCurrentTime(audio.currentTime);
    }
    if (audio.duration >= 0) {
      setDuration(audio.duration);
    }
  }

  async function onEnd() {
    await pause();
    audio.offCanplay();
    audio.offPlay();
    audio.offTimeUpdate();
    audio.offError();
    audio.offEnded();
    setDuration(null);
    setCurrentTime(null);
    setError(null);
    setIsPlaying(false);
    isLoaded.current = false;
  }

  return {
    audio,
    currentTime,
    duration,
    volume,
    mode,
    isLoaded: isLoaded.current,
    isPlaying,
    isSeeking: isSeeking.current,
    error,
    play,
    pause,
    seek,
    next,
    previous,
    setVolumeValue,
    nextPlayerMode,
    onSeek,
    onSeeking,
    onVolumeChange,
    onVolumeChanging,
    formatTime,
  };
}
