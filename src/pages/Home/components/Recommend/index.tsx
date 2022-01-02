import { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, Swiper, SwiperItem } from '@tarojs/components';
import ImageWithPlayCount from '@/components/ImageWithPlayCount';
import { getPersonalized } from '@/services/api';

import './index.scss';

export default function Recommend(): any {
  const [data, setData] = useState([]);

  useEffect(() => {
    getPersonalized().then(response => {
      console.log('getPersonalized', response);
      // 获取第10条以后的数据作为初始数组
      const _first = response.slice(5);
      const _other = response.slice(0, 5);
      const _data: any = [_first, ..._other];
      console.log('getPersonalized', _data);
      setData(_data);
    }).catch(() => {
      setData([]);
    });
  }, []);

  return data && data.length > 0 && (
    <View className="recommend">
      <View className="recommend__title">
        <View className="recommend__title__text">推荐歌单</View>
        <View className="recommend__title__btn">
          更多<Image src="https://fast-learn-oss.youbaobao.xyz/music/more.png" className="recommend__title__btn__img" />
        </View>
      </View>
      <View className="recommend__list">
        <ScrollView
          className="recommend__list__scroll"
          scrollX
          enableFlex={IS_WEAPP}
          // @ts-ignore
          showsHorizontalScrollIndicator={false}
        >
          {data.map((item: any, index: number) => (
            <View
              className={`recommend__list__scroll__item recommend__list__scroll__item--${index === 0 ? 'first' : (index === data.length - 1 ? 'last' : index)}`}
              key={index}
            >
              {index === 0 ? (
                <>
                  <Swiper
                    className="recommend__list__scroll__item__swiper"
                    autoplay
                    vertical
                    circular
                    interval={3000}
                    indicatorDots={false}
                    indicatorColor="rgba(0,0,0,0)"
                    indicatorActiveColor="rgba(0,0,0,0)"
                  >
                    {item.map(subItem => (
                      <SwiperItem key={subItem.id}>
                        <ImageWithPlayCount picUrl={subItem.picUrl} playCount={subItem.playCount} />
                        <Text
                          className="recommend__list__scroll__item__name"
                          // @ts-ignore
                          numberOfLines={2}
                        >
                          {subItem.name}
                        </Text>
                      </SwiperItem>
                    ))}
                  </Swiper>
                </>
              ) : (
                <>
                  <ImageWithPlayCount picUrl={item.picUrl} playCount={item.playCount} />
                  <Text
                    className="recommend__list__scroll__item__name"
                    // @ts-ignore
                    numberOfLines={2}
                  >
                    {item.name}
                  </Text>
                </>
              )}
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}
