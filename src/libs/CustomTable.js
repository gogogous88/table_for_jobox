import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";

class CustomTable extends Component {
  render() {
    const { handleSubmit, handleValueSubmit } = this.props;
    return (
      <form
        onSubmit={handleSubmit(values => {
          handleValueSubmit(values);
        })}
      >
        <div>
          <label htmlFor="firstName">First Name</label>
          <Field name="firstName" component="input" type="text" />
        </div>
        <div>
          <label htmlFor="lastName">Last Name</label>
          <Field name="lastName" component="input" type="text" />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <Field name="email" component="input" type="email" />
        </div>
        <button type="submit">Submit</button>
      </form>
    );
  }
}

CustomTable = reduxForm({
  // a unique name for the form
  form: "contact"
})(CustomTable);

export default CustomTable;
