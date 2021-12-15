import * as React from "react";
import {View, Image, Text} from '@tarojs/components';
import { AtInput, AtIcon } from 'taro-ui';

import MenuIng from '@/img/menu.png'
import MicrophoneImg from '@/img/microphone.png'
import "./index.scss";

export interface SearchProps {
  status: string, // 搜索框状态：normal-正常，active-可交互
}

export interface IsndexState {
  value: string,
  message: number,
}

export default class SearchBar extends React.Component<SearchProps, IsndexState> {
  constructor(props: SearchProps) {
    super(props)
    this.state = {
      value: '',
      message: 1,
    }
  }

  handleChange(value) {
    this.setState({
      value
    })
    return value
  }

  render() {
    const {status} = this.props;
    return status === 'normal' ? (
      <View className="search">
        {/* 菜单 */}
        <View className="mentIcon">
          <View className="message">{this.state.message}</View>
          {/* <AtIcon  value='menu'  color='f6f6f6' /> */}
          <Image className="mentIcon-image" src={MenuIng} />
        </View>
        {/* 搜索 */}
        <View className="searchInput">
          <AtIcon value="search" color="f6f6f6" />
          <AtInput
            name="value"
            type="text"
            placeholder="大家都在搜 护花使者"
            value={this.state.value}
            onChange={this.handleChange.bind(this)}
          />
        </View>
        {/* 图标 */}
        <View className="seracrBae-video">
          {/* <AtIcon  value='video'  color='f6f6f6' /> */}
          {/* <img src={img} alt='' />
          <img src={img2} alt='' /> */}
          <Image className="mentIcon-image" src={MicrophoneImg} />
        </View>
      </View>
    ) : (
      <View className="search search__active">
        <View className="searchInput search__input__active">
          <AtIcon value="search" color="#aaa" />
          <AtInput
            name="value"
            type="text"
            placeholder="大家都在搜 护花使者"
            value={this.state.value}
            onChange={this.handleChange.bind(this)}
          />
        </View>
        <Text className="search__cancel-text">取消</Text>
      </View>
    );
  }
}
