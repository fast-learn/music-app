import { Image, View } from '@tarojs/components';
import play1Img from '@/img/play1.png';
import starsImg from '@/img/stars.png';
import singImg from '@/img/sing.png';
import moreImg from '@/img/more2.png';
import xunhuanImg from '@/img/xunhuan.png';
import nextImg from '@/img/next.png';
import proImg from '@/img/pro.png';
import playImg from '@/img/bofang-4.png';
import ListImg from '@/img/list.png';
import playingImg from '@/img/palying.png';
// import suijiImg from '@/img/suiji.png';
// import xunhuan1Img from '@/img/xunhuan1.png';
import Slider from '../Slider';

import './index.scss';

export default function PlayerBottom(props) {
  const {
    play,
    pause,
    isPlaying,
    next,
    previous,
    currentTime,
    duration,
    formatTime,
  } = props;
  return (
    <View className="player-bottom">
      <View className="player-bottom__bottom">
        <View className="player-bottom__bottom__top">
          <View className="player-bottom__bottom__top__left">
            <Image src={play1Img} className="player-bottom__bottom__top__left__play" />
            <Image src={starsImg} className="player-bottom__bottom__top__left__stars" />
          </View>
          <View className="player-bottom__bottom__top__right">
            <Image src={singImg} className="player-bottom__bottom__top__right__sing" />
            <Image src={moreImg} className="player-bottom__bottom__top__right__more" />
          </View>
        </View>
        <View className="player-bottom__bottom__center">
          <View className="player-bottom__bottom__center__start-time">{currentTime ? formatTime(currentTime): '00:00'}</View>
          <View className="player-bottom__bottom__center__progress">
            <Slider
              currentTime={currentTime}
              duration={duration}
            />
          </View>
          <View className="player-bottom__bottom__center__end-time">{duration ? formatTime(duration) : '00:00'}</View>
        </View>
        <View className="player-bottom__bottom__bottom">
          <Image
            src={xunhuanImg}
            className="player-bottom__bottom__bottom__play-order"
          />
          <Image
            src={proImg}
            className="player-bottom__bottom__bottom__previous-song"
            onClick={previous}
          />
          <Image
            src={isPlaying ? playingImg : playImg}
            className="player-bottom__bottom__bottom__play"
            onClick={isPlaying ? pause : play}
          />
          <Image
            src={nextImg}
            className="player-bottom__bottom__bottom__next-song"
            onClick={next}
          />
          <Image
            src={ListImg}
            className="player-bottom__bottom__bottom__play-list"
          />
        </View>
      </View>
    </View>
  );
}
