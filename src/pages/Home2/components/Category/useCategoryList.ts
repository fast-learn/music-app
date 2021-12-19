import { useState, useEffect } from 'react';
import Mimg from '@/img/m.png';
import Simg from '@/img/s.png';
import Gimg from '@/img/g.png';
import Pimg from '@/img/p.png';

export default function useCategoryList() {
  const [categoryList, setCategoryList] = useState<Array<object>>([]);
  useEffect(() => {
    setCategoryList([
      { id: 1, name: '每日推荐', imageUrl: Mimg },
      { id: 2, name: '私人FM', imageUrl: Simg },
      { id: 3, name: '歌单', imageUrl: Gimg },
      { id: 4, name: '排行榜', imageUrl: Pimg },
      { id: 5, name: '歌单', imageUrl: Mimg },
      { id: 6, name: '直播', imageUrl: Simg },
      { id: 7, name: '数字专辑', imageUrl: Gimg },
      { id: 8, name: '专注冥想', imageUrl: Pimg },
      { id: 9, name: '歌房', imageUrl: Mimg },
      { id: 10, name: '游戏专区', imageUrl: Simg },
    ]);
  }, []);

  return {
    categoryList,
  };
}
