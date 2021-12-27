import { View, Image } from "@tarojs/components";
import demoImg from "@/img/cover.png";
import useSearchList from "../../useSearchList";
import "./index.scss";

const demo = [
  { id: 1, name: "vip" },
  { id: 2, name: "试听" },
  { id: 3, name: "原唱" },
  { id: 4, name: "SQ" },
];
const label = [
  { id: 1, name: "评论过万" },
  { id: 2, name: "收藏过完" },
];
export default function Single() {
  // const {searchListIndex} = useSearchList()
  // console.log(searchListIndex,12001)
  return (
    <View className="single">
      <View className="single__top">
        <View className="single__top__left">单曲</View>
        <View className="single__top__right">
          <Image className="single__top__right__play" src={demoImg} />
          <View className="single__top__right__content">播放</View>
        </View>
      </View>
      <View className="single__bottom">
        <View className="single__bottom__left">
          <View className="single__bottom__left__title">Try</View>
          <View className="single__bottom__left__vip">
      {/* label 集合 + 副标题 */}
      {demo.map((item) =>
              (<View key={item.id} className={`single__bottom__left__vip__label ${item.id === 1 && 'single__bottom__left__vip__te'}`}>{item.name}</View>)
            )}
            <View className="single__bottom__left__vip__subtitle">副标题</View>
          </View>
          <View className="single__bottom__left__label">
            {label.map((item) =>
              (<View key={item.id} className="single__bottom__left__label__content">{item.name}</View>)
            )}
            <View className="single__bottom__left__label__video">电视剧xx片尾曲</View>
      {/* 评论 */}
      </View>
          <View className="single__bottom__left__welfare">
      {/* 福利 */}
      <View className="single__bottom__left__welfare__label" >福利</View>
            <View className="single__bottom__left__welfare__price">1.0元</View>
            <View className="single__bottom__left__welfare__vip">开通黑胶VIP场所</View>
          </View>
        </View>
      <View className="single__bottom__right">
          <Image src={demoImg} className="single__bottom__right__play" />
          <Image src={demoImg} className="single__bottom__right__more" />
        </View>
      </View>
    </View>
  );
}
