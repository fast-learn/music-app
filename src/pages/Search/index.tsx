import { useState } from 'react';
import { ScrollView } from '@tarojs/components';
import Taro from '@tarojs/taro';
import Layout from '@/components/Layout';
import SearchBar from '@/components/SearchBar';
import Advertisement from '@/pages/Search/components/Advertisement';
import SearchHistory from '@/pages/Search/components/SearchHistory';
import SearchRecommend from '@/pages/Search/components/SearchRecommend';
import SearchSuggest from '@/pages/Search/components/SearchSuggest';

import './index.scss';

export default function Index() {
  const [suggestKeywords, setSuggestKeywords] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState('');
  return (
    <Layout hideBottomBar>
      <SearchBar
        status="active"
        showSuggestKeyword={(keywords, searchWord) => {
          setSuggestKeywords(keywords);
          setSearchKeyword(searchWord);
        }}
      />
      <ScrollView scrollY style={{ backgroundColor: '#fff' }}>
        {
          !searchKeyword.trim() && suggestKeywords.length === 0 ? (
            <>
              <Advertisement
                imgUrl="https://fast-learn-oss.youbaobao.xyz/music/advertisement.png"
                style={{ marginTop: Taro.pxTransform(10) }}
              />
              <SearchHistory />
              <SearchRecommend />
            </>
          ) : (
            <SearchSuggest suggestKeywords={suggestKeywords} searchKeyword={searchKeyword} />
          )
        }
      </ScrollView>
    </Layout>
  );
}
