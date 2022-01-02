import Taro from '@tarojs/taro';

const BASE_URL = 'https://fast-learn.youbaobao.xyz:8001';

function createUrl(url) {
  if (!url.startsWith('/')) {
    return `${BASE_URL}/${url}`;
  }
  return `${BASE_URL}${url}`;
}

export function get(url, params = {}) {
  return Taro.request({
    url: createUrl(url),
    method: 'GET',
    data: params,
    timeout: 10000,
  }).then(response => {
    // console.log(response);
    return response;
  });
}
