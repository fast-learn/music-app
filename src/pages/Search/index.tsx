import { View } from '@tarojs/components';
import Taro from '@tarojs/taro';
import SearchBar from '@/pages/Home/components/SearchBar';
import SearchHistory from '@/pages/Search/components/SearchHistory';
import SearchRecommend from '@/pages/Search/components/SearchRecommend';

import './index.scss';

export default function Index() {
  const IS_RN = process.env.TARO_ENV === 'rn';
  const RN_CLS = IS_RN ? ' search-page--rn' : '';
  return (
    <View className={`search-page${RN_CLS}`}>
      <SearchBar status="active" />
      <SearchHistory />
      <SearchRecommend />
    </View>
  );
}
