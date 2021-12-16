import { View } from '@tarojs/components';
// import SearchBar from '@/pages/Home/components/SearchBar';
import SearchHistory from '@/pages/Search/components/SearchHistory';
import './index.scss';

export default function Index() {
  return (
    <View className="search-page">
      {/* <SearchBar status="active" /> */}
      <SearchHistory />
    </View>
  );
}
