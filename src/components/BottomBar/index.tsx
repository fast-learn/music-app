import { useSelector, useDispatch } from 'react-redux';
import { View, Image, Text } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { CHANGE_BOTTOM_BAR_INDEX } from '@/stores/constants';

import './index.scss';

export default function BottomBar() {
  const { selectIndex = 0 } = useSelector((state: any) => state.bottomBar);
  const dispatch = useDispatch();

  const data = [{
    id: 1,
    imgUrl: 'https://fast-learn-oss.youbaobao.xyz/music/icon_logo.png',
    imgUrlSelected: 'https://fast-learn-oss.youbaobao.xyz/music/icon_logo_selected.png',
    text: '发现',
    width: Taro.pxTransform(43),
    height: Taro.pxTransform(43),
  }, {
    id: 2,
    imgUrl: 'https://fast-learn-oss.youbaobao.xyz/music/icon_music.png',
    imgUrlSelected: 'https://fast-learn-oss.youbaobao.xyz/music/icon_music_selected.png',
    width: Taro.pxTransform(37),
    height: Taro.pxTransform(37),
    text: '我的',
  }, {
    id: 3,
    imgUrl: 'https://fast-learn-oss.youbaobao.xyz/music/icon_cloudcity.png',
    imgUrlSelected: 'https://fast-learn-oss.youbaobao.xyz/music/icon_cloudcity_selected.png',
    width: Taro.pxTransform(46),
    height: Taro.pxTransform(46),
    text: '云村',
  }];

  function changeIndex(index) {
    dispatch({
      type: CHANGE_BOTTOM_BAR_INDEX,
      payload: {
        index,
      },
    });
  }

  function createClass(className, index) {
    return `${className}${index === selectIndex ? ` ${className}--active` : ''}`;
  }

  return (
    <View className="bottom-bar">
      {
        data.map((item, index) => (
          <View
            className={createClass('bottom-bar__item', index)}
            key={item.id}
            onClick={() => changeIndex(index)}
          >
            <View className={createClass('bottom-bar__item__bg', index)}>
              <Image
                className={createClass('bottom-bar__item__bg__img', index)} src={index === selectIndex ? item.imgUrlSelected : item.imgUrl}
                style={{
                  width: index === selectIndex ? Taro.pxTransform(56) : item.width,
                  height: index === selectIndex ? Taro.pxTransform(56) : item.height,
                }}
              />
            </View>
            <Text className={createClass('bottom-bar__item__text', index)}>{item.text}</Text>
          </View>
        ))
      }
    </View>
  );
}
