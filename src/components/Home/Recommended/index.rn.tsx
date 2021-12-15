import React from 'react'
import Taro from '@tarojs/taro'
import { View} from 'react-native'
import HomeCard from '@/components/base/HomeCard'
import './index.scss'


export interface RecommendedProps {}
export interface RecommendedState {
  homeCardList: any;
}


export default class Recommended extends React.Component<
RecommendedProps,
RecommendedState
>  {
  constructor(props:RecommendedProps){
    super(props)
    this.state = {
      // eslint-disable-next-line react/no-unused-state
      homeCardList: []
    }
  }

  componentDidMount(){
    Taro.request({
      url: 'https://fast-learn.youbaobao.xyz:8001/personalized',
      method: 'GET',
      data: {
        limit: 6
      }
    }).then((params) => {
      this.setState({
        // eslint-disable-next-line react/no-unused-state
        homeCardList: params.data.result
      })
    })
  }
  render () {
    return (
      <View className='recommended'>
        <HomeCard
          title='推荐歌单'
          moreContent='更多'
          HomeCardList={this.state.homeCardList}
          moreFlag
        />
      </View>
    )
  }
}
