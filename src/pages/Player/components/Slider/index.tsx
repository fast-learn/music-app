import { Slider } from '@tarojs/components';

let SliderRN;
if (IS_RN) {
  SliderRN = require('@miblanchard/react-native-slider').Slider;
}

export default function PlayerSlider(props) {
  const {
    duration = 0,
    currentTime = 0,
    volume,
    isSeeking,
    seek,
    seeking,
    type = 'seek',
    volumeChange,
    volumeChanging,
  } = props;

  function isSetSeek() {
    return type === 'seek';
  }

  const step = isSetSeek() ? 1 : 0.01;
  const value = isSetSeek() ? currentTime || 0 : volume || 0;
  const maximumValue = isSetSeek() ? duration || 0 : 1; // volume范围为0~1
  const thumbStyle = isSetSeek() ? (isSeeking ? { width: 16, height: 16 } : { width: 10, height: 10 }) : { width: 10, height: 10 };
  const trackStyle = isSetSeek() ? (isSeeking ? { height: 4 } : { height: 2 }) : { height: 2 };
  const blockSize = isSetSeek() ? (isSeeking ? 16 : 10) : 10;

  return IS_RN ? (
    <SliderRN
      step={step}
      value={value}
      trackClickable
      minimumValue={0}
      maximumValue={maximumValue}
      minimumTrackTintColor="rgba(255,255,255,0.5)"
      maximumTrackTintColor="rgba(255,255,255,0.2)"
      thumbTintColor="white"
      thumbStyle={thumbStyle}
      trackStyle={trackStyle}
      onValueChange={type === 'seek' ? seeking : volumeChanging}
      onSlidingStart={type === 'seek' ? seeking : volumeChanging}
      onSlidingComplete={type === 'seek' ? seek : volumeChange}
    />
  ) : (
    <Slider
      step={step}
      value={value}
      min={0}
      max={maximumValue}
      backgroundColor="rgba(255,255,255,0.2)"
      activeColor="rgba(255,255,255,0.5)"
      blockSize={blockSize}
      onChange={type === 'seek' ? seek : volumeChange}
      onChanging={type === 'seek' ? seeking : volumeChanging}
      className="player-bottom__bottom__center__progress__Slider"
    />
  );
}
