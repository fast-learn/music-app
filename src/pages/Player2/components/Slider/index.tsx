import { Slider } from '@tarojs/components';

let SliderRN;
if (IS_RN) {
  SliderRN = require('@miblanchard/react-native-slider').Slider;
}

export default function PlayerSlider() {
  return IS_RN ? (
    <SliderRN
      step={1}
      value={20}
      trackClickable
      minimumValue={0}
      maximumValue={100}
      minimumTrackTintColor="rgba(255,255,255,0.5)"
      maximumTrackTintColor="rgba(255,255,255,0.2)"
      thumbTintColor="white"
      thumbStyle={{ width: 10, height: 10 }}
      trackStyle={{ height: 2 }}
    />
  ) : (
    <Slider
      step={1}
      value={20}
      backgroundColor="rgba(255,255,255,0.2)"
      activeColor="rgba(255,255,255,0.5)"
      blockSize={10}
      className="player-bottom__bottom__center__progress__Slider"
      max={100}
    />
  )
}
