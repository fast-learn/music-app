import { View, ScrollView } from "@tarojs/components";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { get } from "@/services";
import lyricParser from "@/utils/lyric";
import "./index.scss";

export default function Lyric(props) {
  const [isScroll,setIsScroll] = useState(false)// 是否滚动
  const [scrollTime,setScrollTime] = useState() // 计时器
  var [scrollTop, setScrollTop] = useState(0) // 滚动高度
  const [lyricsContent,setLyricsContent] = useState(0) // 当前播放位置
  const { songListIndex } = useSelector((state: any) => state.player);
  const [lyricData, setLyricData] = useState([]);
  const [flag, setFlag] = useState('')
  useEffect(() => {
    get("lyric?id=1903299149").then((params) => {
      if (params.data.lrc && params.data.lrc.lyric) {
        setLyricData(lyricParser(params.data.lrc.lyric));
      }
    });
  }, [songListIndex]);

  useEffect(() => {
    setIsScroll(props.isScroll)
    if(props.isScroll){
      setScrollTime(setInterval(() => {
        setScrollTop(scrollTop+= 3 )
      },200))
    }else{
      clearInterval(scrollTime)
      setScrollTime('')
    }
  }, [props.isScroll]);

  useEffect(() => {
    if(props.lyricsContent){
      setLyricsContent((props.lyricsContent).toFixed(2))
    }
  },[props.lyricsContent])
  // 将mm:ss格式转为秒数
  const formatTimeTos = (data) =>{
    if (!data) return 0
    let m
    let s
    const newdata = data.split(':')
    newdata.map(() => {
      m = newdata[0].replace(/\b(0)/gi,"") ? newdata[0].replace(/\b(0)/gi,"") * 60 : 0
      s = newdata[1] * 1 
    })
    return m +  s
  }
  if (lyricData && lyricData.length > 0) {
    return (
      <View className="lyric">
        <ScrollView
          scrollY
          className="lyric__scroll"
          scrollTop={scrollTop}
        >
        {lyricData.map((item, index) => (
            <View key={index} 
            className ={`${(( formatTimeTos(item.time) - lyricsContent <= 0.5 ) ? 'lyric__scroll__Highlight' : 'lyric__scroll__content')}`}
            >
              {item.content}</View>
          ))}
      </ScrollView>
      {/* <View className="lyric__scroll__division">
      </View> */}
      </View>
    );
  }
  return <View>暂无歌词</View>;
}
