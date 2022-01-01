import { View } from '@tarojs/components';
import { useCallback } from 'react';

export default function Test() {
  const ref = useCallback(node => {
    if (IS_RN) {
      const { UIManager, findNodeHandle } = require('react-native');
      console.log('Ref', ref);
      const handle = findNodeHandle(node);
      console.log(handle);
      UIManager.measure(handle, (x, y, width, height, pageX, pageY) => {
        console.log('UIManager', x, y, width, height, pageX, pageY);
      });
    }
  }, []);
  return (
    <View>
      <View
        style={{
          backgroundColor: 'red',
          height: 1000,
          paddingTop: 100,
        }}
        ref={ref}
      >111</View>
    </View>
  );
}
