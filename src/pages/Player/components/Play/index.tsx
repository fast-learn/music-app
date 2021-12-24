import { View,Image,Slider } from "@tarojs/components";
import Taro from '@tarojs/taro'
import {useState,useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'

import play1Img from '@/img/play1.png'
import starsImg from '@/img/stars.png'
import singImg from '@/img/sing.png'
import moreImg from '@/img/more2.png'
import xunhuanImg from '@/img/xunhuan.png'
import nextImg from '@/img/next.png'
import proImg from '@/img/pro.png'
import playImg from '@/img/bofang-4.png'
import ListImg from '@/img/list.png'
import playingImg from '@/img/palying.png'
import suijiImg from '@/img/suiji.png'
import xunhuan1Img from '@/img/xunhuan1.png'

import './index.scss'
import { SONG_LIST_INDEX } from '../../../../stores/constants/index';

export default function Play(props) {
  const dispatch = useDispatch();
  const {songListIndex}  = useSelector((state: any) => state.player)
  const [playingFlag, setPalyingFlag] = useState(false) //播放状态
  // @ts-ignore
  const [songList, setSongList] = useState(props.demoSongList)
  var [songOrder, setSongOrder] = useState(1)
  // @ts-ignore
  const [innerAudioContext, setInnerAudioContext] = useState(Taro.createInnerAudioContext())
  var [songIndex,setsongIndex] = useState(songListIndex ? songListIndex : 0)
  // @ts-ignore
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(innerAudioContext.currentTime)
  const [seek, setSeek] = useState(false)
  const [volumn, setVolumn] = useState(0)

  // 监听播放时间
  useEffect(() => {
    props.changeCurrentTime(currentTime)
    setCurrentTime(innerAudioContext.currentTime)
  },[currentTime])

  useEffect(() => {
    if(!innerAudioContext.src){
      innerAudioContext.src = songList[songIndex].url
    }
    setDuration(innerAudioContext.duration)
    innerAudioContext.onEnded(() => {
      setPalyingFlag(false)
    })
  },[])

  // 播放/暂停
  const handlePlaySong = async() => {
    // if(IS_RN){
    //   // setInnerAudioContext()
    //   innerAudioContext.destroy()
    //   const audio = Taro.createInnerAudioContext();
    //   audio.src =songList[songIndex].url
    //   console.log(audio.paused,122222 )
    //   // audio.paused  一直等于true 需要销毁实例
    //   if(audio.paused ){
    //     audio.play()
    //   }else{
    //     audio.pause()
    //   }
        // = function () {
        //   if (audio) {
        //     return newAudio.play();
        //   }
        //   audio.destroy();
        //   // audio.destroyed = true;
        //   newAudio = Taro.createInnerAudioContext();
        //   newAudio.src = audio.src;
        //   newAudio.play();
        // };
    // } else {
      // 暂停/播放音乐
    if(!innerAudioContext.src){
      innerAudioContext.src = songList[songIndex].url
    }
    if(innerAudioContext.paused ){
      await innerAudioContext.play()
      setPalyingFlag(true)
      setInterval(() => {
        setCurrentTime(innerAudioContext.currentTime)
      },100)
      props.handlSong(innerAudioContext,true)
    }else{
      innerAudioContext.pause()
      setPalyingFlag(false)
      props.handlSong(innerAudioContext,false)
    }
    // }
  }
  // 上一曲
  const handleProSong = () => {
    if(songIndex  <= 0 ){
      setsongIndex(0)
    }else{
      setsongIndex(--songIndex)
    }
    dispatch({
      type: SONG_LIST_INDEX,
      payload: songIndex,
    })
    innerAudioContext.src = songList[songIndex].url
    handlePlaySong()
  }
  // 下一曲
  const handleNextSong = () => {
    if(songIndex === songList.length -1 ){
      setsongIndex(songList.length-1)
    }else{
      setsongIndex(++songIndex)
    }
    dispatch({
      type: SONG_LIST_INDEX,
      payload: songIndex,
    })
    innerAudioContext.src = songList[songIndex].url
    handlePlaySong()
  }
  // 播放列表
  const hanleSongList = () => {

  }
  // @ts-ignore
  const handleSeek = () =>{
    console.log('跳转到指定位置')
    innerAudioContext.seek(1.35) // 单位 s
  }

  // 时间转换
  const currentTimeformat  = (value) =>{
    if (!value) return ''
    const interval = Math.floor(value)
    const minute = (Math.floor(interval / 60)).toString().padStart(2, '0')
    const second = (interval % 60).toString().padStart(2, '0')
    return `${minute}:${second}`
  }
  // 修改播放顺序
  const handleChangeSongOrder = () => {
    if(songOrder ===3 ){
      setSongOrder(1)
    }else {
      setSongOrder(++songOrder)
    }
  }
  // 进度拖动时
  const handleChanging = (data) => {
    // 拖动进度 data.detail.value
    console.log(data.detail,12)
    setVolumn(data.detail.value)
  }
  // 拖动结束
  const handleChange2 = (data) =>{
    console.log('拖动结束')
    innerAudioContext.seek(data.detail.value)
    setCurrentTime(data.detail.value)
    setVolumn(data.detail.value)
    // 对应歌词高亮滚动
  }

  return (
    <View className="player__bottom">
      <View className="player__bottom__top">
        <View className="player__bottom__top__left">
          <Image src={play1Img} className="player__bottom__top__left__play" />
          <Image src={starsImg} className="player__bottom__top__left__stars" />
        </View>
        <View className="player__bottom__top__right">
          <Image src={singImg} className="player__bottom__top__right__sing" />
          <Image src={moreImg} className="player__bottom__top__right__more" />
        </View>
      </View>
      <View className="player__bottom__conter">
        {/* 播放时间的移动 */}
        <View className="player__bottom__conter__start_time">{ currentTime ? currentTimeformat(currentTime): '00:00'}</View>
        <View className="player__bottom__conter__progress"    style={{height:IS_WEAPP && Taro.pxTransform(40)}}>
          {/* <View style={{width:(currentTime && innerAudioContext.duration) ?  (currentTime /innerAudioContext.duration * 100 +'%') : 0 }} className="player__bottom__conter__progress__speed"></View>
          <View  style={{top: Taro.pxTransform(-7.5),left:(currentTime && innerAudioContext.duration) ?  (currentTime /innerAudioContext.duration * 100 +'%') : 0 }} className="player__bottom__conter__progress__radio"></View> */}
          <Slider
            step={1}
            value={volumn}
            backgroundColor="rgba(255,255,255,0.2)"
            activeColor="rgba(255,255,255,0.5)"
            blockSize={12}
            className="player__bottom__conter__progress__Slider"
            onChanging={handleChanging}
            onChange={handleChange2}
            max={innerAudioContext.duration ? innerAudioContext.duration : 100}
          />
        </View>
        <View className="player__bottom__conter__end_time">{innerAudioContext.duration? currentTimeformat(innerAudioContext.duration) :'00:00'}</View>
      </View>
      <View className="player__bottom__bottom">
        {/* 顺序切换 */}
        <Image
          src={songOrder === 1 ?  xunhuanImg   : (songOrder === 2 ?  suijiImg  : xunhuan1Img )}
          onClick={handleChangeSongOrder}
          className="player__bottom__bottom__play-order"
        />
        <Image src={proImg} className="player__bottom__bottom__last-song" onClick={handleProSong} />
        <Image src={playingFlag ? playingImg :playImg} className="player__bottom__bottom__play" onClick={handlePlaySong} />
        <Image src={nextImg} className="player__bottom__bottom__nest-song" onClick={handleNextSong} />
        <Image src={ListImg} className="player__bottom__bottom__play-list" onClick={hanleSongList} />
      </View>
      {/* <View onClick={handleSeek}> 音频跳转测试</View> */}
    </View>
  );
}
