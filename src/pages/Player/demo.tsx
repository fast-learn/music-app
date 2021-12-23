import { View } from '@tarojs/components';
import Taro from '@tarojs/taro'
import {useState,useEffect} from 'react'
// import {AtModal } from 'taro-ui'

import './index.scss';

export default function Player() {
  // @ts-ignore
  const [innerAudioContext, setInnerAudioContext] = useState(Taro.createInnerAudioContext())
  const [volumes, setVolumes] = useState(0)
  // @ts-ignore
  const [duration, setDuration] = useState(0)
  const [playbackRate,setPlaybackRate] = useState(0)
  const [currentTime, setCurrentTime] = useState(innerAudioContext.currentTime)
  const [nextFlag, setNextFlag] = useState(false) // pause 是只读状态无法修改，只能通过添加开关来判断是否暂停（上一曲、下一曲）歌曲
  const [innerAudioContextSrc, setInnerAudioContextSrc] = useState('https://music.163.com/song/media/outer/url?id=415792881.mp3')

  useEffect(() => {
    innerAudioContext.src = innerAudioContextSrc
  },['innerAudioContextSrc'])
  useEffect(() => {
    console.log(currentTime,1222)
  },['currentTime'])
  const continuePlay  = () => {
    if(innerAudioContext.src === 'https://music.163.com/song/media/outer/url?id=415792881.mp3'){
      setInnerAudioContextSrc('https://music.163.com/song/media/outer/url?id=1829057624.mp3')
      innerAudioContext.src = 'https://music.163.com/song/media/outer/url?id=1829057624.mp3'
    }else{
      setInnerAudioContextSrc('https://music.163.com/song/media/outer/url?id=415792881.mp3')
      innerAudioContext.src = 'https://music.163.com/song/media/outer/url?id=415792881.mp3'
    }
    innerAudioContext.play()
    setNextFlag(true)
  }
  // innerAudioContext.autoplay = true
  // innerAudioContext.src = 'https://storage.360buyimg.com/jdrd-blog/27.mp3'
  // innerAudioContext.onError((res) => {
  //   console.log(res.errMsg)
  //   console.log(res.errCode)
  // })
  // InnerAudioContext.onEnded(function callback)// 监听音频播放完毕事件-> 移除计时器
  const taroAudioPlay =async () =>{
    if(innerAudioContext.paused && !nextFlag){
      await innerAudioContext.play()
      setDuration(innerAudioContext.duration)
      if(innerAudioContext.duration && innerAudioContext.currentTime < innerAudioContext.duration){
        setInterval(() => {
          setCurrentTime(innerAudioContext.currentTime)
        },100)
      }
    }else{
      innerAudioContext.pause()
      setNextFlag(false)
    }
  }
  const handleMusic = () => {
    setPlaybackRate(playbackRate+0.5)
    console.log(innerAudioContext.playbackRate)
    innerAudioContext.playbackRate = playbackRate
  }
  const handleVolume = () => {
    setVolumes(volumes+0.1)
    innerAudioContext.volume = volumes
  }
  const stom = (data) => {
    return  (data / 60).toFixed(2)
  }
  return (
    <View className="player">
      {/* <AtModal
        isOpened={false}
        title="标题"
        cancelText="取消"
        confirmText="确认"
        onClose={ this.handleClose }
        // onCancel={ this.handleCancel }
        // onConfirm={ this.handleConfirm }
        content="欢迎加入京东凹凸实验室\n\r欢迎加入京东凹凸实验室"
      /> */}
      {/* <Audio
				src={audioSrc}
				ref={audio}
				// onTimeUpdate={updateTime}
			></Audio> */}
      <View onClick={taroAudioPlay}>播放/暂停</View>
      {/* <View onClick={StopPlay}>上一曲</View> */}
      <View onClick={continuePlay}>下一曲</View>
      <View onClick={handleMusic}>快进</View>
      <View onClick={handleVolume} >音量</View>
      <View style={{width:'100%',height:30,border:'1px solid pink'}}>{innerAudioContext.duration? stom(innerAudioContext.duration) :0}</View>
      <View style={{width: (currentTime && innerAudioContext.duration) ? ((currentTime / innerAudioContext.duration ) * 100  + '%'):'',height: 20, border:'1px solid yellow',borderRadius:'10'}}>{stom(currentTime)}</View>
    </View>
  );
}
