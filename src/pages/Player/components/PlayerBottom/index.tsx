import { Image, View } from '@tarojs/components';
import classnames from 'classnames';
import play1Img from '@/img/play1.png';
import starsImg from '@/img/stars.png';
import singImg from '@/img/sing.png';
import moreImg from '@/img/more2.png';
import nextImg from '@/img/next.png';
import proImg from '@/img/pro.png';
import playImg from '@/img/bofang-4.png';
import ListImg from '@/img/list.png';
import playingImg from '@/img/palying.png';
import { PLAYER_MODE } from '@/utils';

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
    isSeeking,
    mode,
    nextPlayerMode,
  } = props;

  function getPlayerModeImgUr() {
    switch (mode) {
      case PLAYER_MODE.LOOP:
        return 'https://fast-learn-oss.youbaobao.xyz/music/loop.png';
      case PLAYER_MODE.LOOP_ONE:
        return 'https://fast-learn-oss.youbaobao.xyz/music/loop_one.png';
      case PLAYER_MODE.RANDOM:
        return 'https://fast-learn-oss.youbaobao.xyz/music/random.png';
      default:
        return 'https://fast-learn-oss.youbaobao.xyz/music/loop.png';
    }
  }

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
          <View
            className={classnames(
              'player-bottom__bottom__center__start-time',
              {
                'player-bottom__bottom__center__start-time--seeking': isSeeking,
              })}
          >
            {currentTime ? formatTime(currentTime) : '00:00'}
          </View>
          <View className="player-bottom__bottom__center__progress">
            <Slider {...props} />
          </View>
          <View className="player-bottom__bottom__center__end-time">{duration ? formatTime(duration) : '00:00'}</View>
        </View>
        <View className="player-bottom__bottom__bottom">
          <Image
            src={getPlayerModeImgUr()}
            onClick={nextPlayerMode}
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
