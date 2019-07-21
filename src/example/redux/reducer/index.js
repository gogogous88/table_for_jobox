import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import rowElementsReducer from "./rowElementsReducer";
import tableElementsReducer from "./tableElementsReducer";

const reducers = combineReducers({
  rowElements: rowElementsReducer,
  tableElements: tableElementsReducer,
  form: formReducer
});

export default reducers;
