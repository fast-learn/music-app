import * as React from "react";
import Taro from "@tarojs/taro";
import { View,Image, Swiper, SwiperItem } from "@tarojs/components";

import "./index.scss";

export interface SearchProps {}
export interface SearchState {
  bannerList: any;
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
  render() {
    return (
      <View className='banner'>
        <Swiper
          indicatorColor='#999'
          indicatorActiveColor='#333'
          // vertical='true'
          autoplay
          interval={3000}
          circular
          indicatorDots
        >
          {this.state.bannerList.map((item) => (
            <SwiperItem key={item.imageUrl}>
              <Image src={item.imageUrl} />
            </SwiperItem>
          ))}
        </Swiper>
      </View>
    );
  }
}
