import { Component } from 'react'
import Taro from '@tarojs/taro'
import { View} from '@tarojs/components'
import HomeCard from '../../base/HomeCard'

import './index.scss'


export interface RecommendedProps {}
export interface RecommendedState {
  RecommendVideoList: any;
}


export default class RecommendVideo extends Component<RecommendedProps,RecommendedState> {
  constructor(props:RecommendedProps){
    super(props)
    this.state ={
      RecommendVideoList:[]
    }
  }

  componentDidMount(){
    Taro.request({
      url: 'https://fast-learn.youbaobao.xyz:8001/personalized/mv',
      method:'GET'
    }).then((params) => {
      this.setState({
        RecommendVideoList: params.data.result
      })
    })
  }
  render () {
    return (
      <View className='recommendVideo'>
        <HomeCard
          title='精选音乐视频'
          moreContent='换一批'
          HomeCardList={this.state.RecommendVideoList}
          changeBatchFlag
        />
      </View>
    )
  }
}
