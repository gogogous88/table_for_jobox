import React from "react";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducer from "./redux/reducer";
import CustomTable from "../libs/CustomTable"

const store = createStore(reducer, applyMiddleware(thunk));

const App = () => {
  return (
    <Provider store={store}>
      <CustomTable />
    </Provider>
  );
};

export default App;
