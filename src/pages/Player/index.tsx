import { View,Image } from "@tarojs/components";

import Demo from '@/img/p.png'

import './index.scss'

export default function Palyer() {
  return (
    <View className="player">
      <View className="playe__top">
        <View className="player__top__top">
          {/* <View className="player__top__top__left"> */}
          {/* 点击隐藏该页面，动画效果 */}
            <Image src={Demo}  className="player__top__top__left" />
          {/* </View> */}
          <View className="player__top__top__conter">
            <View className="player__top__top__conter__main">
              王娅-半吨兄弟-爱情错觉
              {/* 字幕滚动效果 */}
            </View>
            <View className="player__top__top__conter__vice">
              <View className="player__top__top__conter__vice__message">
                筷子兄弟
              </View>
              <View className="player__top__top__conter__vice__add">
                <Image src={Demo}  className="player__top__top__conter__vice__add__image" />
              </View>
            </View>
          </View>
          <View className="player__top__top__right">
            {/* <View className="player__top__top__right__cover"></View> */}
            <Image src={Demo}  className="player__top__top__right__cover" />
            {/*  头像涟漪效果 */}
            {/* <View className="player__top__top__right__share"></View> */}
            <Image src={Demo}  className="player__top__top__right__share" />
          </View>
        </View>
        {/* 音量添加减少效果 */}
        <View className="player__top__bottom">
          {/* <View className="player__top__bottom__volume"></View> */}
          <Image src={Demo}  className="player__top__bottom__volume" />
          <View className="player__top__bottom__progress"></View>
          {/* <View className="player__top__bottom__radar"></View> */}
          <Image src={Demo}  className="player__top__bottom__radar" />

        </View>
      </View>
      {/* 播放页面头部开发 */}
      {/* 歌词滚动效果、拖动歌词会跟着进行播放，拖动时会有线条和时间显示 */}
      <View className="player__conter">滚动歌词</View>

      {/* 播放组件底部开发 --> 抽离成组件 */}
      <View className="player__bottom">
        <View className="player__bottom__top">
          <View className="player__bottom__top__left">
          {/* <View className="player__bottom__top__left__play"></View> */}
          <Image src={Demo}  className="player__bottom__top__left__play" />
          {/* <View className="player__bottom__top__left__stars"></View> */}
          <Image src={Demo}  className="player__bottom__top__left__stars" />
          </View>
          <View className="player__bottom__top__right">
          {/* <View className="player__bottom__top__right__sing"></View> */}
          <Image src={Demo}  className="player__bottom__top__right__sing" />
          {/* <View className="player__bottom__top__right__more"></View> */}
          <Image src={Demo}  className="player__bottom__top__right__more" />
          </View>
        </View>
        <View className="player__bottom__conter">
          {/* 播放时间的移动 */}
        <View className="player__bottom__conter__start_time">00:00</View>
        {/* <View className="player__bottom__conter__progress"></View> */}
        <Image src={Demo}  className="player__bottom__conter__progress" />
        <View className="player__bottom__conter__end_time">02:34</View>
        </View>
        <View className="player__bottom__bottom">
          {/* <View className="player__bottom__bottom__play-order"></View> */}
          {/* 顺序切换 */}
          <Image src={Demo}  className="player__bottom__bottom__play-order" />
          {/* <View className="player__bottom__bottom__last-song"></View> */}
          <Image src={Demo}  className="player__bottom__bottom__last-song" />
          {/* <View className="player__bottom__bottom__play"></View> */}
          <Image src={Demo}  className="player__bottom__bottom__play" />
          {/* <View className="player__bottom__bottom__nest-song"></View> */}
          <Image src={Demo}  className="player__bottom__bottom__nest-song" />
          {/* <View className="player__bottom__bottom__play-list"></View> */}
          <Image src={Demo}  className="player__bottom__bottom__play-list" />
        </View>
      </View>
    </View>
  );
}
