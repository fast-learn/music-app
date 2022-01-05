import { Dimensions } from 'react-native';
import { getBottomSpace, getStatusBarHeight } from 'react-native-iphone-x-helper';
import { View, Image, ScrollView } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { useLyric } from '@/hooks';
import classnames from 'classnames';

import './index.scss';

let lyricHeight: any = '100%';
// 计算歌词的高度，用于控制ScrollView的高度
const HEIGHT = Dimensions.get('window').height;
const BOTTOM_SPACE = getBottomSpace();
const STATUS_BAR = getStatusBarHeight();
const PLAYER_HEADER_HEIGHT = +Taro.pxTransform(199);
const PLAYER_BOTTOM_HEIGHT = +Taro.pxTransform(369);
lyricHeight = HEIGHT - BOTTOM_SPACE - STATUS_BAR - PLAYER_HEADER_HEIGHT - PLAYER_BOTTOM_HEIGHT;

export default function PlayerLyric(props) {
  const { error, getPlayingLyric, formatTime, isLoaded } = props;
  const {
    scrollRef,
    listRef,
    lyricIndex,
    onScroll,
    onTouchStart,
    onTouchEnd,
    isManualScroll,
    seekTo,
    scrollTop,
  } = useLyric(props);

  return (
    <ScrollView
      className="player-lyric"
      style={{ height: lyricHeight, flex: 1 }} // 手动计算滚动条高度
      ref={scrollRef} // 绑定ref
      scrollY // 开启y轴滚动
      // @ts-ignore
      showsVerticalScrollIndicator={false} // RN隐藏y轴滚动条
      scrollWithAnimation // RN显示滚动动画
      scrollTop={scrollTop}
      onScroll={onScroll}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      scrollEventThrottle={0} // onScroll事件节流
    >
      {getPlayingLyric() && getPlayingLyric().length > 0 ? (
        <View className="player-lyric__list" ref={listRef}>
          {getPlayingLyric().map((item: any, index) => (
            <View
              key={index}
              className={classnames([
                'player-lyric__list__item', {
                  'player-lyric__list__item--active': index === lyricIndex,
                }])}
            >
              <View
                className={classnames([
                  'player-lyric__list__item__text', {
                    'player-lyric__list__item__text--active': index === lyricIndex,
                  }])}
              >
                {item.content}
              </View>
              {
                // 显示辅助线的3个条件：
                // 1.index一直
                // 2.手动滚动
                // 3.歌曲已经加载
                index === lyricIndex && isManualScroll && isLoaded && (
                  <View
                    className="player-lyric__list__item__assistant"
                    onClick={seekTo}
                  >
                    <Image
                      src="https://fast-learn-oss.youbaobao.xyz/music/icon_play.png"
                      className="player-lyric__list__item__assistant__play"
                    />
                    <View className="player-lyric__list__item__assistant__line" />
                    <View className="player-lyric__list__item__assistant__current-time">{item.startTime ? formatTime(item.startTime) : '00:00'}</View>
                  </View>
                )
              }
            </View>
          ))}
        </View>
      ) : (
        <View
          className="player-lyric__empty"
          style={{ height: lyricHeight }}
        >
          {error ? error.message : '暂无歌词'}
        </View>
      )}
    </ScrollView>
  );
}
