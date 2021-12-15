import React from 'react'
import { View} from '@tarojs/components'
import HomeCard from '../../base/HomeCard';


import './index.scss'

// 推荐新音乐 https://fast-learn.youbaobao.xyz:8001/personalized/newsong?limit=12

export interface RadarProps {
  radarList: any
}

export interface RadarState {
  radarList: any;
}
export default class Radar extends React.Component<RadarProps,RadarState> {
  constructor(props:RadarProps){
    super(props)
    this.state ={
      radarList:props.radarList
    }
  }
  componentWillReceiveProps(nextProps){
    this.setState({
      radarList: nextProps.radarList
    })
  }
  render () {
    return (
      <View className='radar'>
        <HomeCard
          title='雷达歌单'
          moreContent='更多'
          moreFlag
          HomeCardList={this.state.radarList}
        />
      </View>
    )
  }
}
