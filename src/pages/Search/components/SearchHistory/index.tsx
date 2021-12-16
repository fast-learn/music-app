import { View, Text } from '@tarojs/components';
import { AtIcon } from 'taro-ui';
import useSearchHistory from '@/pages/Search/components/SearchHistory/useSearchHistory';

import './index.scss';

export default function Index() {
  const { data, clear } = useSearchHistory();

  return data.length > 0 && (
    <View className="search-history">
      <Text className="search-history__label">历史</Text>
      <View className="search-history__tag">
        {
          data.map(text => (
            <View className="search-history__tag__text">{text}</View>
          ))
        }
      </View>
      <AtIcon value="trash" color="#ccc" size={48} onClick={clear} />
    </View>
  );
}
