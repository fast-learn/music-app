import React from 'react'
import { View, Image} from '@tarojs/components'
import {HomeCardProps} from './type'

import './index.scss'

import PlayImg from '../../../assert/img/play.png'
import moreImg from '../../../assert/img/more.png'
import huanImg from '../../../assert/img/huan.png'

export interface RecommendedProps {}
export interface RecommendedState {
  title: string,
  moreContent?: string,
  moreFlag?: boolean,
  changeBatchFlag?: boolean,
  HomeCardList: any,
}



export default class Recommended extends React.Component<
HomeCardProps,RecommendedState
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
      <View className='recommended'>
        <View className='recommended-top'>
          <View className='recommended-top-left'>{this.state.title}</View>
          {this.state.changeBatchFlag ?
            <View className='recommended-top-right'>
              <Image  className='recommended-top-right-image' src={huanImg} />
              <View className='recommended-top-right-center'>{this.state.moreContent}</View>
            </View>: ''}
            {this.state.moreFlag ?
            <View className='recommended-top-right te'>
              <View className='recommended-top-right-center'>{this.state.moreContent}</View>
              <Image  className='recommended-top-right-image' src={moreImg} />
            </View>: ''}
          </View>
        <View className='recommended-bottom'>
        {
          this.state.HomeCardList.map((item) =>
          <View key={item.id ? item.id : item.creativeId} className='category-center'>
            <Image className='category-center-image'  src={item.picUrl ? item.picUrl: (item.resources ? item.resources[0].uiElement.image.imageUrl: '')}  />
            <View className='category-center-play'>
              <Image className='category-center-play-image' src={PlayImg} />
              <View className='category-center-play-playCount'>{item.playCount? item.playCount: (item.resources? item.resources[0].resourceExtInfo.playCount: '')}</View>
            </View>
            <View className='category-center-name'>{item.name ? item.name :  item.resources[0].uiElement.mainTitle.title}</View>
          </View>
          )
        }
        </View>
      </View>
    )
  }
}
