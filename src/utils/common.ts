/*
 * @Author: qiuz
 * @Github: <https://github.com/qiuziz>
 * @Date:  2020-12-30 22:12:43
 * @Last Modified by: qiuz
 */

import Taro from '@tarojs/taro';

export const getStorageData = async (key: string) => {
  let result: any;
  try {
    const { data } = await Taro.getStorage({ key });
    result = data;
  } catch (error) {
    console.log(error);
  }
  return result;
};

// num为传入的值，n为保留的小数位
export const fomatFloat = (num: number | string, n: number) => {
  let f = parseFloat(num as string);
  if (Number.isNaN(f)) {
    return false;
  }
  f = Math.round((num as number) * Math.pow(10, n)) / Math.pow(10, n); // n 幂
  return f;
};

export const wrapperClassName = (className, index, length) => {
  return `${className}${index === length - 1 ? ` ${className}--last` : (index === 0 ? ` ${className}--first` : ` ${className}--${index}`)}`;
};

export const showAlert = (msg) => {
  if (IS_WEAPP) {
    Taro.showModal({
      title: '提示',
      content: msg,
    });
  } else {
    alert(msg);
  }
};

export const omit = (obj = {}, fields = []) => {
  const shallowCopy = Object.assign({}, obj);
  fields.forEach((key) => {
    delete shallowCopy[key];
  });
  return shallowCopy;
};

// @ts-ignore
export const noop = (...args) => {
};

export const formatNumber = (n, l = 0) => +(Number(n).toFixed(l));

export const equal = (a, b) => formatNumber(a, 2) === formatNumber(b, 2);

export const lt = (a, b) => formatNumber(a, 2) < formatNumber(b, 2);
export const lte = (a, b) => formatNumber(a, 2) <= formatNumber(b, 2);
export const gt = (a, b) => formatNumber(a, 2) > formatNumber(b, 2);
export const gte = (a, b) => formatNumber(a, 2) >= formatNumber(b, 2);
