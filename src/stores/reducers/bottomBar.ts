import { CHANGE_BOTTOM_BAR_INDEX } from '../constants';

const INITIAL_STATE = {
  selectIndex: 0,
};

export default function bottomBar(state = INITIAL_STATE, action) {
  switch (action.type) {
    case CHANGE_BOTTOM_BAR_INDEX:
      return {
        ...state,
        selectIndex: action.payload.index || 0,
      };
    default:
      return state;
  }
}
