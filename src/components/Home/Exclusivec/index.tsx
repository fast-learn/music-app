import React from 'react'
import { View} from '@tarojs/components'
import HomeCard from '../../base/HomeCard';


import './index.scss'

// 推荐新音乐 https://fast-learn.youbaobao.xyz:8001/personalized/newsong?limit=12

export interface ExclusivecProps {
  exclusivecList: any
}

export interface ExclusivecState {
  exclusivecList: any;
}
export default class Radar extends React.Component<ExclusivecProps,ExclusivecState> {
  constructor(props:ExclusivecProps){
    super(props)
    this.state ={
      exclusivecList:props.exclusivecList
    }
  }
  componentWillReceiveProps(nextProps){
    this.setState({
      exclusivecList: nextProps.exclusivecList
    })
  }
  render () {
    return (
      <View className='exclusivec'>
        <HomeCard
          title='专属场景歌单'
          moreContent='更多'
          moreFlag
          HomeCardList={this.state.exclusivecList}
        />
      </View>
    )
  }
}
