import { combineReducers } from "redux";
import { reducer as formReducer } from 'redux-form'

const reducers = combineReducers({
  // ... your other reducers here ...
  form: formReducer
});

export default reducers;
