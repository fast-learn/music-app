
import { View,Image, Slider } from "@tarojs/components"
import { useState } from "react"
import bottomImg from '@/img/bottom.png'
import coverImg from '@/img/cover.png'
import fengxiangImg from '@/img/fenxiang.png'
import volumeImg from '@/img/volume.png'
import readerImg from '@/img/reader.png'
import addImg from '@/img/add.png'

import './index.scss'
import Taro from '@tarojs/taro';

export default function Song(){
  const [sliderData,setSliderData] = useState(20)
  const slideScroll = (data)=>{
    setSliderData(data.detail.value)
  }
  return(
    <View className="player__top">
        <View className="player__top__top">
          {/* <View className="player__top__top__left"> */}
          {/* 点击隐藏该页面，动画效果 */}
            <Image src={bottomImg}  className="player__top__top__left" />
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
                <Image src={addImg}  className="player__top__top__conter__vice__add__image"  style={{top:IS_RN && Taro.pxTransform(-9)}} />
              </View>
            </View>
          </View>
          <View className="player__top__top__right">
            <Image src={coverImg}  className="player__top__top__right__cover" />
            {/*  头像涟漪效果 */}
            <Image src={fengxiangImg}  className="player__top__top__right__share" />
          </View>
        </View>
        {/* 音量添加减少效果 */}
        <View className="player__top__bottom">
          <Image src={volumeImg}  className="player__top__bottom__volume" />
          <View className="player__top__bottom__progress">
            <Slider  step={1} value={sliderData}  backgroundColor="rgba(255,255,255,0.2)" activeColor="rgba(255,255,255,0.5)" blockSize={12}   className="player__top__bottom__progress__slider" onChange={slideScroll} />
          </View>
          <Image src={readerImg}  className="player__top__bottom__radar" />
        </View>
      </View>
  )
}