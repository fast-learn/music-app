import React from 'react'
import { View} from '@tarojs/components'
import HomeCard from '../../base/HomeCard'


import './index.scss'


export interface VideoCollectionProps {
  videoCollectionList: any;
}

export interface VideoCollectionState {
  videoCollectionList: any;
}
export default class VideoCollection extends React.Component<VideoCollectionProps,VideoCollectionState> {
  constructor(props:VideoCollectionProps){
    super(props)
    this.state ={
      videoCollectionList:''
    }
  }
  componentWillReceiveProps(nextProps){
    this.setState({
      videoCollectionList: nextProps.videoCollectionList
    })
  }
  render () {
    return (
      <View className='videoCollection'>
        <HomeCard
          title='视频合辑'
          moreContent='更多'
          moreFlag
          HomeCardList={this.state.videoCollectionList}
        />
      </View>
    )
  }
}
