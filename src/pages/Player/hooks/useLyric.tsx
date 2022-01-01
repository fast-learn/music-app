import { useCallback, useEffect, useRef, useState } from 'react';
import Taro from '@tarojs/taro';
import animateScrollTo from 'animated-scroll-to';

export default function useLyric(props) {
  const { lyric, isPlaying, duration, currentTime } = props;
  // 歌词项的高度
  const [lyricItemHeight, setLyricItemHeight] = useState(0);
  // 歌词当前位置
  const [lyricIndex, setLyricIndex] = useState(0);

  const scrollRef = useRef(null);
  const listRef = useCallback(node => {
    if (!lyric) {
      return;
    }
    if (IS_RN) {
      const { UIManager, findNodeHandle } = require('react-native');
      const handle = findNodeHandle(node);
      // 只有歌曲时长初始化成功后，再进行DOM渲染和计算
      if (handle && duration && duration > 0) {
        // @ts-ignore
        UIManager.measure(handle, (x, y, width, height, pageX, pageY) => {
          // console.log('UIManager', x, y, width, height, pageX, pageY);
          // 歌词长度
          const size = lyric.length;
          // 歌词DOM距离上方和下方的距离
          const marginBottom = +Taro.pxTransform(40);
          // 计算歌词DOM的真实高度
          const realLyricListHeight = Number((height - marginBottom - pageY).toFixed(2));
          // 计算每一段歌词的真实高度
          const itemHeight = Number((realLyricListHeight / size).toFixed(2));
          setLyricItemHeight(itemHeight);
          // console.log('lyric', 'height=' + realLyricListHeight, 'size=' + size, 'itemHeight=' + itemHeight, duration);
        });
      }
    }
  }, [lyric]);
  let task;
  useEffect(() => {
    if (lyric) {
      // H5和小程序在歌词更新后再计算DOM
      if (IS_H5) {
        const lyricItem = document.getElementsByClassName('player-lyric__list__item');
        if (lyricItem && lyricItem.length > 0) {
          const rect = lyricItem[0].getBoundingClientRect();
          // 计算每一段歌词的真实高度
          const itemHeight = Number(rect.height.toFixed(2));
          setLyricItemHeight(itemHeight);
          // console.log('lyric', 'itemHeight=' + itemHeight);
        }
      } else if (IS_WEAPP) {
        Taro.createSelectorQuery()
          .select('.player-lyric__list__item')
          .boundingClientRect(rect => {
            if (rect) {
              setLyricItemHeight(rect.height);
              // console.log('lyric', 'itemHeight=' + rect.height);
            }
          })
          .exec();
      }
    }
  }, [lyric]);
  useEffect(() => {
    clearTimeout(task);
    if (isPlaying) {
      // 1. 计算当前时间对应的歌词位置
      const _lyricIndex = lyric.findIndex(lyricItem => lyricItem.startTime <= currentTime && currentTime <= lyricItem.endTime);
      // 2. 计算scroll距离
      const scrollDistance = _lyricIndex * lyricItemHeight;
      setLyricIndex(_lyricIndex);
      // console.log(scrollDistance, _lyricIndex, lyricItemHeight);
      if (IS_RN) {
        // RN下使用scrollToOffset进行歌词滚动
        // @ts-ignore
        scrollRef?.current?.scrollToOffset(0, scrollDistance);
      } else if (IS_H5) {
        // @ts-ignore
        animateScrollTo(scrollDistance, {
          elementToScroll: scrollRef.current,
        });
      } else if (IS_WEAPP) {
        Taro.createSelectorQuery()
          .select('.player-lyric')
          .node()
          .exec(res => {
            const scrollView = res[0].node;
            scrollView.scrollTo({
              top: scrollDistance,
              animated: true,
            });
          });
      }
    } else {
      clearTimeout(task);
    }
  }, [currentTime]);

  return {
    lyricItemHeight, // 每个歌词项高度
    lyricIndex, // 当前歌词位置
    scrollRef, // 滚动DOM
    listRef, // 歌词列表DOM
  };
}
