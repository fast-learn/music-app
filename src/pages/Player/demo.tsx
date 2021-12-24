// import shakeAudio from 'http://localhost:8091/mp3/1903299149.mp3';
// import resultAudio from 'http://localhost:8091/mp3/1897658456.mp3';
import Taro, { InnerAudioContext } from '@tarojs/taro';

const audioMap = {
  // shakeAudio,
  // resultAudio
};

type Key = keyof typeof audioMap;

interface Custom extends InnerAudioContext {
  /** 有没有销毁过 */
  destroyed: boolean;
}

const createInnerAudioContext = Taro.createInnerAudioContext as () => Custom;

const { platform } = Taro.getSystemInfoSync();
const isIos = platform.toLocaleLowerCase() === 'ios';

export const audioUtil = (types: Key[]) => {
  return types.reduce<InnerAudioContext[]>((result, item) => {
    if (audioMap[item]) {
      const audio = createInnerAudioContext();
      audio.src = audioMap[item];

      if (isIos) {
        let newAudio: Custom;

        audio.play = function () {
          if (audio.destroyed) {
            return newAudio.play();
          }
          audio.destroy();
          audio.destroyed = true;
          newAudio = createInnerAudioContext();
          newAudio.src = audio.src;
          newAudio.play();
        };
      }

      result.push(audio);
    }

    return result
  }, [])
}
