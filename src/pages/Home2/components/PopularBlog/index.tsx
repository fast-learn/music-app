import React from 'react';
import { View} from '@tarojs/components';
import HomeSwiper from '../../Base/HomeSwiper';


import './index.scss';

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
      <View className="popularBlog">
        <HomeSwiper
          title="热门博客"
          homeSwiperList={this.state.popularBlogList}
        />
      </View>
    )
  }
}
