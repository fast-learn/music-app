import { View} from "@tarojs/components";
// import {useDispatch,useSelector }from 'react-redux'
// import { SONG_LIST } from "@/src/stores/constants";
import { get } from '@/services';

import './index.scss'

import Play from './components/Play'
import Song from  './components/Song'
import Lyric from "./components/Lyric";

const demoSongList=[
  // {id: 1904192389, name:'倒流时间',url:'http://m801.music.126.net/20211221134234/9bae96bec7a130e6a4e6417054860e37/jdymusic/obj/wo3DlMOGwrbDjj7DisKw/12141553696/675c/5c81/8e0a/221bf9376dbbd5d9f564b3f1fcead437.mp3'},
  // {id: 1905012469, name:'每一秒钟',url:'http://m701.music.126.net/20211221134614/110741dc8597a71a8408648ebd660a50/jdymusic/obj/wo3DlMOGwrbDjj7DisKw/12194991126/4db4/8ece/5187/13ad81a8268dcbc2629105e748f9e4a2.mp3'},
  // {id: 1905096024, name:'好逑',url:'http://m701.music.126.net/20211221134626/e630cf302e1900656fe7e12d148fb9c2/jdymusic/obj/wo3DlMOGwrbDjj7DisKw/12200857481/06ab/4ef3/7c93/79670dc217da64ab85d818e5f4077890.mp3'},
  // {id: 1904183420, name:'请你一定要记得我好吗',url:'http://m701.music.126.net/20211221134640/c731000b50c4a9976b8da9d6f03ae98b/jdymusic/obj/wo3DlMOGwrbDjj7DisKw/12140918564/0bc0/475a/cf27/4b3538f5999c1628659832c72462d1d4.mp3'},
  // {id: 1818831999, name:'道理的道理',url:'http://m701.music.126.net/20211221134653/67552f19e278286e68df7156a90781e7/jdymusic/obj/wo3DlMOGwrbDjj7DisKw/12127818574/d7f4/0b2f/f38a/e1eb6ecfce778430613c27dd2434fdb9.mp3'},
  // {id: 1904055088, name:'At Christmas',url:'http://m801.music.126.net/20211221134705/eafc903d48d5cf63a5d9a79af4e5dfc5/jdymusic/obj/wo3DlMOGwrbDjj7DisKw/12140383312/21b2/3445/4cbc/9fee02dd38c468981b04ba10eeea2cd3.mp3'},
  {id:11111,name:'测试',url:'http://m8.music.126.net/20211221181029/d9097c7368ee61aa1f7f27952c0c4095/ymusic/obj/w5zDlMODwrDDiGjCn8Ky/11955850260/5ce8/5cce/80ab/8cef3dc106566d2f938731ffea8110c3.mp3'}
]
// const demoSongIDList = [1905096024,1904183420,1818831999,1904055088]

export default function Palyer() {
  // 模拟传递过来的数据
  // const dispatch = useDispatch();
  // dispatch({
  //   type: SONG_LIST,
  //   payload: demoSongList,
  // })
  // const {songList}  = useSelector((state: any) => state.player)

  // 根据入参获取歌曲内容
  // const getSongUrl = () => {
  //   get(`/song/url?id=${demoSongIDList.join(',')}`).then((params) => {
  //   })
  // }
  return (
    <View className="player">
      <Song />
      {/* <View className="player__top">
        <View className="player__top__top"> */}
          {/* <View className="player__top__top__left"> */}
          {/* 点击隐藏该页面，动画效果 */}
            {/* <Image src={bottomImg}  className="player__top__top__left" /> */}
          {/* </View> */}
          {/* <View className="player__top__top__conter">
            <View className="player__top__top__conter__main">
              王娅-半吨兄弟-爱情错觉 */}
              {/* 字幕滚动效果 */}
            {/* </View>
            <View className="player__top__top__conter__vice">
              <View className="player__top__top__conter__vice__message">
                筷子兄弟
              </View>
              <View className="player__top__top__conter__vice__add">
                <Image src={addImg}  className="player__top__top__conter__vice__add__image" />
              </View>
            </View>
          </View>
          <View className="player__top__top__right">
            <Image src={coverImg}  className="player__top__top__right__cover" /> */}
            {/*  头像涟漪效果 */}
            {/* <Image src={fengxiangImg}  className="player__top__top__right__share" />
          </View>
        </View> */}
        {/* 音量添加减少效果 */}
        {/* <View className="player__top__bottom">
          <Image src={volumeImg}  className="player__top__bottom__volume" />
          <View className="player__top__bottom__progress">
            <Slider step={1} value={20} backgroundColor="rgba(255,255,255,0.2)" activeColor="rgba(255,255,255,0.5)" blockSize={15}   className="player__top__bottom__progress__slider" onChange={slideScroll} />
          </View>
          <Image src={readerImg}  className="player__top__bottom__radar" />

        </View> */}
      {/* </View> */}
      {/* 播放页面头部开发 */}
      {/* 歌词滚动效果、拖动歌词会跟着进行播放，拖动时会有线条和时间显示 */}
      {/* <View className="player__conter">滚动歌词
      </View> */}
      <Lyric />

      {/* 播放组件底部开发 --> 抽离成组件 */}
      <Play
        demoSongList={demoSongList}
      />
      {/* <View className="player__bottom">
        <View className="player__bottom__top">
          <View className="player__bottom__top__left">
          <Image src={play1Img}  className="player__bottom__top__left__play" />
          <Image src={starsImg}  className="player__bottom__top__left__stars" />
          </View>
          <View className="player__bottom__top__right">
          <Image src={singImg}  className="player__bottom__top__right__sing" />
          <Image src={moreImg}  className="player__bottom__top__right__more" />
          </View>
        </View>
        <View className="player__bottom__conter"> */}
          {/* 播放时间的移动 */}
        {/* <View className="player__bottom__conter__start_time">00:00</View>
        <View className="player__bottom__conter__progress"></View>
        <View className="player__bottom__conter__end_time">02:34</View>
        </View>
        <View className="player__bottom__bottom"> */}
          {/* <View className="player__bottom__bottom__play-order"></View> */}
          {/* 顺序切换 */}
          {/* <Image src={xunhuanImg}  className="player__bottom__bottom__play-order" />
          <Image src={proImg}  className="player__bottom__bottom__last-song" />
          <Image src={playImg}  className="player__bottom__bottom__play" />
          <Image src={nextImg}  className="player__bottom__bottom__nest-song" />
          <Image src={ListImg}  className="player__bottom__bottom__play-list" />
        </View> */}
      {/* </View> */}
    </View>
  );
}
