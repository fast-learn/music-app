import { Image, View } from '@tarojs/components';
import { calcPlayCount, genImgUrl } from '@/utils';

import './index.scss';

export default function ImageWithPlayCount(props) {
  return (
    <View
      className="image-with-play-count"
      style={{
        marginTop: IS_WEAPP ? '20rpx' : 0,
      }}
    >
      <Image className="image-with-play-count__img" src={genImgUrl(props.picUrl, 200, 200)} />
      <View className="image-with-play-count__tag">
        <Image src="https://fast-learn-oss.youbaobao.xyz/music/play.png" className="image-with-play-count__tag__img" />
        <View className="image-with-play-count__tag__text">{calcPlayCount(props.playCount)}</View>
      </View>
    </View>
  );
}
