import { useEffect, useState } from 'react';
import Taro from '@tarojs/taro';

export default function useSearchHistory() {
  const [data, setData] = useState<Array<string>>([]);

  useEffect(() => {
    init();
  }, []);

  function init() {
    // 将搜索关键词存入缓存
    let searchHistory: any;
    Taro.getStorage({ key: 'search_history' })
      .then(res => {
        searchHistory = res.data;
        if (!searchHistory) {
          searchHistory = [];
        }
        setData(searchHistory);
      })
      .catch(() => {
        searchHistory = [];
        setData(searchHistory);
      });
  }

  function clear() {
    setData([]);
    Taro.clearStorage();
  }

  return {
    data,
    clear,
    init,
  };
}
