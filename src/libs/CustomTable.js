import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import _ from "lodash";
import styled from "styled-components";

const TableHead = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-item: center;
  background-color: hsl(240, 100%, 30%);
  max-width: 1000px;
  span {
    color: #fff;
    padding: 10px;
    width: 200px;
    font-size: 16px;
  }
`;

class CustomTable extends Component {
  constructor(props) {
    super(props);
    this.state = { elements: _.mapKeys(this.props.elements, "title") };
  }

  componentWillMount = () => {
    this.headerArr = [...Object.keys(this.state.elements), "edit"];
  };

  renderHeader = () => {
    return this.headerArr.map((eachTitle, index) => {
      return <span key={index}>{eachTitle}</span>;
    });
  };

  renderBody = () => {
    const { handleSubmit, handleValueSubmit } = this.props;
    return (
      <form
        onSubmit={handleSubmit(values => {
          handleValueSubmit(values);
        })}
      >
        <div>
          <Field
            name="firstName"
            component="input"
            type="text"
            placeholder="First Name"
          />
        </div>
      </form>
    );
  };

  render() {
    return (
      <div>
        <TableHead>{this.renderHeader()}</TableHead>
        {this.renderBody()}
      </div>
    );
  }
}

CustomTable = reduxForm({
  // a unique name for the form
  form: "contact"
})(CustomTable);

export default CustomTable;
