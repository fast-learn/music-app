import { View, Image, Swiper, SwiperItem } from '@tarojs/components';
import useBannerList from './useBannerList';

import './index.scss';

export default function Banner(): any {
  const { bannerList } = useBannerList();

  return bannerList && bannerList.length > 0 && (
    <View className="banner">
      <Swiper
        className="banner__swiper"
        indicatorColor="rgba(200,200,200,.8)"
        indicatorActiveColor="#fff"
        indicatorDots
        circular
        autoplay
        interval={3000}
      >
        {bannerList.map((item: any) => (
          <SwiperItem className="banner__swiper__item" key={item.imageUrlWithHttps}>
            <Image className="banner__swiper__item__img" src={item.imageUrlWithHttps} />
          </SwiperItem>
        ))}
      </Swiper>
    </View>
  );
}
