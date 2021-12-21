export default process.env.TARO_ENV === 'weapp' ? {
  navigationBarTitleText: '贝米音乐',
  navigationBarBackgroundColor: '#eee',
  navigationBarTextStyle: 'black',
} : {
  navigationStyle: 'custom',
};
