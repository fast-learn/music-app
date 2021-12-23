import React from 'react';
import Taro from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components';
import {NavigationActions} from 'react-native';
// import  Icon from '@ant-design/react-native/lib/icon';
import SearchImg from '@/img/cvy.png';
import MenuImg from '@/img/dof.png';
import MicrophoneImg from '@/img/c402.png';

// dof
import './index.scss';

export interface SearchProps{}
export interface IsndexState{
  message: number,
  value: string
}

export default class SearchBar extends React.Component<SearchProps,IsndexState>   {

  constructor(props:SearchProps){
    super(props)
    this.state={
      message: 1,
      value:''
    }
  }
  componentDidMount(){
    // 默认搜索关键词
    Taro.request({
      url:'https://fast-learn.youbaobao.xyz:8001/search/default',
      method: 'GET'
    }).then((params) => {
      this.setState({
        value: params.data.data.realkeyword
      })
    })
  }
  handleJumpSearch = ()=>{
    Taro.navigateTo({
      url: '/pages/Search/index'
    })
  }

  render () {
    return (
      <View className="search">
        {/* 菜单 */}
        <View className="search__menu-icon">
          <View className="search__menu-icon--message">{this.state.message}</View>
          <Image src={MenuImg} className="search__menu-icon--image search__menu-icon--menu-img" />
        </View>
        {/* 搜索 */}
        <View className="search__search-input" onClick={this.handleJumpSearch}>
          <Image src={SearchImg}   className="search__search-input--image" />
          <Text className="search__search-input--search-content">{`大家都在搜 ${this.state.value}`} </Text>
        </View>
        {/* 图标 */}
        <View className="search__video-icon">
          <Image src={MicrophoneImg}  className="search__video--image search__menu-icon--menu-img" />
        </View>
      </View>
    )
  }
}
