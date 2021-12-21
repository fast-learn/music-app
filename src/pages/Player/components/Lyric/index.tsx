import { View, ScrollView } from "@tarojs/components";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { get } from "@/services";
import lyricParser from "@/utils/lyric";
import "./index.scss";

export default function Lyric() {
  const { songListIndex } = useSelector((state: any) => state.player);
  const [lyricData, setLyricData] = useState([]);
  useEffect(() => {
    get("lyric?id=1904192389").then((params) => {
      if (params.data.lrc && params.data.lrc.lyric) {
        setLyricData(lyricParser(params.data));
      }
    });
  }, [songListIndex]);
  console.log(lyricData, typeof lyricData.lyric);
  if (lyricData && lyricData.lyric && lyricData.lyric.length > 0) {
    const { lyric } = lyricData;
    return (
      <View className="lyric">
        <ScrollView
          scrollY
          className="lyric__scroll"
        >
        {lyric.map((item, index) => (
            <View key={index} className="lyric__scroll__content">{item.content}</View>
          ))}
      </ScrollView>
      </View>
    );
  }
  return <View>暂无歌词</View>;
}
