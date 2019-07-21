import React from "react";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducer from "./redux/reducer";
import CustomTable from "../libs/CustomTable";

const store = createStore(reducer, applyMiddleware(thunk));

const App = () => {
  const handleSubmit = values => console.log({ values });
  return (
    <Provider store={store}>
      <CustomTable
        handleValueSubmit={handleSubmit}
        elements={[
          { title: "name" },
          { title: "age" },
          { title: "email" },
          { title: "phone" }
        ]}
        tableValues={[
          {
            name: "marcmoo",
            age: 35,
            email: "markblueplan@gmail.com",
            phone: "3478286553"
          }
        ]}
      />
    </Provider>
  );
};

export default App;
