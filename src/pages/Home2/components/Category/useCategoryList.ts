import { useState, useEffect } from 'react';

export default function useCategoryList() {
  const [categoryList, setCategoryList] = useState<Array<object>>([]);
  useEffect(() => {
    setCategoryList([
      { id: 1, name: '每日推荐', imageUrl: 'https://fast-learn-oss.youbaobao.xyz/music/icon_recommend.png' },
      { id: 2, name: '私人FM', imageUrl: 'https://fast-learn-oss.youbaobao.xyz/music/icon_fm.png' },
      { id: 3, name: '歌单', imageUrl: 'https://fast-learn-oss.youbaobao.xyz/music/icon_song.png' },
      { id: 4, name: '排行榜', imageUrl: 'https://fast-learn-oss.youbaobao.xyz/music/icon_stat.png' },
      { id: 6, name: '直播', imageUrl: 'https://fast-learn-oss.youbaobao.xyz/music/icon_live.png' },
      { id: 7, name: '数字专辑', imageUrl: 'https://fast-learn-oss.youbaobao.xyz/music/icon_recommend.png' },
      { id: 8, name: '专注冥想', imageUrl: 'https://fast-learn-oss.youbaobao.xyz/music/icon_fm.png' },
      { id: 9, name: '歌房', imageUrl: 'https://fast-learn-oss.youbaobao.xyz/music/icon_song.png' },
      { id: 10, name: '游戏专区', imageUrl: 'https://fast-learn-oss.youbaobao.xyz/music/icon_live.png' },
    ]);
  }, []);

  return {
    categoryList,
  };
}
