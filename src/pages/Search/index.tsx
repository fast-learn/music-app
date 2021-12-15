import { View } from '@tarojs/components';
import SearchBar from '@/components/Home/SearchBar';
import SearchHistory from '@/pages/Search/components/SearchHistory';
import './index.scss';

export default function Index() {
  return (
    <View className="search-page">
      <SearchBar status="active" />
      <SearchHistory data={['特别的人', '给你给我', '位置']} />
    </View>
  );
}
