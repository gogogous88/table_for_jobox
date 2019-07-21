import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import _ from "lodash";

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
        {this.renderHeader()}
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
