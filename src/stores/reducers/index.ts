import { combineReducers } from 'redux';
import bottomBar from './bottomBar';
import player from './player'

export default combineReducers({
  bottomBar,
  player
});
