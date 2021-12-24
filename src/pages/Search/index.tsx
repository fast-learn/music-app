import { ScrollView } from '@tarojs/components';
import Taro from '@tarojs/taro';
import Layout from '@/components/Layout';
import SearchBar from '@/components/SearchBar';
import useSearch from '@/components/SearchBar/useSearch';
import Advertisement from './components/Advertisement';
import SearchHistory from './components/SearchHistory';
import SearchRecommend from './components/SearchRecommend';
import SearchSuggest from './components/SearchSuggest';
import useSearchHistory from './components/SearchHistory/useSearchHistory';

import './index.scss';

export default function Index() {
  const { data: searchHistory, clear: clearSearchHistory, init: initSearchHistory } = useSearchHistory();
  const {
    searchWord,
    showKeyword,
    realKeyword,
    suggestKeyword,
    isSearchWordEmpty,
    onInput,
    onSearch,
    onClear,
  } = useSearch({ initSearchHistory });

  return (
    <Layout hideBottomBar>
      <SearchBar
        status="search"
        searchWord={searchWord}
        showKeyword={showKeyword}
        realKeyword={realKeyword}
        suggestKeyword={suggestKeyword}
        isSearchWordEmpty={isSearchWordEmpty}
        onInput={onInput}
        onSearch={onSearch}
        onClear={onClear}
      />
      <ScrollView
        scrollY
        style={{ backgroundColor: '#fff' }}
        // @ts-ignore
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
      >
        {
          !searchWord.trim() && suggestKeyword.length === 0 ? (
            <>
              <Advertisement
                imgUrl="https://fast-learn-oss.youbaobao.xyz/music/advertisement.png"
                style={{ marginTop: Taro.pxTransform(10) }}
              />
              <SearchHistory
                data={searchHistory}
                clear={clearSearchHistory}
                onSearch={onSearch}
              />
              <SearchRecommend onSearch={onSearch} />
            </>
          ) : (
            <SearchSuggest
              suggestKeywords={suggestKeyword}
              searchKeyword={searchWord}
              onSearch={onSearch}
            />
          )
        }
      </ScrollView>
    </Layout>
  );
}
