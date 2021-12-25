import { View, Image } from '@tarojs/components';
import Taro from '@tarojs/taro';
import bottomImg from '@/img/bottom.png';
import coverImg from '@/img/cover.png';
import fengxiangImg from '@/img/fenxiang.png';
import volumeImg from '@/img/volume.png';
import readerImg from '@/img/reader.png';
import addImg from '@/img/add.png';
import Slider from '../Slider';

import './index.scss';

// @ts-ignore
export default function PlayerHeader(props) {
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
          <Image src={bottomImg} className="player-header__wrapper__top__back" />
          <View className="player-header__wrapper__top__content">
            <View className="player-header__wrapper__top__content__main">
              王娅-半吨兄弟-爱情错觉
            </View>
            <View className="player-header__wrapper__top__content__artist">
              <View className="player-header__wrapper__top__content__artist__message">
                筷子兄弟
              </View>
              <Image src={addImg} className="player-header__wrapper__top__content__artist__add" />
            </View>
          </View>
          <View className="player-header__wrapper__top__right">
            <Image src={coverImg} className="player-header__wrapper__top__right__cover" />
            {/*  头像涟漪效果 */}
            <Image src={fengxiangImg} className="player-header__wrapper__top__right__share" />
          </View>
        </View>
        {/* 音量添加减少效果 */}
        <View className="player-header__wrapper__bottom">
          <Image src={volumeImg} className="player-header__wrapper__bottom__volume" />
          <View className="player-header__wrapper__bottom__progress">
            <Slider />
          </View>
          <Image src={readerImg} className="player-header__wrapper__bottom__radar" />
        </View>
      </View>
    </View>
  );
}
