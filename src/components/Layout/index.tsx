import { View } from '@tarojs/components';
import SafeAreaView from '@/components/SafeAreaView';
import StatusBar from '@/components/StatusBar';
import BottomBar from '@/components/BottomBar';
import Taro from '@tarojs/taro';

export default function Layout(props) {
  let outerStyle = {}, containerStyle = {}, bottomStyle = {};
  let bottomSpace = 0;
  if (IS_RN) {
    const { getBottomSpace } = require('react-native-iphone-x-helper');
    bottomSpace = getBottomSpace();
    const { Dimensions } = require('react-native');
    const HEIGHT = Dimensions.get('window').height;
    const BOTTOM_HEIGHT = Taro.pxTransform(120);
    const CONTAINER_HEIGHT = HEIGHT - +BOTTOM_HEIGHT;
    outerStyle = {
      flex: 1,
      width: '100%',
      height: HEIGHT,
      overflow: 'hidden',
    };
    containerStyle = {
      width: '100%',
      height: CONTAINER_HEIGHT,
      // paddingTop: barHeight,
      paddingBottom: props.hideBottomBar ? 0 : bottomSpace,
    };
    bottomStyle = {
      position: 'absolute',
      bottom: bottomSpace,
      left: 0,
      width: '100%',
      height: BOTTOM_HEIGHT,
      zIndex: 999,
    };
  } else {
    let BOTTOM_HEIGHT = Taro.pxTransform(120);
    let paddingBottom = 0;
    // 微信小程序需要实现独立的padding-bottom逻辑
    if (IS_WEAPP) {
      const systemInfo = Taro.getSystemInfoSync();
      const { safeArea } = systemInfo;
      paddingBottom = safeArea.bottom - safeArea.height;
    }
    outerStyle = {
      flex: 1,
    };
    containerStyle = {
      paddingBottom: props.hideBottomBar ? 0 : BOTTOM_HEIGHT,
    };
    bottomStyle = {
      position: 'fixed',
      bottom: 0,
      left: 0,
      width: '100%',
      height: BOTTOM_HEIGHT,
      paddingBottom,
      zIndex: 999,
      backgroundColor: '#fff',
    };
  }

  return (
    <SafeAreaView style={{ ...outerStyle, ...props.outerStyle }}>
      <StatusBar backgroundColor="#12B983" barStyle="dark-content" />
      <View style={{ ...containerStyle, ...props.containerStyle }}>
        {props.children}
      </View>
      <View
        style={{
          ...bottomStyle,
          ...props.bottomStyle,
          display: props.hideBottomBar ? 'none' : '',
        }}
      >
        <BottomBar />
      </View>
    </SafeAreaView>
  );
}
