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
export async function getPersonalized() {
  return get('/personalized', { limit: 13 }).then(response => response.data.result);
}

/**
 * 获取推荐歌曲（无需登录）
 */
export async function getPersonalizedNewsong(limit = 9) {
  return get('/personalized/newsong', { limit }).then(response => wrapper(response.data.result));
}
