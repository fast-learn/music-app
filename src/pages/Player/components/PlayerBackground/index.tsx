import { View } from '@tarojs/components';
import Taro from '@tarojs/taro';

// RN背景图片解决方案
let ImageBackground = null;
if (IS_RN) {
  ImageBackground = require('react-native').ImageBackground;
}
// RN iphonex兼容
let barHeight: any = 0;
let bottomSpace: any = 0;
if (IS_RN) {
  const { getStatusBarHeight, getBottomSpace } = require('react-native-iphone-x-helper');
  barHeight = getStatusBarHeight();
  bottomSpace = getBottomSpace();
} else if (IS_WEAPP) {
  const systemInfo = Taro.getSystemInfoSync();
  const { safeArea, statusBarHeight } = systemInfo;
  barHeight = safeArea.top + statusBarHeight;
  bottomSpace = safeArea.bottom - safeArea.height;
}
export default function PlayerBackground(props) {
  return IS_RN ? (
    // @ts-ignore
    <ImageBackground
      style={{
        flex: 1,
        paddingTop: barHeight,
        paddingBottom: bottomSpace,
        display: 'flex',
        flexDirection: 'column',
      }}
      source={{ uri: 'https://fast-learn-oss.youbaobao.xyz/music/player_bg.png' }}
      resizeMode="cover"
    >
      {props.children}
    </ImageBackground>

  ) : (
    <View
      className="player"
      style={{
        height: '100vh',
        boxSizing: 'border-box',
        paddingTop: barHeight,
        backgroundImage: 'linear-gradient(0deg, #171B1E, #545D69)',
        backgroundSize: '100% 100%',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {props.children}
    </View>
  );
}
