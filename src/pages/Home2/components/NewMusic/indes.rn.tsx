import React from 'react';
import Taro from '@tarojs/taro';
import { View} from '@tarojs/components';
import HomeSwiper from '@/components/Base/HomeSwiper';


import './index.scss';


export interface NewMusicProps {}

export interface NewMusicState {
  musicList: any;
}
export default class NewMusic extends React.Component<NewMusicProps,NewMusicState> {
  constructor(props:NewMusicProps){
    super(props)
    this.state ={
      musicList:''
    }
  }

  componentDidMount(){
    Taro.request({
      url: 'https://fast-learn.youbaobao.xyz:8001/personalized/newsong',
      method: 'GET',
      data: {
        limit: 12
      }
    }).then((params) => {
      this.setState({
        musicList: params.data.result
      })
    })
  }
  render () {
    return (
      <View className="newMusic">
        <HomeSwiper
          title="听过最爱的华语音乐"
          homeSwiperList={this.state.musicList}
        />
      </View>
    )
  }
}
