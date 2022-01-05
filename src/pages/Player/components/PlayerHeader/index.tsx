import { useEffect, useState } from 'react';
import { View, Image } from '@tarojs/components';
import Taro from '@tarojs/taro';
import bottomImg from '@/img/bottom.png';
import fengxiangImg from '@/img/fenxiang.png';
import volumeImg from '@/img/volume.png';
import readerImg from '@/img/reader.png';
import addImg from '@/img/add.png';
import { genImgUrl } from '@/utils';
import Slider from '../Slider';

import './index.scss';

// @ts-ignore
export default function PlayerHeader(props) {
  const { getPlayingSong } = props;
  const [songName, setSongName] = useState('');
  const [artist, setArtist] = useState('');
  const [pic, setPic] = useState('');
  useEffect(() => {
    const playingSong = getPlayingSong();
    console.log('playingSong', playingSong, playingSong?.songs?.name);
    if (playingSong) {
      setSongName(playingSong?.song?.name || '');
      setArtist(playingSong?.song?.artists[0]?.name || '');
      setPic(playingSong?.song?.album?.picUrl || '');
    }
  }, [getPlayingSong()]);
  return (
    <View
      className="player-header"
      style={IS_RN ? {
        paddingTop: Taro.pxTransform(40),
        height: Taro.pxTransform(199),
      } : {}}
    >
      <View className="player-header__wrapper">
        <View className="player-header__wrapper__top">
          <Image
            src={bottomImg} className="player-header__wrapper__top__back"
            onClick={() => Taro.navigateBack()}
          />
          <View className="player-header__wrapper__top__content">
            <View className="player-header__wrapper__top__content__main">
              {songName}
            </View>
            <View className="player-header__wrapper__top__content__artist">
              <View className="player-header__wrapper__top__content__artist__message">
                {artist}
              </View>
              <Image src={addImg} className="player-header__wrapper__top__content__artist__add" />
            </View>
          </View>
          <View className="player-header__wrapper__top__right">
            {pic && <Image src={genImgUrl(pic, 30, 30)} className="player-header__wrapper__top__right__cover" />}
            <Image src={fengxiangImg} className="player-header__wrapper__top__right__share" />
          </View>
        </View>
        <View className="player-header__wrapper__bottom">
          <Image src={volumeImg} className="player-header__wrapper__bottom__volume" />
          <View className="player-header__wrapper__bottom__progress">
            <Slider {...props} type="volume" />
          </View>
          <Image src={readerImg} className="player-header__wrapper__bottom__radar" />
        </View>
      </View>
    </View>
  );
}
