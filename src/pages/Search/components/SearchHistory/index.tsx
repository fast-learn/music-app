import { View, Text, Image, ScrollView } from '@tarojs/components';
import Taro from '@tarojs/taro';

import './index.scss';

export default function SearchHistory(props): any {
  return props.data.length > 0 && (
    <View className="search-history">
      <Text className="search-history__label">历史</Text>
      <View className="search-history__tag">
        <ScrollView
          className="search-history__tag__scroll"
          scrollX
          enableFlex={IS_WEAPP}
          // @ts-ignore
          showsHorizontalScrollIndicator={false}
        >
          {
            props.data.map((text, index) => (
              <View
                className="search-history__tag__scroll__item"
                key={text + index}
                style={{
                  minWidth: IS_H5 || IS_WEAPP ?
                    Taro.pxTransform(text.length * 25 + 48) : 'auto',
                  width: IS_H5 || IS_WEAPP ?
                    Taro.pxTransform(text.length * 25 + 48) : 'auto',
                }}
                onClick={() => props.onSearch(text, { searchFromHistory: true })}
              >
                {text}
              </View>
            ))
          }
        </ScrollView>
      </View>
      <Image
        src="https://fast-learn-oss.youbaobao.xyz/music/icon_trash.png"
        className="search-history__clear"
        onClick={props.clear}
      />
    </View>
  );
}
