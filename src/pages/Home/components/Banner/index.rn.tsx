import * as React from 'react';
import Taro from '@tarojs/taro';
// import { Image} from '@tarojs/components';
import {View,Image} from 'react-native';
import  Carousel  from '../../../../node_modules/@ant-design/react-native/lib/carousel';
import useBannerList from './useBannerList';

import './index.scss';

// export interface SearchProps {}
// export interface IsndexState {
//   bannerList: any;
// }

export default function Banner(){
  const {bannerList} = useBannerList()
  return bannerList.length > 0 && (
    <View className="banner" >
        <Carousel
          style={{ marginLeft:5,marginRight:5, height:160,flexGrow:1}}
          infinite
          autoplay
          dotActiveStyle={{
            background: 'rgba(222, 224, 230, 0.5)'
          }}
          dotStyle={{
            width: 20,
            height: 2,
            background: 'rgba(66, 80, 107, 0.5)',
          }}
        >
          {bannerList.map((item,index) => (
            <Image className="banner--image" key={index+1} source={{uri: item.newImageUrl}} />
          ))}
        </Carousel>
      </View>
  )
}

// export default class BannerRn extends React.Component<SearchProps, IsndexState> {
//   constructor(props: SearchProps) {
//     super(props);
//     this.state = {
//       // eslint-disable-next-line react/no-unused-state
//       bannerList: [],
//     };
//   }
//   componentDidMount() {
//     const data = {
//       type: 0,
//     };
    // Taro.request({
    //   url: "https://fast-learn.youbaobao.xyz:8001/banner?type=0",
    //   method: "GET",
    //   data,
    // }).then((params) => {
    //   params.data.banners.map((item) => {
    //     item.newImageUrl = 'https' + item.imageUrl.split('http')[1]
    //   })
    //   this.setState({
    //     // eslint-disable-next-line react/no-unused-state
    //     bannerList: params.data.banners,
    //   });
    // });
//   }

//   render() {
//     return (
      // <View className="banner" >
      //   <Carousel
      //     style={{ marginLeft:5,marginRight:5, height:160,flexGrow:1}}
      //     infinite
      //     autoplay
      //     dotActiveStyle={{
      //       background: 'rgba(222, 224, 230, 0.5)'
      //     }}
      //     dotStyle={{
      //       width: 20,
      //       height: 2,
      //       background: 'rgba(66, 80, 107, 0.5)',
      //     }}
      //   >
      //     {this.state.bannerList ? this.state.bannerList.map((item,index) => (
      //       <Image className="banner--image" key={index+1} source={{uri: item.newImageUrl}} />
      //     )) : ''}
      //   </Carousel>
      // </View>
//     );
//   }
// }
