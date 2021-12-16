import * as React from 'react';
import Taro from '@tarojs/taro';
import { View,Image, Swiper, SwiperItem } from '@tarojs/components';

import './index.scss';

export interface SearchProps {}
export interface SearchState {
  bannerList: any,
  currentIndex: number
}

export default class BannerRn extends React.Component<
  SearchProps,
  SearchState
> {
  constructor(props: SearchProps) {
    super(props);
    this.state = {
      // eslint-disable-next-line react/no-unused-state
      bannerList: [],
      currentIndex: 0
    };
  }
  componentDidMount() {
    const data = {
      type: 0,
    };
    Taro.request({
      url: "https://fast-learn.youbaobao.xyz:8001/banner?type=0",
      method: "GET",
      data,
    }).then((params) => {
      this.setState({
        // eslint-disable-next-line react/no-unused-state
        bannerList: params.data.banners,
      });
    });
  }
  onChange = (e) =>{
    this.setState({currentIndex:e.detail.current})
  }
  render() {
    return (
      <View className="banner">
        <Swiper
          indicatorColor="#999"
          indicatorActiveColor="#333"
          // autoplay
          // interval={3000}
          // circular
          current={this.state.currentIndex}
          onChange={this.onChange}
        >
          {this.state.bannerList.map((item) => (
            <SwiperItem key={item.imageUrl}>
              <Image  className="banner--image" src={item.imageUrl} />
            </SwiperItem>
          ))}
        </Swiper>
          <View className="spot-pagination">
            {this.state.bannerList.map((item,index) => (
              <View key={item.imageUrl} className={'spot-pagination-bullet ' + ((this.state.currentIndex === index)? 'spot-pagination-bullet-active': '')}>
              </View>
            ))}
          </View>
      </View>
    );
  }
}
