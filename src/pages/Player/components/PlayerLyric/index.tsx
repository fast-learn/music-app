import { View, ScrollView } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { AtIcon } from 'taro-ui'
import classnames from 'classnames';
import useLyric from '../../hooks/useLyric';

import './index.scss';

let lyricHeight: any = '100%';
// 计算歌词的高度，用于控制ScrollView的高度
if (IS_WEAPP) {
  const systemInfo = Taro.getSystemInfoSync();
  const { safeArea, statusBarHeight } = systemInfo;
  const HEIGHT = safeArea.height;
  // const BOTTOM_SPACE = safeArea.bottom - safeArea.height;
  const STATUS_BAR = statusBarHeight;
  const PLAYER_HEADER_HEIGHT = 169 / 2;
  const PLAYER_BOTTOM_HEIGHT = 369 / 2;
  lyricHeight = (HEIGHT - STATUS_BAR - PLAYER_HEADER_HEIGHT - PLAYER_BOTTOM_HEIGHT) + 'PX';
}
export default function PlayerLyric(props) {
  const { error, lyric, formatTime, isLoaded } = props;
  // @ts-ignore
  const { scrollRef, listRef, lyricIndex, onScroll, onTouchStart, onTouchEnd, isManualScroll, seekTo, scrollTop } = useLyric(props);

  return (
    <ScrollView
      className="player-lyric"
      style={{ height: lyricHeight, flex: 1 }} // 手动计算滚动条高度
      ref={scrollRef} // 绑定ref
      scrollY // 开启y轴滚动
      enableFlex={IS_WEAPP} // 兼容微信小程序
      enhanced // 微信小程序scroll-view开启增强模式，以获得scrollTo API
      scrollTop={scrollTop}
      onScroll={onScroll}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {lyric && lyric.length > 0 ? (
        <View className="player-lyric__list" ref={listRef}>
          {lyric.map((item: any, index) => (
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
                    <AtIcon value="play" color="rgba(255,255,255,.5)" size="24" />
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
