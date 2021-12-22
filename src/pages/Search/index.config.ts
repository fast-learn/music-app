export default process.env.TARO_ENV === 'weapp' ? {
  navigationBarTitleText: '搜索',
  navigationBarBackgroundColor: '#eee',
  navigationBarTextStyle: 'black',
} : {
  navigationStyle: 'custom',
};
