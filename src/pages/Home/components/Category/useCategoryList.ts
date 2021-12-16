import {useState,useEffect } from 'react'
import Mimg from '@/img/m.png';
import Simg from '@/img/s.png';
import Gimg from '@/img/g.png';
import Pimg from '@/img/p.png';

export default function useCategoryList(){
  const [categoryList, setCagegoryList] = useState<Array<object>>([]);
  useEffect(() => {
    setCagegoryList([
      {id: 1,name:'每日推荐',imageUrl:Mimg},
      {id: 2,name:'私人 FM',imageUrl:Simg},
      {id: 3,name:'歌单',imageUrl:Gimg},
      {id: 4,name:'排行榜',imageUrl:Pimg},
      {id: 5,name:'歌单',imageUrl:Gimg},
      {id: 6,name:'排行榜',imageUrl:Pimg},
      {id: 7,name:'歌单',imageUrl:Gimg},
      {id: 8,name:'歌单',imageUrl:Gimg},
      {id: 9,name:'歌单',imageUrl:Gimg},
    ])
  },[])

  return {
    categoryList
  }
}