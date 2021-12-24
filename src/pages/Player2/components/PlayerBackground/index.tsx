import { View } from '@tarojs/components';

export default function PlayerBackground(props) {
  let ImageBackground = null;
  if (IS_RN) {
    ImageBackground = require('react-native').ImageBackground;
  }
  return IS_RN ? (
    // @ts-ignore
    <ImageBackground
      style={{ flex: 1 }}
      source={{ uri: 'https://fast-learn-oss.youbaobao.xyz/music/player_bg.png' }}
      resizeMode="cover"
    >
      {props.chidlren}
    </ImageBackground>
  ) : (
    <View
      className="player"
      style={{
        height: '100vh',
        backgroundImage: 'url("https://fast-learn-oss.youbaobao.xyz/music/player_bg.png")',
        backgroundSize: '100% 100%',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {props.children}
    </View>
  );
}
