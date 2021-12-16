import { View, Text } from '@tarojs/components';
import useSearchRecommend from '@/pages/Search/components/SearchRecommend/useSearchRecommend';

import './index.scss';

export default function SearchRecommend() {
  const { data } = useSearchRecommend();

  return data.length > 0 && (
    <View className="search-recommend">
      <Text className="search-recommend__label">搜索推荐：</Text>
      <View className="search-recommend__tag">
        {
          data.map(text => (
            <View className="search-recommend__tag__text" key={text}>{text}</View>
          ))
        }
      </View>
    </View>
  );
}
