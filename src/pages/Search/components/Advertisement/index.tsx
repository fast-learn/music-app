import { useState } from 'react';
import { Image, View } from '@tarojs/components';

import './index.scss';

export default function Advertisement(props): any {
  const [hide, setHide] = useState(false);
  return !hide && (
    <View className="adv" style={{ ...props.style }}>
      <Image src={props.imgUrl} className="adv__img" />
      <View className="adv__tag">广告</View>
      <Image
        src="https://fast-learn-oss.youbaobao.xyz/music/icon_close.png"
        className="adv__close"
        onClick={() => setHide(true)}
      />
    </View>
  );
}
