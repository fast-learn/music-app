import * as React from "react";
import { View, Image } from '@tarojs/components';
import { AtInput, AtIcon } from 'taro-ui'

import MenuIng from '../../../assert/img/menu.png'
import MicrophoneImg from '../../../assert/img/Microphone.png'
import "./index.scss";

export interface SearchProps{}
export interface IsndexState{
  value: string,
  message: number
}


export default class SearchBar extends  React.Component<SearchProps,IsndexState>  {
  constructor(props:SearchProps) {
    super(props)
    this.state = {
      value: '',
      message: 1
    }
  }

  handleChange (value) {
    this.setState({
      value
    })
    return value
  };
  render() {
    return (
      <View className='search'>
        {/* 菜单 */}
        <View className='mentIcon'>
          <View className='message'>{this.state.message}</View>
          {/* <AtIcon  value='menu'  color='f6f6f6' /> */}
          <Image  className='mentIcon-image' src={MenuIng} />
        </View>
        {/* 搜索 */}
        <View className='searchInput' >
          <AtIcon  value='search'  color='f6f6f6' />
          <AtInput
            name='value'
            type='text'
            placeholder='大家都在搜 护花使者'
            value={this.state.value}
            onChange={this.handleChange.bind(this)}
          />
        </View>
        {/* 图标 */}
        <View className='seracrBae-video'>
        {/* <AtIcon  value='video'  color='f6f6f6' /> */}
          {/* <img src={img} alt='' />
          <img src={img2} alt='' /> */}
          <Image className='mentIcon-image'  src={MicrophoneImg} />
        </View>
      </View>
    );
  }
}
