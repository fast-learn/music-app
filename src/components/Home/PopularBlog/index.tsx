import React from 'react'
import { View} from '@tarojs/components'
import HomeSwiper from '../../base/HomeSwiper'


import './index.scss'

// 推荐新音乐 https://fast-learn.youbaobao.xyz:8001/personalized/newsong?limit=12

export interface PopularBlogProps {
  popularBlogList: any
}

export interface PopularBlogState {
  popularBlogList: any;
}
export default class PopularBlog extends React.Component<PopularBlogProps,PopularBlogState> {
  constructor(props:PopularBlogProps){
    super(props)
    this.state ={
      popularBlogList:props.popularBlogList
    }
  }
  componentWillReceiveProps(nextProps){
    this.setState({
      popularBlogList: nextProps.popularBlogList
    })
  }
  render () {
    return (
      <View className='popularBlog'>
        <HomeSwiper
          title='热门博客'
          homeSwiperList={this.state.popularBlogList}
        />
      </View>
    )
  }
}
