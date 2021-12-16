import * as React from 'react';
import { View, Image, Text } from '@tarojs/components';
import { AtInput, AtIcon } from 'taro-ui';

import MenuIng from '@/img/menu.png';
import MicrophoneImg from '@/img/microphone.png';
import './index.scss';
import Taro from '@tarojs/taro';

export interface SearchProps {
  status: string, // 搜索框状态：normal-正常，active-可交互
}

export interface IsndexState {
  value: string,
  message: number,
}

export default class SearchBar extends React.Component<SearchProps, IsndexState> {
  constructor(props: SearchProps) {
    super(props);
    this.state = {
      value: '',
      message: 1,
    };
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
  handleChange = (value) => {
    this.setState({
      value,
    });
    return value;
  }
  handleJumpSearch = ()=>{
    Taro.navigateTo({
      url:'/pages/Search/index'
    })
  }

  handleJumpHome = ()=>{
    Taro.navigateTo({
      url:'/pages/Home/index'
    })
  }

  render() {
    const { status } = this.props;
    return status === 'normal' ? (
      <View className="search">
        {/* 菜单 */}
        <View className="search__menu-icon">
          <View className="search__menu-icon--message">{this.state.message}</View>
          <Image className="search__menu-icon--image search__menu-icon--menu-img" src={MenuIng} />
        </View>
        {/* 搜索 */}
        <View className="search__search-input" onClick={this.handleJumpSearch}>
          <AtIcon value="search" color="#f6f6f6" />
          <AtInput
            name="value"
            type="text"
            placeholder="大家都在搜 护花使者"
            value={`大家都在搜 ${this.state.value}`}
            onChange={this.handleChange}
          />
        </View>
        {/* 图标 */}
        <View className="search__video-icon">
          <Image className="search__video-icon--image search__menu-icon--menu-img" src={MicrophoneImg} />
        </View>
      </View>
    ) : (
      <View className="search search--active" >
        <View className="search__search-input search__input--active" onClick={this.handleJumpSearch}>
          <AtIcon value="search" color="#aaa" />
          <AtInput
            name="value"
            type="text"
            placeholder="大家都在搜 护花使者"
            value={this.state.value}
            onChange={this.handleChange}
          />
        </View>
        <Text className="search__cancel-text" onClick={this.handleJumpHome}>取消</Text>
      </View>
    );
  }
}
