import { View } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { showAlert } from '@/utils';

let Input, ScrollView;
if (IS_RN) {
  Input = require('react-native').TextInput;
  ScrollView = require('react-native').ScrollView;
} else {
  Input = require('@tarojs/components').Input;
  ScrollView = require('@tarojs/components').ScrollView;
}

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
      <View
        style={{ height: 200, backgroundColor: 'green' }}
        onClick={() => showAlert('click!!!')}
      />
      <View className="test__container" style={containerStyle}>
        <ScrollView
          scrollY
          // @ts-ignore
          keyboardShouldPersistTaps="always"
          keyboardDismissMode="on-drag"
        >
          <View style={{ paddingTop: 100 }}>Input your name:
          </View>
          <Input />
          <View
            style={{ height: 2000, backgroundColor: 'blue' }}
            onClick={() => showAlert('click!')}
          />
        </ScrollView>
      </View>
      <View className="test__bottom" style={bottomStyle}>
      </View>
    </View>
  );
}
