import { useEffect, useState } from 'react';
import { getSearchDefault, getSearchSuggest } from '@/services/api';
import { showAlert } from '@/utils';
import Taro from '@tarojs/taro';

export default function useSearch(props) {
  const [searchWord, setSearchWord] = useState('');
  const [showKeyword, setShowKeyword] = useState('欢迎学习Taro多端开发');
  const [realKeyword, setRealKeyword] = useState('');
  const [suggestKeyword, setSuggestKeyword] = useState([]);

  useEffect(() => {
    // 获取搜索默认关键词
    getSearchDefault().then((res) => {
      setShowKeyword(res.showKeyword);
      setRealKeyword(res.realkeyword);
    });
  }, []);

  useEffect(() => {
    if (!isSearchWordEmpty()) {
      getSearchSuggest(searchWord).then(res => {
        if (res.allMatch) {
          // console.log(res.allMatch);
          setSuggestKeyword(res.allMatch);
        } else {
          setSuggestKeyword([]);
        }
      });
    } else {
      setSuggestKeyword([]);
    }
  }, [searchWord]);

  function isSearchWordEmpty() {
    return !searchWord || !searchWord.trim();
  }

  function onInput(e) {
    const keyword = e.detail.value;
    console.log('onInput', keyword);
    setSearchWord(keyword);
  }

  async function onSearch(specifiedSearchWord = '', { searchFromHistory = false } = {}) {
    let searchKeyword;
    if (specifiedSearchWord) {
      showAlert(specifiedSearchWord);
      searchKeyword = specifiedSearchWord;
    } else if (isSearchWordEmpty()) {
      showAlert(realKeyword);
      searchKeyword = realKeyword;
    } else {
      showAlert(searchWord);
      searchKeyword = searchWord;
    }
    console.log('onSearch', searchKeyword);
    // 将搜索关键词存入缓存
    if (searchFromHistory) {
      return;
    }
    let searchHistory: any;
    try {
      searchHistory = (await Taro.getStorage({ key: 'search_history' })).data;
      if (!searchHistory) {
        searchHistory = [];
      }
    } catch (e) {
      console.log(e);
      searchHistory = [];
    }
    searchHistory.unshift(searchKeyword);
    await Taro.setStorage({
      key: 'search_history',
      data: searchHistory,
    });
    props.initSearchHistory();
  }

  function onClear() {
    setSearchWord('');
  }

  return {
    searchWord,
    showKeyword,
    realKeyword,
    suggestKeyword,
    isSearchWordEmpty,
    onInput,
    onSearch,
    onClear,
  };
}
