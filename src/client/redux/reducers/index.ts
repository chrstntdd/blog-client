import { combineReducers } from 'redux';
import /**
   * import types to switch on
   */
'../actions/types';

import fooReducer from './foo-reducer';
import barReducer from './bar-reducer';

const rootReducer = combineReducers({
  foo: fooReducer,
  bar: barReducer,
});

export default rootReducer;
