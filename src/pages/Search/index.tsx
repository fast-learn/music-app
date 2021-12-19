import { View } from '@tarojs/components';
import SearchBar from '@/pages/Home/components/SearchBar';
import SearchHistory from '@/pages/Search/components/SearchHistory';
import SearchRecommend from '@/pages/Search/components/SearchRecommend';

import './index.scss';

export default function Index() {
  const RN_CLS = IS_RN ? ' search-page--rn' : '';
  return (
    <View className={`search-page${RN_CLS}`}>
      <SearchBar status="active" />
      <SearchHistory />
      <SearchRecommend />
    </View>
  );
}
