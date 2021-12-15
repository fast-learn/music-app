import React from 'react'
import { View, Image, Text } from '@tarojs/components';
// import  Icon from '@ant-design/react-native/lib/icon';
import SearchImg from '@/img/cvy.png'
import MenuImg from '@/img/dof.png'
import MicrophoneImg from '@/img/c402.png'

// dof
import './index.scss'

export interface SearchProps{}
export interface IsndexState{
  message: number
}

export default class SearchBar extends React.Component<SearchProps,IsndexState>   {

  constructor(props:SearchProps){
    super(props)
    this.state={
      message: 1
    }
  }

  render () {
    return (
      <View className='search'>
        {/* 菜单 */}
        <View className='mentIcon'>
          <View className='message'>{this.state.message}</View>
          <Image src={MenuImg} className='image menuImg' />
        </View>
        {/* 搜索 */}
        <View className='searchInput' >
          <Image src={SearchImg}   className='image' />
          <Text className='searchContent'>大家都在搜 护花使者</Text>
        </View>
        {/* 图标 */}
        <View className='seracrBae-video'>
          <Image src={MicrophoneImg}  className='image menuImg' />
        </View>
      </View>
    )
  }
}
