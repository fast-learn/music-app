import { View, Image, Input } from '@tarojs/components';
import Taro from '@tarojs/taro';

import './index.scss';

let barHeight = 0;
let height: string = '120';
if (IS_RN) {
  const { getStatusBarHeight } = require('react-native-iphone-x-helper');
  barHeight = getStatusBarHeight() * 1.25;
  height = Taro.pxTransform(+height + barHeight);
} else {
  height = Taro.pxTransform(+height);
}

export default function SearchBar(props) {
  const {
    status = 'normal',
    isScrolling,
    searchWord,
    showKeyword,
    isSearchWordEmpty,
    onInput,
    onSearch,
    onClear,
  } = props;

  // 生成className
  function createClass(className) {
    return `${className}${IS_RN ? '' : ` ${className}--fixed`}${!isScrolling ? '' : ` ${className}--scrolling`}${status === 'normal' ? '' : ` ${className}--active`}`;
  }

  return (
    <>
      {!IS_RN && (
        <View
          className="search-bar--block"
          style={{ height }}
        />
      )}
      <View
        className={createClass('search-bar')}
        style={{
          height,
          paddingTop: barHeight,
          boxSizing: 'border-box',
        }}
      >
        {
          status === 'normal' ? (
            <>
              <Image src="https://fast-learn-oss.youbaobao.xyz/music/icon_menu.png" className="search-bar__icon" />
              <View className={`search-bar__input-bg${!isScrolling ? '' : ' search-bar__input-bg--scrolling'}`}>
                <Image
                  src="https://fast-learn-oss.youbaobao.xyz/music/icon_search_gray.png"
                  className="search-bar__input-bg__icon"
                />
                <View className="search-bar__input-bg__text">你的名字 最近很火哦</View>
              </View>
              <Image src="https://fast-learn-oss.youbaobao.xyz/music/icon_voice.png" className="search-bar__voice" />
            </>
          ) : (
            <>
              <View className={createClass('search-bar__input-bg')}>
                <Image
                  src="https://fast-learn-oss.youbaobao.xyz/music/icon_search_gray.png"
                  className="search-bar__input-bg__icon"
                />
                <Input
                  className="search-bar__input-bg__input"
                  placeholderClass="search-bar__input-bg__input__placeholder"
                  value={searchWord}
                  placeholder={showKeyword}
                  focus // 自动获得焦点
                  holdKeyboard // 点击时hold键盘
                  // @ts-ignore
                  clearButtonMode="while-editing" // RN环境下启动clear模式
                  confirmType="search" // 键盘显示搜索
                  onInput={onInput}
                  onConfirm={() => onSearch()}
                />
                {
                  !isSearchWordEmpty() && !IS_RN && (
                    <View
                      className="search-bar__input-bg__close"
                      onClick={onClear}
                    >
                      <Image
                        src="https://fast-learn-oss.youbaobao.xyz/music/icon_close_hover.png"
                        className="search-bar__input-bg__close__icon"
                      />
                    </View>
                  )
                }
              </View>
              <View className="search-bar__cancel-text">取消</View>
            </>
          )
        }
      </View>
    </>
  );
}
