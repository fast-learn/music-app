import { useEffect, useState } from 'react';
import { View, Text, Image, Swiper, SwiperItem } from '@tarojs/components';
import { getPersonalizedNewsong } from '@/services/api';
import { wrapperClassName } from '@/utils';
import replaceImg from '@/img/huan.png';
import playImg from '@/img/play_fill1.png';
import playImg2 from '@/img/play_fill2.png';

import './index.scss';

export default function NewSong(): any {
  const [data, setData] = useState([]);

  useEffect(() => {
    // 一次获取12条数据，分为3屏
    getPersonalizedNewsong().then((response) => {
      console.log('getPersonalizedNewsong', response);
      const _data = [];
      for (let i = 0; i < response.length; i += 3) {
        // @ts-ignore
        _data.push(response.slice(i, i + 3));
      }
      setData(_data);
    }).catch(() => {
      setData([]);
    });
  }, []);

  return data && data.length > 0 && (
    <View className="new-song">
      <View className="new-song__title">
        <View className="new-song__title__text">
          <Image src={replaceImg} className="new-song__title__text__img" />让你单曲循环的华语歌
        </View>
        <View className="new-song__title__btn">
          <Image src={playImg} className="new-song__title__btn__img" />播放
        </View>
      </View>
      <View className="new-song__list">
        <Swiper className="new-song__list__swiper" nextMargin="40px">
          {data.map((subList: any, index: number) => (
            <SwiperItem key={index}>
              {subList.map((item: any, subIndex: number) => (
                <View className="new-song__list__swiper__item" key={item.id}>
                  <Image src={item.imageUrlWithHttps} className="new-song__list__swiper__item__img" />
                  <View className={wrapperClassName('new-song__list__swiper__item__content', subIndex, subList.length)}>
                    <View className="new-song__list__swiper__item__content__left">
                      <View className="new-song__list__swiper__item__content__left__top">
                        <Text className="new-song__list__swiper__item__content__left__top__name">
                          {item.name}
                        </Text>
                        <Text className="new-song__list__swiper__item__content__left__top__artist">
                          - {item.song.artists[0].name}
                        </Text>
                      </View>
                      <View className="new-song__list__swiper__item__content__left__bottom">
                        {item.song.album.company}
                      </View>
                    </View>
                    <View className="new-song__list__swiper__item__content__right">
                      <Image src={playImg2} className="new-song__list__swiper__item__content__right__play" />
                    </View>
                  </View>
                </View>
              ))}
            </SwiperItem>
          ))}
        </Swiper>
      </View>
    </View>
  );
}
