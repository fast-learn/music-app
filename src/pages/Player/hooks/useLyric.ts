import { useCallback, useEffect, useRef, useState } from 'react';
import Taro from '@tarojs/taro';
import animateScrollTo from 'animated-scroll-to';
import { lte, lt, formatNumber } from '@/utils';

let dragEndTask;
let updateTask;
// @ts-ignore
const events = new Taro.Events();
export default function useLyric(props) {
  const { lyric, currentTime, doSeek } = props;
  // 歌词项的高度
  const [lyricItemHeight, setLyricItemHeight] = useState(0);
  // 歌词当前位置
  const [lyricIndex, setLyricIndex] = useState(0);
  // 是否为手动滚动
  // @ts-ignore
  const isManualScroll = useRef(false);
  const [scrollTop, setScrollTop] = useState(0);
  const [refresh, setRefresh] = useState(false);

  const scrollRef = useRef(null);
  const listRef = useCallback(node => {
    if (!lyric) {
      return;
    }
    if (IS_RN) {
      const { UIManager, findNodeHandle } = require('react-native');
      const handle = findNodeHandle(node);
      // 只有歌曲时长初始化成功后，再进行DOM渲染和计算
      if (handle) {
        // @ts-ignore
        UIManager.measure(handle, (x, y, width, height, pageX, pageY) => {
          // console.log('UIManager', x, y, width, height, pageX, pageY);
          // 歌词长度
          const size = lyric.length;
          // 歌词DOM距离上方和下方的距离
          const marginBottom = +Taro.pxTransform(40);
          const padding = +Taro.pxTransform(800);
          // @ts-ignore
          const scrollHeight = scrollRef?.current?._scrollMetrics?.contentLength || 0;
          // 计算歌词DOM的真实高度
          const realLyricListHeight = scrollHeight - marginBottom - padding; //
          // 计算每一段歌词的真实高度
          const itemHeight = +(realLyricListHeight / size).toFixed(2);
          setLyricItemHeight(itemHeight);
          // console.log('lyric', 'height=' + realLyricListHeight, 'size=' + size, 'itemHeight=' + itemHeight);
        });
      }
    }
  }, [lyric]);
  useEffect(() => {
    events.on('stopPlay', () => {
      onScrollEnd();
      setScrollTop(0);
    });
  }, []);
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
    updateScrollTop();
  }, [currentTime]);

  function updateScrollTop() {
    if (lyric && !isManualScroll.current && currentTime >= 0) {
      clearTimeout(updateTask); // 事件节流
      updateTask = setTimeout(() => {
        // 计算当前时间对应的歌词位置
        const _currentTime = formatNumber(currentTime);
        let _lyricIndex = lyric.findIndex(lyricItem => {
          return lte(lyricItem.startTime, _currentTime) && lt(_currentTime, lyricItem.endTime);
        });
        // 处理边界问题
        if (!_lyricIndex) {
          if (currentTime >= lyric[lyric.length - 1].endTime) {
            _lyricIndex = lyric.length - 1;
          }
        }
        // console.log('updateTask', currentTime, _lyricIndex);
        setLyricIndex(_lyricIndex);
        // 滚动到歌词位置
        scrollToIndex(_lyricIndex);
      }, 50);
    }
  }

  function scrollToIndex(index) {
    // 计算scroll距离
    const scrollDistance = +(index * lyricItemHeight).toFixed(2);
    // console.log('scrollToIndex', currentTime, index);
    setScrollTop(scrollDistance);
    scrollTo(scrollDistance);
  }

  function scrollTo(scrollDistance) {
    if (IS_RN) {
      // RN下使用scrollToOffset进行歌词滚动
      // @ts-ignore
      scrollRef?.current?.scrollToOffset(0, scrollDistance);
    } else if (IS_H5) {
      // @ts-ignore
      animateScrollTo(scrollDistance, { elementToScroll: scrollRef.current });
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
  }

  function onScroll(e) {
    // console.log('onScroll', isManualScroll.current);
    if (lyricItemHeight > 0 && isManualScroll.current) {
      clearTimeout(updateTask);
      // 获取当前滚动位置距顶部距离
      const currentScrollTop = e.detail.scrollTop;
      // 动态计算出当前滚动位置应该高亮的歌词位置
      let index = Math.ceil(currentScrollTop / lyricItemHeight);
      // 处理边界问题
      if (index < 0) {
        index = 0;
      } else if (index > lyric.length - 1) {
        index = lyric.length - 1;
      }
      // 更新高亮歌词
      setLyricIndex(index);
      !IS_WEAPP && setScrollTop(currentScrollTop);
      // console.log('onScroll', currentTime, index, currentScrollTop);
    }
  }

  function onScrollEnd() {
    clearTimeout(updateTask);
    clearTimeout(dragEndTask);
    isManualScroll.current = false;
    setRefresh(!refresh);
  }

  function onTouchStart() {
    // console.log('onTouchStart');
    clearTimeout(updateTask);
    isManualScroll.current = true;
  }

  function onTouchEnd() {
    // console.log('onTouchEnd');
    clearTimeout(dragEndTask);
    clearTimeout(updateTask);
    dragEndTask = setTimeout(() => {
      onScrollEnd();
    }, 3000);
  }

  function seekTo() {
    onScrollEnd();
    // console.log('seekTo', Math.ceil(lyric[lyricIndex].startTime));
    doSeek(Math.ceil(lyric[lyricIndex].startTime));
  }

  return {
    lyricItemHeight, // 每个歌词项高度
    lyricIndex, // 当前歌词位置
    scrollRef, // 滚动DOM
    listRef, // 歌词列表DOM
    scrollTop, // 歌词距顶部距离
    onScroll, // 监听歌词滚动事件
    onTouchStart, // 处理屏幕开始触摸事件
    onTouchEnd, // 处理屏幕停止触摸事件
    isManualScroll: isManualScroll.current, // 是否为手动触发滚动
    seekTo, // 跳转到指定位置
  };
}
