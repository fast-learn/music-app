import * as React from 'react';
import { View, Image, Swiper, SwiperItem } from '@tarojs/components';
import huanImg from '@/img/huan.png';
import PlayTImg from '@/img/play_fill1.png';
import PlayLImg from '@/img/play_fill.png';
import PlayRImg from '@/img/paly2.png';
import { HomeSwiperProps } from './type';

import "./index.scss";

export interface HomeSwiperState {
  homeSwiperList: any,
  title: string
}

export default class HomeSwiper extends React.Component<
HomeSwiperProps,
HomeSwiperState
> {
  constructor(props: HomeSwiperProps) {
    super(props);
    this.state = {
      homeSwiperList: [],
      title: props.title
    };
  }
  componentWillReceiveProps(nextProps) {
    function group(array, subGroupLength) {
      let index = 0;
      let newArray:any = [];
      while (index < array.length) {
        newArray.push(array.slice(index, index += subGroupLength));
      }
      return newArray;
    }
    if(nextProps.homeSwiperList && nextProps.homeSwiperList.length> 0){
      this.setState({
        homeSwiperList: group(nextProps.homeSwiperList, 3)
      })
    }
  }
  render() {
    return (
      <View className="home-swiper">
        <View className="home-swiper__top">
          <View className="home-swiper__top--left">
            <Image src={huanImg} className="home-swiper__top--left--img" />
            <View className="home-swiper__top--left--content">{this.state.title}</View>
          </View>
          <View className="home-swiper__top--right">
            <Image src={PlayTImg} className="home-swiper__top--right--img" />
            <View className="home-swiper__top--right--content">播放</View>
          </View>
        </View>
        <View className="home-swiper__bottom">
          <Swiper
            current={0}
            className="swiper"
          >
            {this.state.homeSwiperList ? this.state.homeSwiperList.map((item, index) =>
              <SwiperItem key={index + 1} className="home-swiper__bottom__swiper" >
                {item.map((item2) =>
                  <View className="home-swiper__bottom__swiper--content" key={item2.id ? item2.id : item2.creativeId}>
                    <View className="home-swiper__bottom__swiper--content--left">
                      <Image className="home-swiper__bottom__swiper--content--left--image-te" src={PlayLImg} />
                      <Image className="home-swiper__bottom__swiper--content--left--image" src={item2.picUrl ? item2.picUrl : item2.uiElement.image.imageUrl} />
                    </View>
                    <View className="home-swiper__bottom__swiper--content--border">
                      <View className="home-swiper__bottom__swiper--content--border--center">
                        <View className="home-swiper__bottom__swiper--content--border--center--top">
                          <View className="home-swiper__bottom__swiper--content--border--center--top--top">{item2.name ? item2.name : item2.uiElement.labelTexts[0]}</View>
                          <View className="home-swiper__bottom__swiper--content--border--center--top--bottom">{item2.name ? '- ' + item2.name : '-' + item2.uiElement.mainTitle.title}</View>
                        </View>
                        <View className="home-swiper__bottom__swiper--content--border--center--bottom">{item2.name ? item2.name : item2.uiElement.mainTitle.title}</View>
                      </View>
                      <Image className="home-swiper__bottom__swiper--content--right" src={PlayRImg} />
                    </View>
                  </View>
                )}
              </SwiperItem>
            ) : ''}
          </Swiper>
        </View>
      </View>
    );
  }
}
