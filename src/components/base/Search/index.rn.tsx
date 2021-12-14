
import { FunctionComponent } from "react";
import SearchBar from "@ant-design/react-native/lib/search-bar";

import { ComponentOptions } from "@tarojs/taro";
import  '@ant-design/icons-react-native/fonts/antfill.ttf'
import  '@ant-design/icons-react-native/fonts/antoutline.ttf'


import "./index.scss";

import { TaroSearchProps } from "./type";


const TaroModal: FunctionComponent<TaroSearchProps> & {
  options?: ComponentOptions;
} = () => {
  const onSearch = (value) => console.log(value);

  return (
    <SearchBar
      placeholder='大家都在搜 护花使者'
      onSearch={onSearch}
      enterButton
    > </SearchBar>
  );
};

TaroModal.options = {
  addGlobalClass: true,
};

export default TaroModal;
