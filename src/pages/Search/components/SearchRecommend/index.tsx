import { View, Text } from '@tarojs/components';
import useSearchRecommend from './useSearchRecommend';

import './index.scss';

export default function SearchRecommend(props): any {
  const { data } = useSearchRecommend();

  return data.length > 0 && (
    <View className="search-recommend">
      <Text className="search-recommend__label">搜索推荐：</Text>
      <View className="search-recommend__tag">
        {
          data.slice(0, 3).map((text, index) => (
            <View
              className="search-recommend__tag__text"
              key={text + index}
              onClick={() => props.onSearch(text)}
            >{text}</View>
          ))
        }
      </View>
    </View>
  );
}
