import { View,Image } from "@tarojs/components";
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

  // 监听播放时间
  useEffect(() => {
    props.changeCurrentTime(currentTime)
    // console.log(currentTime)
  },[currentTime])

  // 播放/暂停
  const handlePlaySong = async() => {
    // 暂停/播放音乐
    if(!innerAudioContext.src){
      // innerAudioContext.src = songList[songIndex].url
      innerAudioContext.src = 'http://localhost:8091/mp3/1903299149.mp3'
    }
    if(innerAudioContext.paused ){
      await innerAudioContext.play()
      setPalyingFlag(true)
      setDuration(innerAudioContext.duration)
      setInterval(() => {
        setCurrentTime(innerAudioContext.currentTime)
      },100)
      // innerAudioContext.onTimeUpdate()
      props.handlSong(innerAudioContext,true)
    }else{
      innerAudioContext.pause()
      setPalyingFlag(false)
      props.handlSong(innerAudioContext,false)
    }
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
        <View className="player__bottom__conter__start_time">{currentTime ? currentTimeformat(currentTime)  : '00:00'}</View>
        <View className="player__bottom__conter__progress"></View>
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
