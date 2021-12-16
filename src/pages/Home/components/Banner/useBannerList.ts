import {useState,useEffect } from 'react'
import Taro from '@tarojs/taro';

export default function useCategoryList(){
  const [bannerList, setBannerList] = useState<Array<object>>([]);
  useEffect(() => {
    Taro.request({
      url: "https://fast-learn.youbaobao.xyz:8001/banner?type=0",
      method: "GET",
      data:{type: 0},
    }).then((params) => {
      params.data.banners.map((item) => {
        item.newImageUrl = 'https' + item.imageUrl.split('http')[1]
      })
      setBannerList(params.data.banners)
    });
  },[])

  return {
    bannerList
  }
}