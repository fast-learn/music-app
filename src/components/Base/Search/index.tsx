import * as React from "react";
import { View } from "@tarojs/components";
import { AtInput, AtIcon } from 'taro-ui';

import "./index.scss";

export interface SearchProps{}
export interface SearchState{
  value: string
}


export default class Index extends  React.Component<SearchProps,SearchState>  {
  constructor(props:SearchProps) {
    super(props)
    this.state = {
      value: ''
    }
  }

  handleChange =(value)=> {
    this.setState({
      value
    })
    return value
  };
  render() {
    return (
      <View className="search">
        <AtIcon  value="search" size="10" color="#f6f6f6" />
        <AtInput
          name="value"
          type="text"
          placeholder="大家都在搜 护花使者"
          value={this.state.value}
          onChange={this.handleChange}
        />
      </View>
    );
  }
}
