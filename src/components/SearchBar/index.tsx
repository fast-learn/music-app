import { View, Image } from '@tarojs/components';
import Taro from '@tarojs/taro';

import './index.scss';

let barHeight = 0;
let height: string = '120';
if (IS_RN) {
  const { getStatusBarHeight } = require('react-native-iphone-x-helper');
  barHeight = getStatusBarHeight() * 1.25;
  height = Taro.pxTransform(+height + barHeight);
} else {
  height = Taro.pxTransform(+height);
}

export default function SearchBar(props) {
  const { status = 'normal', isScrolling } = props;
  return status === 'normal' ? (
    <>
      {!IS_RN && (
        <View
          className="search-bar--block"
          style={{ height }}
        />
      )}
      <View
        className={`search-bar${IS_RN ? '' : ' search-bar--fixed'}${!isScrolling ? '' : ' search-bar--scrolling'}`}
        style={{
          height,
          paddingTop: barHeight,
          boxSizing: 'border-box',
        }}
      >
        <Image src="https://fast-learn-oss.youbaobao.xyz/music/icon_menu.png" className="search-bar__icon" />
        <View className={`search-bar__input-bg${!isScrolling ? '' : ' search-bar__input-bg--scrolling'}`}>
          <Image
            src="https://fast-learn-oss.youbaobao.xyz/music/icon_search_gray.png"
            className="search-bar__input-bg__icon"
          />
          <View className="search-bar__input-bg__text">你的名字 最近很火哦</View>
        </View>
        <Image src="https://fast-learn-oss.youbaobao.xyz/music/icon_voice.png" className="search-bar__voice" />
      </View>
    </>
  ) : (
    <View />
  );
}
