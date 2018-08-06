import { combineReducers } from 'redux';
import VisibilityReducer from './reducer_visibility';

const rootReducer = combineReducers({
  visibility: VisibilityReducer
});

export default rootReducer;
 