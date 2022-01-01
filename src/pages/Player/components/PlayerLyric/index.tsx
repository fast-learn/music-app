import { View, ScrollView } from '@tarojs/components';
import Taro from '@tarojs/taro';
import classnames from 'classnames';
import useLyric from '../../hooks/useLyric';

import './index.scss';

let lyricHeight: any = '100%';
// 计算歌词的高度，用于控制ScrollView的高度
if (IS_RN) {
  const { getBottomSpace, getStatusBarHeight } = require('react-native-iphone-x-helper');
  const { Dimensions } = require('react-native');
  const HEIGHT = Dimensions.get('window').height;
  const BOTTOM_SPACE = getBottomSpace();
  const STATUS_BAR = getStatusBarHeight();
  const PLAYER_HEADER_HEIGHT = +Taro.pxTransform(199);
  const PLAYER_BOTTOM_HEIGHT = +Taro.pxTransform(369);
  lyricHeight = HEIGHT - BOTTOM_SPACE - STATUS_BAR - PLAYER_HEADER_HEIGHT - PLAYER_BOTTOM_HEIGHT;
} else if (IS_WEAPP) {
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
  const { error, lyric } = props;
  const { scrollRef, listRef, lyricIndex } = useLyric(props);

  return (
    <ScrollView
      ref={scrollRef}
      className="player-lyric"
      style={{ height: lyricHeight, flex: 1 }}
      scrollY
      enableFlex={IS_WEAPP} // 兼容微信小程序
      enhanced // 小程序scroll-view开启增强模式
      // @ts-ignore
      showsVerticalScrollIndicator={false}
      scrollWithAnimation
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
              {item.content}
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
