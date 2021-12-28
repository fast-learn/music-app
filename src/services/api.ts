import { get } from '@/services';
import { isAndroid, isIOS } from '@/utils';

function wrapper(data) {
  return data.map((item) => {
    if (item.imageUrl) {
      item.imageUrlWithHttps = 'https' + item.imageUrl.split('http')[1];
    } else if (item.pic) {
      item.imageUrlWithHttps = 'https' + item.pic.split('http')[1];
    } else if (item.song.album.picUrl) {
      item.imageUrlWithHttps = 'https' + item.song.album.picUrl.split('http')[1];
    } else if (item.picUrl) {
      item.imageUrlWithHttps = 'https' + item.picUrl.split('http')[1];
    }
    return item;
  });
}

/**
 * 获取首页Banner数据
 *
 * @params type:
 *    0: pc
 *    1: android
 *    2: iphone
 *    3: ipad
 */
export function getBanner() {
  let type = 0;
  if (isAndroid()) {
    type = 1;
  } else if (isIOS()) {
    type = 2;
  }
  return get('/banner', {
    type,
  }).then(response => wrapper(response.data.banners));
}

/**
 * 获取每日推荐歌单（需要登录）
 */
export function getRecommendResource() {
  return get('/recommend/resource').then(response => response.data.result);
}

/**
 * 获取推荐歌单（无需登录）
 */
export function getPersonalized() {
  return get('/personalized', { limit: 10 }).then(response => response.data.result);
}

/**
 * 获取推荐歌曲（无需登录）
 */
export function getPersonalizedNewsong(limit = 6) {
  return get('/personalized/newsong', { limit }).then(response => wrapper(response.data.result));
}

/**
 * 获取默认搜索关键词
 */
export function getSearchDefault() {
  return get('/search/default').then(response => response.data.data);
}

/**
 * 搜索词联想
 */
export function getSearchSuggest(keywords) {
  return get('/search/suggest', {
    keywords,
    type: 'mobile',
  }).then(response => response.data.result);
}

/**
 * 获取热门搜索关键词
 *
 */
export function getSearchHot() {
  return get('/search/hot').then(response => response.data.result.hots);
}

/**
 * 搜索接口
 *
 * 必选参数 :
 *  keywords : 关键词
 * 可选参数 :
 *  limit : 返回数量 , 默认为 30
 *  offset : 偏移数量，用于分页 , 默认为 0
 *  type: 搜索类型；默认为 1 即单曲 , 取值意义 :
 *    1: 单曲,
 *    10: 专辑,
 *    100: 歌手,
 *    1000: 歌单,
 *    1002: 用户,
 *    1004: MV,
 *    1006: 歌词,
 *    1009: 电台,
 *    1014: 视频,
 *    1018: 综合
 */
export function search(keywords, { type = 1, limit = 20, offset = 0 }) {
  return get('/search', { keywords, type, limit, offset }).then(response => response.data.result);
}

/**
 * 综合搜索
 */
export function getSearchList(keywords,type){
  return get('/search',{
    type,
    keywords
  }).then(response => response.data.result);
}
/**
 * 搜索推荐
 */
 export function getSearchListRecommend(keywords){
  return get('/search/suggest',{
    keywords
  }).then(response => response.data.result);
}