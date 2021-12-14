import * as React from "react";
import Taro from "@tarojs/taro";
import { View, Image } from '@tarojs/components';
import Carousel from "../../../../node_modules/@ant-design/react-native/lib/carousel";

import "./index.scss";
import SearchImg from '../../../assert/images/cvy.png'

export interface SearchProps {}
export interface IsndexState {
  bannerList: any;
}


export default class BannerRn extends React.Component<SearchProps, IsndexState> {
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
        <Carousel autoplay  dots >
        {/* <View className='te'> */}
        <Image src={SearchImg} className='image' />
        {/* </View>
        <Text className='demo'>
          222
        </Text> */}
      </Carousel>
      </View>
    );
  }
}
