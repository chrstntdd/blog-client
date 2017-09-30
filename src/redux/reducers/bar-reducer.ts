import { SHOW_GREETING } from '../actions/types';
const INITIAL_STATE = {
  waiting: false,
  message: '',
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SHOW_GREETING: {
      return {
        ...state,
        message: action.payload,
      };
    }
    default:
      return state;
  }
}
