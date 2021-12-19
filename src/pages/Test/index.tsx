import { View, ScrollView } from '@tarojs/components';
import Taro from '@tarojs/taro';

let outerStyle = {}, containerStyle = {}, bottomStyle = {};
if (IS_RN) {
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
    backgroundColor: 'yellow',
  };
  bottomStyle = {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: BOTTOM_HEIGHT,
    backgroundColor: 'red',
    zIndex: 999,
  };
} else {
  const BOTTOM_HEIGHT = Taro.pxTransform(120);
  outerStyle = {
    flex: 1,
    background: 'green',
  };
  containerStyle = {
    paddingBottom: BOTTOM_HEIGHT,
  };
  bottomStyle = {
    position: 'fixed',
    bottom: 0,
    left: 0,
    width: '100%',
    height: BOTTOM_HEIGHT,
    backgroundColor: 'red',
    zIndex: 999,
  };
}

export default function Test() {
  return (
    <View className="test" style={outerStyle}>
      <View className="test__container" style={containerStyle}>
        <ScrollView scrollY>
          <View> Main Content Here</View>
          <View> Main Content Here</View>
          <View> Main Content Here</View>
          <View> Main Content Here</View>
          <View> Main Content Here</View>
          <View> Main Content Here</View>
          <View> Main Content Here</View>
          <View> Main Content Here</View>
          <View> Main Content Here</View>
          <View> Main Content Here</View>
          <View> Main Content Here</View>
          <View> Main Content Here</View>
          <View> Main Content Here</View>
          <View> Main Content Here</View>
          <View> Main Content Here</View>
          <View> Main Content Here</View>
          <View> Main Content Here</View>
          <View> Main Content Here</View>
          <View> Main Content Here</View>
          <View> Main Content Here</View>
          <View> Main Content Here</View>
          <View> Main Content Here</View>
          <View> Main Content Here</View>
          <View> Main Content Here</View>
          <View> Main Content Here</View>
          <View> Main Content Here</View>
          <View> Main Content Here</View>
          <View> Main Content Here</View>
          <View> Main Content Here</View>
          <View> Main Content Here</View>
          <View> Main Content Here</View>
          <View> Main Content Here</View>
          <View> Main Content Here</View>
          <View> Main Content Here</View>
          <View> Main Content Here</View>
          <View> Main Content Here</View>
          <View> Main Content Here</View>
          <View> Main Content Here</View>
          <View> Main Content Here</View>
          <View> Main Content Here</View>
          <View> Main Content Here</View>
          <View> Main Content Here</View>
          <View> Main Content Here</View>
          <View> Main Content Here</View>
          <View> Main Content Here</View>
          <View> Main Content Here</View>
          <View> Main Content Here</View>
          <View> Main Content Here</View>
          <View> Main Content Here</View>
          <View> Main Content Here</View>
          <View> Main Content Here</View>
          <View> Main Content Here</View>
          <View> Main Content Here</View>
          <View> Main Content Here</View>
          <View> Main Content Here</View>
          <View> Main Content Here</View>
          <View> Main Content Here</View>
          <View> Main Content Here</View>
          <View> Main Content Here</View>
          <View> Main Content Here</View>
          <View> Main Content Here</View>
          <View> Main Content Here</View>
          <View> Main Content Here</View>
          <View> Main Content Here</View>
          <View> Main Content Here</View>
          <View> Main Content Here</View>
          <View> Main Content Here</View>
          <View> Main Content Here</View>
          <View> Main Content Here</View>
          <View> Main Content Here</View>
          <View> Main Content Here</View>
          <View> Main Content Here</View>
          <View> Main Content Here</View>
          <View> Main Content Here</View>
          <View> Main Content Here</View>
          <View> Main Content Here</View>
          <View> Main Content Here</View>
          <View> Main Content Here</View>
          <View> Main Content Here</View>
          <View> Main Content Here</View>
          <View> Main Content Here</View>
          <View> Main Content Here</View>
          <View> Main Content Here</View>
          <View> Main Content Here</View>
          <View> Main Content Here</View>
          <View> Main Content Here</View>
          <View> Main Content Here</View>
          <View> Main Content Here</View>
          <View> Main Content Here</View>
          <View> Main Content Here</View>
          <View> Main Content Here</View>
          <View> Main Content Here</View>
          <View> Main Content Here</View>
          <View> Main Content Here</View>
          <View> Main Content Here</View>
          <View> Main Content Here</View>
          <View> Main Content Here</View>
          <View> Main Content Here</View>
          <View> Main Content Here</View>
          <View> Main Content Here</View>
          <View> Main Content Here</View>
          <View> Main Content Here</View>
          <View> Main Content Here</View>
          <View> Main Content Here</View>
          <View> Main Content Here</View>
          <View> Main Content Here</View>
          <View> Main Content Here</View>
          <View> Main Content Here</View>
          <View> Main Content Here</View>
          <View> Main Content Here</View>
          <View> Main Content Here</View>
          <View> Main Content Here</View>
          <View> Main Content Here</View>
          <View> Main Content Here</View>
          <View> Main Content Here</View>
          <View> Main Content Here</View>
          <View> Main Content Here</View>
          <View> Main Content Here</View>
          <View> Main Content Here</View>
          <View> Main Content Here</View>
          <View> Main Content Here</View>
          <View> Main Content Here</View>
          <View> Main Content Here</View>
          <View> Main Content Here</View>
          <View> Main Content Here</View>
          <View> Main Content Here</View>
          <View> Main Content Here</View>
          <View> Main Content Here</View>
          <View> Main Content Here</View>
          <View> Bottom Content Here</View>
        </ScrollView>
      </View>
      <View className="test__bottom" style={bottomStyle}>
        <View>Bottom View</View>
      </View>
    </View>
  );
}
