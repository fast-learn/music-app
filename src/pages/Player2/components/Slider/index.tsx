import { Slider } from '@tarojs/components';

let SliderRN;
if (IS_RN) {
  SliderRN = require('@miblanchard/react-native-slider').Slider;
}

export default function PlayerSlider(props) {
  const { duration = 0, currentTime = 0 } = props;
  console.log('slider', props);
  return IS_RN ? (
    <SliderRN
      step={1}
      value={currentTime || 0}
      trackClickable
      minimumValue={0}
      maximumValue={duration || 0}
      minimumTrackTintColor="rgba(255,255,255,0.5)"
      maximumTrackTintColor="rgba(255,255,255,0.2)"
      thumbTintColor="white"
      thumbStyle={{ width: 10, height: 10 }}
      trackStyle={{ height: 2 }}
    />
  ) : (
    <Slider
      step={1}
      value={currentTime}
      min={0}
      max={duration}
      backgroundColor="rgba(255,255,255,0.2)"
      activeColor="rgba(255,255,255,0.5)"
      blockSize={10}
      className="player-bottom__bottom__center__progress__Slider"
    />
  );
}
