import * as React from 'react';
import Taro from '@tarojs/taro';
import {View, ScrollView} from 'react-native';
import {Image} from '@tarojs/components'

import './index.scss';

export interface SearchProps {}
export interface IsndexState {
  bannerList: any;
}


export default class newMusic extends React.Component<SearchProps, IsndexState> {
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
      params.data.banners.map((item) => {
        item.newImageUrl = 'https' + item.imageUrl.split('http')[1]
      })
      this.setState({
        // eslint-disable-next-line react/no-unused-state
        bannerList: params.data.banners,
      });
    });
  }
  render() {
    return (
      <View className="newMusic" style={{width:'100%',height:60}} >
        <ScrollView
          pagingEnabled//是否分页，默认不分页，水平滑动时候会一下跳动很多页过去，加上true则一页一页滚动
          horizontal//水平滚动开启
          showsHorizontalScrollIndicator={false}
          // scrollEnabled={false}//是否允许滚动
        >
          {this.state.bannerList ? this.state.bannerList.map((item) => (
            <View key={item.id} className="category__scroll--center">
            <Image className="category__scroll--center--image"  src={item.imageUrl} />
          </View>
          )) : ''}
          </ScrollView>
      </View>
    );
  }
}
