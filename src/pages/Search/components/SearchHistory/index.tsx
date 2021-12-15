import { View, Text } from '@tarojs/components';
import { AtIcon } from 'taro-ui';
import './index.scss';

export default function Index(props) {
  const { data = [] } = props;
  return (
    <View className="search-history">
      <Text className="search-history__label">历史</Text>
      <View className="search-history__tag">
        {
          data.map(text => (
            <Text className="search-history__tag__text">{text}</Text>
          ))
        }
      </View>
      <AtIcon value="trash" color="#ccc" size={48} />
    </View>
  );
}
