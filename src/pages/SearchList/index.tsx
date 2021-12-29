// import { ScrollView, View } from '@tarojs/components';
import Layout from '@/components/Layout';
import {useCallback} from 'react'
import SearchBar from '@/components/SearchBar';
import useSearchList from './useSearchList';
import SearchListTabBar from './components/SearchListTabBar'

import './index.scss'

export default function SearchList() {
  const  useSearch  = useSearchList();
  return (
    <Layout hideBottomBar >
      <SearchBar
        status="list"
        searchWord={useSearch.searchWord}
        autoFocus={false}
      />
      <SearchListTabBar {...useSearch}></SearchListTabBar>
      {/* <ScrollView scrollY>
        <View>{searchWord}</View>
      </ScrollView> */}
    </Layout>
  );
}
