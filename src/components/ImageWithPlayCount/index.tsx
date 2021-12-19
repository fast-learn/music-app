import { Image, View } from '@tarojs/components';
import { calcPlayCount } from '@/utils';
import playImg from '@/img/play.png';

import './index.scss';

export default function ImageWithPlayCount(props) {
  return (
    <View className="image-with-play-count">
      <Image className="image-with-play-count__img" src={props.picUrl} />
      <View className="image-with-play-count__tag">
        <Image src={playImg} className="image-with-play-count__tag__img" />
        <View className="image-with-play-count__tag__text">{calcPlayCount(props.playCount)}</View>
      </View>
    </View>
  )
}
