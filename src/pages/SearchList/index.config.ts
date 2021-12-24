export default process.env.TARO_ENV === 'weapp' ? {
  navigationBarTitleText: '搜索结果',
  navigationBarBackgroundColor: '#eee',
  navigationBarTextStyle: 'black',
} : {
  navigationStyle: 'custom',
};
