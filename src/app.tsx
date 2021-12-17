import { Component } from 'react';
import { View } from '@tarojs/components';

import './app.scss';

class App extends Component {

  componentDidMount() {
  }

  componentDidShow() {
  }

  componentDidHide() {
  }

  componentDidCatchError() {
  }

  // this.props.children 是将要会渲染的页面
  render() {
    return <View className="app">this.props.children</View>;
  }
}

export default App;
