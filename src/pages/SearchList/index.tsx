import { ScrollView, View } from '@tarojs/components';
import Layout from '@/components/Layout';
import SearchBar from '@/components/SearchBar';
import useSearchList from './useSearchList';

export default function SearchList() {
  const { searchWord } = useSearchList();
  return (
    <Layout hideBottomBar>
      <SearchBar
        status="list"
        searchWord={searchWord}
        autoFocus={false}
      />
      <ScrollView scrollY>
        <View>{searchWord}</View>
      </ScrollView>
    </Layout>
  );
}
