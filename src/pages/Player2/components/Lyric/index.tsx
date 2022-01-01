import { View, ScrollView } from '@tarojs/components';
import { useSelector } from 'react-redux';
import { useEffect, useState, useRef } from 'react';
import Taro, { getCurrentInstance } from '@tarojs/taro';

import { get } from '@/services';
import lyricParser from '@/utils/lyric';
// import demoImg from "@/img/add.png";

import './index.scss';

export default function Lyric(props) {
  // @ts-ignore
  const isScroll = props.isScroll;// 是否滚动
  const [scrollTime, setScrollTime] = useState(0); // 计时器
  let [scrollTop, setScrollTop] = useState(0); // 滚动高度
  // const lyricId = props.lyricId // 记录歌曲ID
  const [lyricsContent, setLyricsContent] = useState(0); // 当前播放位置
  const songDuration = props.songDuration;
  // const [scrollFlag, setScrollFlag] = useState(true)
  const { songListIndex, songList } = useSelector((state: any) => state.player);
  const [lyricData, setLyricData] = useState([]); // 歌词数组
  // const [scrollLength,setScrollLength] = useState(0)
  const scrollRef = useRef(null);
  const lyricRef = useRef(null);
  // const query = Taro.createSelectorQuery().in(getCurrentInstance().page)
  // @ts-ignore
  const { page } = getCurrentInstance();


  useEffect(() => {
    get(`lyric?id=${songList[songListIndex ? songListIndex : 0].id}`).then((params) => {
      if (params.data.lrc && params.data.lrc.lyric) {
        setLyricData(lyricParser(params.data.lrc.lyric));
      }
    });
    // }
    // 清除计时器和高度 （定时器的清除有问题、子组件的useEffect先执行，有些数据没有获取到）
    if (scrollTop >= 0 && scrollTime) {
      clearInterval(scrollTime);
      setScrollTime(0);
      setScrollTop(0);
    }
  }, [songListIndex]);
  useEffect(() => {
    if (props.isScroll) {
      // setScrollTime(IS_WEAPP && setInterval(() => {
      //   setScrollTop(scrollTop+= 0.035 )
      // // },(scrollRef.current ? scrollRef.current.offsetTop : 10) / songDuration ))
      // },songDuration / songDuration ))
      // H5 需要使用window.setInterval
      setScrollTime(IS_RN && setInterval(() => {
        setScrollTop(scrollTop += 0.035);
        // },(scrollRef.current ? scrollRef.current.offsetTop : 10) / songDuration ))
      }, songDuration / songDuration));
      // 播放进度 = 当前时长 / 总时长
    } else {
      clearInterval(scrollTime);
      setScrollTime(0);
    }
  }, [props.isScroll]);

  useEffect(() => {
    if (props.lyricsContent) {
      setLyricsContent(props.lyricsContent);
    }
    if (props.lyricsContent === songDuration) {
      clearInterval(scrollTime);
      setScrollTime(0);
      setScrollTop(0);
    }
  }, [props.lyricsContent]);
  // 将mm:ss格式转为秒数
  const formatTimeTos = (data) => {
    if (!data) return 0;
    let m;
    let s;
    const newdata = data.split(':');
    newdata.map(() => {
      m = newdata[0].replace(/\b(0)/gi, '') ? newdata[0].replace(/\b(0)/gi, '') * 60 : 0;
      s = newdata[1] * 1;
    });
    return m + s;
  };
  // const handleScroll = (data) => {
  //   setScrollFlag(true)
  //   console.log(Taro.createSelectorQuery())
  //   // console.log(data.detail,1)
  //   // console.log(data.detail.scrollTop,12)
  //   // scrollHeight 元素总高度
  //   // console.log(scrollRef,22)
  //   // setScrollTop(0)
  //   // offsetTop : 0 :2183
  // //   // offsetHeight  : 526
  // //   lyricData.map((item:any) => {
  // //   if(data.detail.scrollTop >= 100 ){
  // //     console.log(11)
  // //     item.moveFlag = true
  // //   }
  // // })
  // // setLyricData(lyricData)
  // }
  // const handleScrollStart = (data)=>{
  //   // console.log(data,'开始拖动')
  //   // console.log(data.target.innerHTML,90)
  //   lyricData.map((item:any) => {
  //     if(item.content == data.target.innerHTML){
  //       item.moveFlag = true
  //     }
  //   })
  //   setLyricData(lyricData)
  // }
  // const handleTouchend = () => {
  //   console.log('触屏事件')
  //   // 解除之后还原 lyricData中的moveFlag
  // }
  // const handleMove = (data) =>{
  //   console.log(data,'拖动中')
  //   setScrollFlag(true)
  // }
  // const handleEnd = (data) =>{
  //   console.log(data,'结束')
  //   setScrollFlag(false)
  // }
  // const handleScroll = (data) => {
  //   console.log(data,988)
  // }
  // 获取元素尺寸信息
  // useEffect((params) => {
  //   console.log(lyricRef,12)
  // },[])
  if (lyricData && lyricData.length > 0) {
    return (
      <View className="lyric" ref={lyricRef}>
        <ScrollView
          scrollY
          className="lyric__scroll"
          scrollTop={scrollTop}
          style={{ height: IS_RN && Taro.pxTransform(800), paddingTop: IS_WEAPP && 0, paddingBottom: IS_WEAPP && 0 }}
          // onTouchMove={handleMove}
          // onTouchEnd={handleEnd}
          // onTouchStart={handleScrollStart}
          // onScroll={handleScroll}
          // ref={scrollRef}
        >
          {lyricData.map((item: any, index) => (
            <View
              key={index}
              ref={scrollRef}
              // onTouchEnd={handleTouchend}
              // onTouchStart={handleScrollStart}
              className={`${((formatTimeTos(item.time) -
                +(lyricsContent.toFixed(2)) <= 0.3) ? 'lyric__scroll__Highlight' : 'lyric__scroll__content')}`}
            >
              {item.content}</View>
          ))}
        </ScrollView>
        {/* {scrollFlag ?
      <View className="lyric__division">
        <Image  className="lyric__division__left" src={demoImg} />
        <View className="lyric__division__conter"></View>
        <View className="lyric__division__right">00:32</View>
      </View>
      : ''} */}
      </View>
    );
  }
  return <View>暂无歌词</View>;
}
