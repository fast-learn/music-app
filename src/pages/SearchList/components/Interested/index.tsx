import { View, Image } from "@tarojs/components";

import demoImg from "@/img/cover.png";

import "./index.scss";

export default function Interested() {
  return (
    <View className="interested">
      <View className="interested__top">你可能感兴趣</View>
      <View className="interested__bottom">
        {/* 艺人 */}
        <View className="interested__bottom__singer">
          <View className="interested__bottom__singer__left">
            <Image
              src={demoImg}
              className="interested__bottom__singer__left__cover"
            />
            <View className="interested__bottom__singer__left__center">
              <View className="interested__bottom__singer__left__center__top">
                <View className="interested__bottom__singer__left__center__top__title">
                  歌手: P!nk
                </View>
                <View className="interested__bottom__singer__left__center__top__source">
                  (粉红佳人)
                </View>
              </View>
              <View className="interested__bottom__singer__left__center__center">
                粉丝:35.9万，歌曲：1200
              </View>
              <View className="interested__bottom__singer__left__center__bottom">
                <Image
                  src={demoImg}
                  className="interested__bottom__singer__left__center__bottom__image"
                />
                <View className="interested__bottom__singer__left__center__bottom__message">
                  TA的云圈
                </View>
                <Image
                  src={demoImg}
                  className="interested__bottom__singer__left__center__bottom__more"
                />
              </View>
            </View>
          </View>
          <View className="interested__bottom__singer__right">
            <Image
              src={demoImg}
              className="interested__bottom__singer__right__add"
            />
            <View className="interested__bottom__singer__right__follow">
              关注
            </View>
          </View>
        </View>
        {/* 专辑 */}
        <View className="interested__bottom__album">
          <View className="interested__bottom__album__left">
          <Image
            src={demoImg}
            className="interested__bottom__album__left__image"
          />
          </View>
          <View className="interested__bottom__album__right">
            <View className="interested__bottom__album__right__title">
              专辑：Try
            </View>
            <View className="interested__bottom__album__right__subtitle">
              P!nk
            </View>
          </View>
        </View>
        {/* MV 视频 */}
        <View className="interested__bottom__mv">
          <View className="interested__bottom__mv__left">
          <Image
            src={demoImg}
            className="interested__bottom__mv__left__image"
          />
          <Image
            src={demoImg}
            className="interested__bottom__mv__left__play"
          />
          </View>
          <View className="interested__bottom__mv__right">
            <View className="interested__bottom__mv__right__title">
              MV：Try
            </View>
            <View className="interested__bottom__mv__right__subtitle">
              副标题
            </View>
          </View>
        </View>
        {/* 歌单 */}
        <View className="interested__bottom__song">
          <View className="interested__bottom__song__left">
          <Image
            src={demoImg}
            className="interested__bottom__song__left__image"
          />
          <Image
            src={demoImg}
            className="interested__bottom__song__left__play"
          />
          </View>
          <View className="interested__bottom__song__right">
            <View className="interested__bottom__song__right__title">
            薛之谦合集薛之谦合集薛之谦合集薛之谦合集薛之谦合集薛之谦合集薛之谦合集薛之谦合集薛之谦合集薛之谦合集
            </View>
            <View className="interested__bottom__song__right__subtitle">
              歌曲：30，播放：2464.8万
            </View>
          </View>
        </View>
        {/* 播客 */}
        <View className="interested__bottom__blog">
          <View className="interested__bottom__blog__left">
          <Image
            src={demoImg}
            className="interested__bottom__blog__left__image"
          />
          <Image
            src={demoImg}
            className="interested__bottom__blog__left__play"
          />
          </View>
          <View className="interested__bottom__blog__right">
            <View className="interested__bottom__blog__right__title">
            薛之谦：听听我的《天外来客》
            </View>
            <View className="interested__bottom__blog__right__subtitle">
              1个声音 by 薛之谦， 播放 70.4万次
            </View>
            <View className="interested__bottom__blog__right__label">
              明星主播
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
