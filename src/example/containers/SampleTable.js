import React, { Component } from "react";
import CustomTable from "../../libs/CustomTable";

export default class SampleTable extends Component {
  handleSubmit = values => console.log({ values });
  render() {
    return (
      <CustomTable
        handleValueSubmit={this.handleSubmit}
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
    );
  }
}
