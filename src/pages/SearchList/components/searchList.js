import { View, Image } from "@tarojs/components";
import PlayImg from "@/img/searchList_play.png";
import PlayMoreImg from "@/img/searchList_more.png";
import moreImg from "@/img/searchList_play_more.png";
import showMoreImg from '@/img/searchList_show_more.png';
// import yunImg from '@/img/searchList_yun.png';
// import yunMoreImg from '@/img/searchList_yun_more.png';
import yunAddImg from '@/img/searchList_yun_add.png'
import mvPlay from '@/img/searchList_mv.png'

const demo = [
  { id: 1, name: "vip" },
  { id: 2, name: "试听" },
  { id: 3, name: "原唱" },
  { id: 4, name: "SQ" },
];
// 数据中 demo和label和最底部的福利属性没有找到
const label = [
  { id: 1, name: "评论过万" },
  { id: 2, name: "收藏过万" },
];

export function Title(title){
  return(
    <View className="interested__top__te">{title}</View>
  )
}
export function bottomMessage(data){
  return(
    <View className="interested__message">
        <View className="interested__message__content">{data}</View>
        <Image src={showMoreImg}  className="interested__message__more" />
      </View>
  )
}
export function getYMD (timestamp) {
  const time = new Date(timestamp)
  const year = time.getFullYear()
  const month = (time.getMonth() + 1).toString().padStart(2, '0')
  const date = (time.getDate()).toString().padStart(2, '0')
  return year + '-' + month + '-' + date ;
}
function formatTime(timestamp) {
  // const time = new Date(timestamp)
  // const m = time.getMinutes()
  // const s = time.getSeconds()
  // console.log(s,'秒说')
  // return m < 10  ? `0${m}` : m + ':' + s ;
        var s;
        var minutes = parseInt((timestamp % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((timestamp % (1000 * 60)) / 1000);
        s = (minutes < 10 ? ('0' + minutes) : minutes) + ':' + (seconds < 10 ? ('0' + seconds) : seconds);
        return s

}
// 歌曲
export function Single(props) {
  const { searchNowList,searchListIndex } = props;
  if (searchNowList && searchNowList.data && searchNowList.data.length > 0 ) {
    return (
      <View className="single" key={searchNowList.nickname} style={{borderRadius:searchListIndex === 0 ? 20 : ''}}>
        <View className="single__top">
          { searchListIndex === 0 && (<View className="single__top__left">歌单</View>)}
          {searchListIndex === 0 && (
            <View className="single__top__right">
              <Image className="single__top__right__play" src={moreImg} />
              <View className="single__top__right__content">播放</View>
            </View>
          )}
        </View>
        {searchNowList.data.map((items,index) => {
          return (
            <View className="single__bottom" key={items.id ? items.id : index}>
              <View className="single__bottom__left" >
                <View className="single__bottom__left__title">
                  {items.name}
                </View>
                <View className="single__bottom__left__vip">
                  {/* label 集合 + 副标题 */}
                  {demo.map((item) => (
                    <View
                      key={item.id}
                      className={`single__bottom__left__vip__label ${
                        item.id === 1 && "single__bottom__left__vip__te"
                      }`}
                    >
                      {item.name}
                    </View>
                  ))}
                  <View className="single__bottom__left__vip__subtitle">
                    {items.ar ? items.ar[0].name + "-" + items.al.name : ""}
                  </View>
                </View>
                <View className="single__bottom__left__label">
                  {label.map((item,index2) => (
                    <View
                      key={index2}
                      className="single__bottom__left__label__content"
                    >
                      {item.name}
                    </View>
                  ))}
                  <View className="single__bottom__left__label__video">
                    {items.alia && items.alia.length > 0 ? items.alia[0] : ""}
                  </View>
                  {/* 评论 */}
                </View>
                {/* 福利 */}
                {/* <View className="single__bottom__left__welfare">
            <View className="single__bottom__left__welfare__label" >福利</View>
            <View className="single__bottom__left__welfare__price">1.0元</View>
            <View className="single__bottom__left__welfare__vip">开通黑胶VIP场所</View>
          </View> */}
              </View>
              <View className="single__bottom__right">
                <Image src={PlayImg} className="single__bottom__right__play" />
                <Image
                  src={PlayMoreImg}
                  className="single__bottom__right__more"
                />
              </View>
            </View>
          );
        })}
        {searchListIndex=== 0 && bottomMessage(searchNowList.moreText)}
      </View>
    );
  } else {
    return <View>暂无数据</View>;
  }
}
// 歌单
export function SongSheet(props) {
  const { searchNowList,searchListIndex } = props;
  if (searchNowList && searchNowList.data&& searchNowList.data.length > 0) {
    return (
      <View className="interested" style={{borderRadius:searchListIndex === 0 ? 20 : ''}} key={searchNowList.nickname}>
        {searchListIndex === 0 && Title('歌单')}
        <View className="interested__bottom">
          {searchNowList.data.map((items,index) => {
            return (
              <View className="interested__bottom__song" key={items.id ? items.id : index}>
                <View className="interested__bottom__song__left">
                  <Image
                    src={items.coverImgUrl}
                    className="interested__bottom__song__left__image"
                  />
                </View>
                <View className="interested__bottom__song__right">
                  <View className="interested__bottom__song__right__title">
                    {items.name}
                  </View>
                  <View className="interested__bottom__song__right__subtitle">
                    {`${items.trackCount}首音乐 by ${items.creator ? items.creator.nickname : ''}, 播放${items.playCount} 万次`}
                  </View>
                  <View className="interested__bottom__song__right__label">
                  {(items.officialTags && items.officialTags.length > 0) ? items.officialTags.map((item, index2) => (
                    <View  key={index2} className="interested__bottom__song__right__label__content">{item}</View>
                  )) : ''}
                  </View>
                </View>
              </View>
            );
          })}
        </View>
        {searchListIndex === 0  && bottomMessage(searchNowList.moreText)}
      </View>
    );
  } else {
    return <View>暂无数据</View>;
  }
}
// 视频
export function Mv(props){
  const {searchNowList,searchListIndex} = props
  if(searchNowList && searchNowList.data &&searchNowList.data.length > 0 ){
    return(
      <View className="interested" style={{borderRadius:searchListIndex === 0 ? 20 : ''}} key={searchNowList.nickname}>
        {searchListIndex === 0 && Title('视频')}
        <View className="interested__bottom">
          {searchNowList.data.map((items,index) => (
            <View className="interested__bottom__mv" key={items.id ? items.id : index}>
            <View className="interested__bottom__mv__left">
            <Image
              src={items.coverUrl}
              className="interested__bottom__mv__left__image"
            />
            <Image
              src={mvPlay}
              className="interested__bottom__mv__left__play"
            />
            </View>
            <View className="interested__bottom__mv__right">
              <View className="interested__bottom__mv__right__title">
                {items.title}
              </View>
              <View className="interested__bottom__mv__right__subtitle">
                {`${formatTime(items.durationms)}，by ${items.creator && items.creator[0].userName}，播放 ${items.playTime} 次`}
              </View>
            </View>
          </View>
          ))}
        </View>
        {searchListIndex === 0 && bottomMessage(searchNowList.moreText)}
        </View>
    )
  }else{
    return(<View>暂无数据</View>)
  }
}

// 歌手
export function Artist(props){
  const {searchNowList,searchListIndex} = props
  if(searchNowList && searchNowList.data &&searchNowList.data.length > 0){
    return(
    <View className="interested" key={searchNowList.nickname}>
        {searchListIndex === 0 && Title('歌手')}
        <View className="interested__bottom">
          {searchNowList.data.map((items,index) => (
            <View className="interested__bottom__singer" key={items.id ? items.id : index}>
            <View className="interested__bottom__singer__left">
              <View className="interested__bottom__singer__left__cover">
                  <Image
                    src={items.img1v1Url}
                    className="interested__bottom__singer__left__cover__image"
                  />
                  {/* <Image
                    src={items.identityIconUrl}
                    className="interested__bottom__singer__left__cover__icon"
                  /> */}
              </View>
              <View className="interested__bottom__singer__left__center">
                <View className="interested__bottom__singer__left__center__top">
                  <View className="interested__bottom__singer__left__center__top__title">
                    {items.name}
                  </View>
                  <View className="interested__bottom__singer__left__center__top__source">
                    {items.alia ? `(${items.alia})` : ''}
                  </View>
                </View>
                {/* 粉丝和歌曲接口没有找到对应属性 */}
                {/* <View className="interested__bottom__singer__left__center__center">
                  粉丝:35.9万，歌曲：1200
                </View> */}
                {/* 它的云圈 移动端没有显示 */}
                {/* <View className="interested__bottom__singer__left__center__bottom">
                  <Image
                    src={yunImg}
                    className="interested__bottom__singer__left__center__bottom__image"
                  />
                  <View className="interested__bottom__singer__left__center__bottom__message">
                    TA的云圈
                  </View>
                  <Image
                    src={yunMoreImg}
                    className="interested__bottom__singer__left__center__bottom__more"
                  />
                </View> */}
              </View>
            </View>
            <View className="interested__bottom__singer__right">
              <Image
                src={yunAddImg}
                className="interested__bottom__singer__right__add"
              />
              <View className="interested__bottom__singer__right__follow">
                关注
              </View>
            </View>
          </View>
          ))}
        </View>
        {searchListIndex === 0 && bottomMessage(searchNowList.moreText)}
    </View>
    )
  }else{
    return(<View>暂无数据</View>)
  }
}
// 云圈
export function Circle (props){
  const {searchNowList,searchListIndex} = props
  if(searchNowList && searchNowList.data && searchNowList.data.length > 0){
    return(
      // <View>云圈</View>\
      <View className="interested" key={searchNowList.nickname}>
      {searchListIndex === 0 && Title('云圈')}
      <View className="interested__bottom" >
        {searchNowList.data.map((items,index) => (
          <View className="interested__bottom__blog" key={items.id ? items.id : index}>
          <View className="interested__bottom__blog__left">
          <Image
            src={items.baseInfo && items.baseInfo.circle.image}
            className="interested__bottom__blog__left__image"
          />
          </View>
          <View className="interested__bottom__blog__right">
            <View className="interested__bottom__blog__right__title">
            {items.baseInfo && items.baseInfo.circle.name}
            </View>
            <View className="interested__bottom__blog__right__subtitle">
              {`${items.baseInfo && items.baseInfo.circle.count.member}人已加入，${items.baseInfo && items.baseInfo.circle.count.read}人阅读`}
            </View>
          </View>
        </View>
        ))}
      </View>
      {searchListIndex === 0 && bottomMessage(searchNowList.moreText)}
      </View>
    )
  }else{
    return(
      <View>暂无数据</View>
    )
  }
}
// 专辑
export function Album(props){
  const {searchNowList,searchListIndex} = props
  if(searchNowList && searchNowList.data && searchNowList.data.length > 0){
    return(
      <View className="interested" key={searchNowList.nickname}>
      {searchListIndex === 0 && Title('专辑')}
      <View className="interested__bottom">
        {searchNowList.data.map((item,index) => (
          <View className="interested__bottom__album" key={item.id ? item.id: index}>
          <Image
            src={item.blurPicUrl}
            className="interested__bottom__album__left"
          />
          <View className="interested__bottom__album__right">
            <View className="interested__bottom__album__right__title">
              {item.name}
            </View>
            <View className="interested__bottom__album__right__subtitle">
              <View className="interested__bottom__album__right__subtitle__name">{item.artist && item.artist.name}</View>
              <View className="interested__bottom__album__right__subtitle__date">{getYMD(item.publishTime)}</View>
            </View>
          </View>
        </View>
        ))}
      </View>
      {searchListIndex === 0 && bottomMessage(searchNowList.moreText)}
    </View>
    )
  }else{
    return(<View>暂无数据</View>)
  }
}

// 用户
export function User(props){
  const {searchNowList,searchListIndex} = props
  if(searchNowList && searchNowList.data && searchNowList.data.length > 0 ){
    return(
      <View className="interested" key={searchNowList.nickname}>
        {searchListIndex === 0 && Title('用户')}
        <View className="interested__bottom">
          {searchNowList.data.map((items,index) => (
            <View className="interested__bottom__singer" key={index}>
            <View className="interested__bottom__singer__left">
              <View className="interested__bottom__singer__left__cover">
                  <Image
                    src={items.avatarUrl ? items.avatarUrl :  items.backgroundUrl}
                    className="interested__bottom__singer__left__cover__image"
                  />
                  <Image
                    src={items.avatarDetail ? items.avatarDetail.identityIconUrl : ''}
                    className="interested__bottom__singer__left__cover__icon"
                  />
              </View>
              <View className="interested__bottom__singer__left__center">
                <View className="interested__bottom__singer__left__center__top">
                  <View className="interested__bottom__singer__left__center__top__title">
                    {items.nickname}
                  </View>
                </View>
                {/* 粉丝和歌曲接口没有找到对应属性 */}
                <View className="interested__bottom__singer__left__center__center">
                  {items.detailDescription}
                </View>
                {/* 它的云圈 移动端没有显示 */}
                {/* <View className="interested__bottom__singer__left__center__bottom">
                  <Image
                    src={yunImg}
                    className="interested__bottom__singer__left__center__bottom__image"
                  />
                  <View className="interested__bottom__singer__left__center__bottom__message">
                    TA的云圈
                  </View>
                  <Image
                    src={yunMoreImg}
                    className="interested__bottom__singer__left__center__bottom__more"
                  />
                </View> */}
              </View>
            </View>
            <View className="interested__bottom__singer__right">
              <Image
                src={yunAddImg}
                className="interested__bottom__singer__right__add"
              />
              <View className="interested__bottom__singer__right__follow">
                关注
              </View>
            </View>
          </View>
          ))}
        </View>
        {searchListIndex === 0 && bottomMessage(searchNowList.moreText)}
      </View>
    )
  }else{
    return(
      <View>暂无数据</View>
    )
  }
}
// 感兴趣
//  接口
export function Interest(props){
  const {searchListRecommend} = props
  if(searchListRecommend){
    console.log(searchListRecommend,1222)
    searchListRecommend.map((item) => {
      console.log(item.name === 'songs')
    })
    return(
    <View className="interested recommend" >
  <View className="interested__top">你可能感兴趣</View>
    {searchListRecommend.map((item,index) => (
      <View key={index} className="interested__bottom recommend__bottom">
        {item.name === 'songs' && (
        <View className="single__bottom" key={item.data.id ? item.data.id : index}>
        <View className="single__bottom__left" >
          <View className="single__bottom__left__title">
            {item.data.name}
          </View>
          <View className="single__bottom__left__vip">
            {/* label 集合 + 副标题 */}
            {demo.map((item2) => (
              <View
                key={item2.id}
                className={`single__bottom__left__vip__label ${
                  item2.id === 1 && "single__bottom__left__vip__te"
                }`}
              >
                {item2.name}
              </View>
            ))}
            <View className="single__bottom__left__vip__subtitle">
              {item.data.album && item.data.album.name }
            </View>
          </View>
          <View className="single__bottom__left__label">
            {label.map((item3,index2) => (
              <View
                key={index2}
                className="single__bottom__left__label__content"
              >
                {item3.name}
              </View>
            ))}
            <View className="single__bottom__left__label__video">
              {item.data.alia && item.data.alia.length > 0 ? item.data.alia[0] : ""}
            </View>
            {/* 评论 */}
          </View>
          {/* 福利 */}
          {/* <View className="single__bottom__left__welfare">
      <View className="single__bottom__left__welfare__label" >福利</View>
      <View className="single__bottom__left__welfare__price">1.0元</View>
      <View className="single__bottom__left__welfare__vip">开通黑胶VIP场所</View>
    </View> */}
        </View>
        <View className="single__bottom__right">
          <Image src={PlayImg} className="single__bottom__right__play" />
          <Image
            src={PlayMoreImg}
            className="single__bottom__right__more"
          />
        </View>
      </View>
      )}
      {item.name === 'artists' && (
      <View className="interested__bottom__singer" key={item.data.id ? item.data.id : index}>
        <View className="interested__bottom__singer__left">
          <View className="interested__bottom__singer__left__cover">
              <Image
                src={item.data.img1v1Url}
                className="interested__bottom__singer__left__cover__image"
              />
              {/* <Image
                src={items.identityIconUrl}
                className="interested__bottom__singer__left__cover__icon"
              /> */}
          </View>
          <View className="interested__bottom__singer__left__center">
            <View className="interested__bottom__singer__left__center__top">
              <View className="interested__bottom__singer__left__center__top__title">
                {item.data.name}
              </View>
              <View className="interested__bottom__singer__left__center__top__source">
                {item.data.alia ? `(${item.data.alia})` : ''}
              </View>
            </View>
            {/* 粉丝和歌曲接口没有找到对应属性 */}
            {/* <View className="interested__bottom__singer__left__center__center">
              粉丝:35.9万，歌曲：1200
            </View> */}
            {/* 它的云圈 移动端没有显示 */}
            {/* <View className="interested__bottom__singer__left__center__bottom">
              <Image
                src={yunImg}
                className="interested__bottom__singer__left__center__bottom__image"
              />
              <View className="interested__bottom__singer__left__center__bottom__message">
                TA的云圈
              </View>
              <Image
                src={yunMoreImg}
                className="interested__bottom__singer__left__center__bottom__more"
              />
            </View> */}
          </View>
        </View>
        <View className="interested__bottom__singer__right">
          <Image
            src={yunAddImg}
            className="interested__bottom__singer__right__add"
          />
          <View className="interested__bottom__singer__right__follow">
            关注
          </View>
        </View>
      </View>
      )}
      {item.name === 'albums' && (
        <View className="interested__bottom__album" key={item.id ? item.id: index}>
        <Image
          src={item.data.artist.picUrl}
          className="interested__bottom__album__left"
        />
        <View className="interested__bottom__album__right">
          <View className="interested__bottom__album__right__title">
            {item.data.name}
          </View>
          <View className="interested__bottom__album__right__subtitle">
            <View className="interested__bottom__album__right__subtitle__name">{item.data.artist && item.data.artist.name}</View>
            <View className="interested__bottom__album__right__subtitle__date">{getYMD(item.data.publishTime)}</View>
          </View>
        </View>
      </View>
      )}
      </View>
    ))}
    {/* <View className="interested__bottom__singer">
      <View className="interested__bottom__singer__left">
        <Image
          src={yunAddImg}
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
              src={yunAddImg}
              className="interested__bottom__singer__left__center__bottom__image"
            />
            <View className="interested__bottom__singer__left__center__bottom__message">
              TA的云圈
            </View>
            <Image
              src={yunAddImg}
              className="interested__bottom__singer__left__center__bottom__more"
            />
          </View>
        </View>
      </View>
      <View className="interested__bottom__singer__right">
        <Image
          src={yunAddImg}
          className="interested__bottom__singer__right__add"
        />
        <View className="interested__bottom__singer__right__follow">
          关注
        </View>
      </View>
    </View> */}
    {/* 专辑 */}
    {/* <View className="interested__bottom__album">
      <View className="interested__bottom__album__left">
      <Image
        src={yunAddImg}
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
    </View> */}
    {/* MV 视频 */}
    {/* <View className="interested__bottom__mv">
      <View className="interested__bottom__mv__left">
      <Image
        src={yunAddImg}
        className="interested__bottom__mv__left__image"
      />
      <Image
        src={yunAddImg}
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
    </View> */}
    {/* 歌单 */}
    {/* <View className="interested__bottom__song">
      <View className="interested__bottom__song__left">
      <Image
        src={yunAddImg}
        className="interested__bottom__song__left__image"
      />
      <Image
        src={yunAddImg}
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
    </View> */}
  {/* </View> */}
    </View>
)
  }else{
    return(<View>暂无数据</View>)
  }
}

// 渲染内容
export function RanderContent (props){
  const newElelemtDom = []
  const {searchNowList,searchListIndex,searchListData} = props
  if(searchNowList){
    if(searchListIndex === 0){
      return Interest(props)
      // searchListData.map((item) => {
      //   switch (item.nickname) {
      //     case 'song':
      //       newElelemtDom.push(Single(props,item))
      //       break;
      //       case 'playList':
      //           newElelemtDom.push(SongSheet(props,item))
      //           break;
      //     default:
      //       newElelemtDom.push([])
      //   }
      // })
      // for(let i = 0 ; i < searchListData.length ; i++){
      //   switch (searchListData[i].nickname) {
      //     case 'song':
      //       // props.setSearchList(searchListData[i])
      //       newElelemtDom.push(Single(props,searchListData[i]))
      //       break;
      //   case 'playList':
      //     // props.setSearchList(searchListData[i])
      //     newElelemtDom.push(SongSheet(props,searchListData[i]))
      //     break;
      //   case 'new_mlog':
      //       // props.setSearchList(searchListData[i])
      //       newElelemtDom.push(Mv(props,searchListData[i]))
      //       break;
      //   case 'artist':
      //     // props.setSearchList(searchListData[i])
      //     newElelemtDom.push(Artist(props,searchListData[i]))
      //     break;
      //   case 'album':
      //     // props.setSearchList(searchListData[i])
      //     newElelemtDom.push(Album(props,searchListData[i]))
      //     break;
      //   case 'circle':
      //     // props.setSearchList(searchListData[i])
      //     newElelemtDom.push(Circle(props,searchListData[i]))
      //     break;
      //   case 'user':
      //     // props.setSearchList(searchListData[i])
      //     newElelemtDom.push(User(props,searchListData[i]))
      //     break;
      //     default:
      //       newElelemtDom.push([])
      //   }
      // }
      return newElelemtDom
    }else{
      switch (searchNowList.nickname) {
        case "song":
          return Single(props)
      case "playList":
        return SongSheet(props)
      case "new_mlog":
        return Mv(props)
      case "artist":
        return Artist(props)
      case "album":
        return Album(props)
      case "circle":
        return Circle(props)
      case "user":
        return User(props)
      default:
        return(<View>暂无数据</View>)
      }
    }
  }else{
    return(
      <View>暂无数据</View>
    )
  }
}
export default {
  Single,
  SongSheet,
  Mv,
  Album,
  Artist,
  Circle,
  User,
  RanderContent
};
