import * as React from "react";
import { View, Image, Swiper, SwiperItem } from "@tarojs/components";
import huanImg from '../../../assert/img/huan.png'
import PlayTImg from '../../../assert/img/play_fill1.png'
import PlayLImg from '../../../assert/img/play_fill.png'
import PlayRImg from '../../../assert/img/paly2.png'
import { HomeSwiperProps } from './type'

import "./index.scss";

export interface SearchProps { }
export interface SearchState {
  musicList: any,
  title: string
}

export default class HomeSwiper extends React.Component<
  SearchProps,
  SearchState
> {
  constructor(props: HomeSwiperProps) {
    super(props);
    this.state = {
      // eslint-disable-next-line react/no-unused-state
      musicList: [],
      title: props.title
    };
  }
  componentWillReceiveProps(nextProps) {
    function group(array, subGroupLength) {
      let index = 0;
      let newArray = [];
      while(index < array.length) {
          newArray.push(array.slice(index, index += subGroupLength));
      }
      return newArray;
  }
    this.setState({
      musicList: group(nextProps.musicList,3)
    })
  }
  render() {
    return (
      <View className='homeSwiper'>
        <View className='homeSwiper-top'>
          <View className='homeSwiper-top-left'>
            <Image src={huanImg} className='homeSwiper-top-left-img' />
            <View className='homeSwiper-top-left-content'>{this.state.title}</View>
          </View>
          <View className='homeSwiper-top-right'>
            <Image src={PlayTImg} className='homeSwiper-top-right-img' />
            <View className='homeSwiper-top-right-content'>播放</View>
          </View>
        </View>
        <View className='homeSwiper-bottom'>
          <Swiper
            current={1}
          >
            {this.state.musicList ? this.state.musicList.map((item, index) =>
              <SwiperItem key={index+1} className='homeSwiper-buttom-swiper' >
                {item.map((item2) =>
                  <View className='homeSwiper-buttom-swipe-content' key={item2.id ?item2.id :item2.creativeId}>
                    <View className='homeSwiper-buttom-swipe-content-left'>
                      <Image className='homeSwiper-buttom-swipe-content-left-image-te' src={PlayLImg} />
                      <Image className='homeSwiper-buttom-swipe-content-left-image' src={item2.picUrl?item2.picUrl:item2.uiElement.image.imageUrl} />
                    </View>
                    <View className='homeSwiper-buttom-swipe-content-center'>
                      <View className='homeSwiper-buttom-swipe-content-center-top'>
                        <View className='homeSwiper-buttom-swipe-content-center-top-top'>{item2.name?item2.name :item2.uiElement.labelTexts[0]}</View>
                        <View className='homeSwiper-buttom-swipe-content-center-top-bottom'>{item2.name ? '- '+ item2.name  : '-' + item2.uiElement.mainTitle.title }</View>
                      </View>
                      <View className='homeSwiper-buttom-swipe-content-center-bottom'>{item2.name ? item2.name  : item2.uiElement.mainTitle.title}</View>
                    </View>
                    <Image className='homeSwiper-buttom-swipe-content-right' src={PlayRImg} />
                  </View>
                )}
              </SwiperItem>
            ): ''}
          </Swiper>


          {/* <Swiper
          current={1}
        >
          <SwiperItem key={1} className='homeSwiper-buttom-swiper' >
            <View className='homeSwiper-buttom-swipe-content'>
              <View className='homeSwiper-buttom-swipe-content-left'>
                <Image className='homeSwiper-buttom-swipe-content-left-image-te' src={PlayLImg} />
                <Image className='homeSwiper-buttom-swipe-content-left--image' src={PlayTImg} />
              </View>
              <View className='homeSwiper-buttom-swipe-content-center'>
              <View className='homeSwiper-buttom-swipe-content-center-top'>
                <View className='homeSwiper-buttom-swipe-content-center-top-top'>主标题</View>
                <View className='homeSwiper-buttom-swipe-content-center-top-bottom'>副标题</View>
              </View>
              <View className='homeSwiper-buttom-swipe-content-center-bottom'>小标题</View>
              </View>
              <Image  className='homeSwiper-buttom-swipe-content-right' src={PlayRImg} />
            </View>
          </SwiperItem>
          <SwiperItem key={2}>
            111
          </SwiperItem>
          <SwiperItem key={3}>
            111222
          </SwiperItem>
          </Swiper> */}
        </View>
      </View>
    );
  }
}
