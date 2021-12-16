import React from 'react';
import { View, Image} from '@tarojs/components';
import {HomeCardProps} from './type';

import './index.scss';

import PlayImg from '@/img/play.png';
import moreImg from '@/img/more.png';
import huanImg from '@/img/huan.png';

export interface homeCardProps {}
export interface homeCardState {
  title: string,
  moreContent?: string,
  moreFlag?: boolean,
  changeBatchFlag?: boolean,
  HomeCardList: any,
}



export default class HomeCard extends React.Component<
HomeCardProps,homeCardState
>  {
  constructor(props:HomeCardProps){
    super(props)
    this.state = {
      title: props.title,
      moreContent: props.moreContent,
      moreFlag: props.moreFlag,
      HomeCardList: props.HomeCardList,
      changeBatchFlag: props.changeBatchFlag

    }
  }
  // 解决的问题：子组件的render中获取不到父组件异步请求的值
  componentWillReceiveProps(nextProps){
    this.setState({
      HomeCardList: nextProps.HomeCardList
    })
  }

  render () {
    return (
      <View className="home-card">
        <View className="home-card__top">
          <View className="home-card__top--left">{this.state.title}</View>
          {this.state.changeBatchFlag ?
            <View className="home-card__top--right">
              <Image  className="home-card__top--right--image" src={huanImg} />
              <View className="home-card__top--right--center">{this.state.moreContent}</View>
            </View>: ''}
            {this.state.moreFlag ?
            <View className="home-card__top--right home-card__top--te">
              <View className="home-card__top--right--center">{this.state.moreContent}</View>
              <Image  className="home-card__top--right--image" src={moreImg} />
            </View>: ''}
          </View>
          {/* 滚动条处理 */}
          <View className="home-card__bottom">
          <View className="home-card__bottom__scroll">
        {
        this.state.HomeCardList?  this.state.HomeCardList.map((item) =>
          <View key={item.id ? item.id : item.creativeId} className="home-card__bottom__scroll--center">
            <Image className="home-card__bottom__scroll--center--image"  src={item.picUrl ? item.picUrl: (item.resources ? item.resources[0].uiElement.image.imageUrl: '')}  />
            <View className="home-card__bottom__scroll--center--play">
              <Image className="home-card__bottom__scroll--center--play--image" src={PlayImg} />
              <View className="home-card__bottom__scroll--center--play--playCount">{item.playCount? item.playCount: (item.resources? item.resources[0].resourceExtInfo.playCount: '')}</View>
            </View>
            <View className="home-card__bottom__scroll--center--name">{item.name ? item.name :  item.resources[0].uiElement.mainTitle.title}</View>
          </View>
          )
        : ''}
        </View>
          </View>
      </View>
    )
  }
}
