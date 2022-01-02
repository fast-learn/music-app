import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { View, Text, Image, Swiper, SwiperItem } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { SONG_LIST, SONG_INDEX } from '@/stores/constants';
import { getPersonalizedNewsong, generateSongPlayUrl } from '@/services/api';
import { genImgUrl, wrapperClassName } from '@/utils';

import './index.scss';


export default function NewSong(): any {
  const [originalData, setOriginalData] = useState([]);
  const [data, setData] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    getPersonalizedNewsong().then((response) => {
      console.log('getPersonalizedNewsong', response);
      const _data = [];
      response.forEach(_ => _.playUrl = generateSongPlayUrl(_.id));
      for (let i = 0; i < response.length; i += 3) {
        // @ts-ignore
        _data.push(response.slice(i, i + 3));
      }
      setData(_data);
      setOriginalData(response);
    }).catch(() => {
      setData([]);
    });
  }, []);

  function playAll() {
    // 将歌曲存入Redux播放列表
    dispatch({ type: SONG_LIST, payload: originalData });
    dispatch({ type: SONG_INDEX, payload: 0 });
    Taro.navigateTo({ url: 'pages/Player/index' });
  }

  return data && data.length > 0 && (
    <View className="new-song">
      <View className="new-song__title">
        <View className="new-song__title__text">
          <Image src="https://fast-learn-oss.youbaobao.xyz/music/refresh.png" className="new-song__title__text__img" />让你单曲循环的华语歌
        </View>
        <View className="new-song__title__btn" onClick={playAll}>
          <Image
            src="https://fast-learn-oss.youbaobao.xyz/music/play_fill_black.png"
            className="new-song__title__btn__img"
          />播放
        </View>
      </View>
      <View className="new-song__list">
        <Swiper className="new-song__list__swiper" nextMargin="40px">
          {data.map((subList: any, index: number) => (
            <SwiperItem key={index}>
              {subList.map((item: any, subIndex: number) => (
                <View className="new-song__list__swiper__item" key={item.id}>
                  <Image
                    src={genImgUrl(item.imageUrlWithHttps, 80, 80)}
                    className="new-song__list__swiper__item__img"
                  />
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
                      <Image
                        src="https://fast-learn-oss.youbaobao.xyz/music/play_fill_gray.png"
                        className="new-song__list__swiper__item__content__right__play"
                      />
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
