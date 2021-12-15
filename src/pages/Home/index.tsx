import React from 'react'
import { View } from '@tarojs/components'
import Taro from '@tarojs/taro';

import Search from '@/components/Home/SearchBar'
import Banner from '@/components/Home/Banner'
import Category from '@/components/Home/Category'
import Recommended from '@/components/Home/Recommended'
// import RecommendVideo from '@/components/Home/RecommendVideo'
// import NewMusic from '@/components/Home/NewMusic'
// import Radar from '@/components/Home/Radar'
// import PopularBlog from '@/components/Home/PopularBlog'
// import Exclusivec from '@/components/Home/Exclusivec'
// import VideoCollection from '@/components/Home/VideoCollection'

import './index.scss'

export interface IndexProps {
}

export interface IndexState {
  homeList: any;
}
export default class Index extends React.Component<IndexProps,IndexState> {

  constructor(props:IndexProps){
    super(props)
    this.state={
      // eslint-disable-next-line react/no-unused-state
      homeList:''
    }
  }

  componentDidMount(){
    Taro.request({
      url:'https://fast-learn.youbaobao.xyz:8001/homepage/block/page',
      method:'GET'
    }).then((params) => {
      this.setState({
        // eslint-disable-next-line react/no-unused-state
        homeList: params.data.data.blocks
      })
    })
  }
  render () {
    return (
      <View className='index'>
        {/* 搜索栏 */}
        <Search />
        {/* banner 图 */}
        <Banner />
        {/* 分类 */}
        <Category />
        {/* 推荐歌单 */}
        <Recommended />
        {/* 清雅古风--> 替换为推荐新歌 */}
        {/* <NewMusic /> */}
        {/* 精选音乐视频 */}
          {/* <RecommendVideo /> */}
        {/* 雷达歌单 */}
        {/* <Radar
          radarList={this.state.homeList ? this.state.homeList[6].creatives: []}
        /> */}
        {/* 热门博客 */}
        {/* <PopularBlog
          popularBlogList={this.state.homeList ? this.state.homeList[8].creatives: []}
        /> */}
        {/* 专属场景歌单 */}
        {/* <Exclusivec
          exclusivecList={this.state.homeList ? this.state.homeList[7].creatives: []}
        /> */}
        {/* 视频合辑 */}
        {/* <VideoCollection
          videoCollectionList={this.state.homeList ? this.state.homeList[10].creatives: []}
        /> */}
      </View>
    )
  }
}
