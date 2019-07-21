import React, { Component } from "react";
import CustomTable, {
  required,
  maxLength,
  email,
  number,
  phoneNumber
} from "../../libs/CustomTable";
import { connect } from "react-redux";
import { saveRow } from "../redux/actions";

export const aol = value =>
  value && /.+@aol\.com/.test(value)
    ? "Really? You still use AOL for your email?"
    : undefined;

class SampleTable extends Component {
  state = { tableElements: this.props.tableElements };

  componentWillReceiveProps = newProps => {
    this.props.tableElements !== newProps.tableElements &&
      this.setState({ tableElements: newProps.tableElements });
  };

  submit = (values, rowIndex) => {
    this.props.saveRow(values, rowIndex);
  };

  render() {
    return (
      <CustomTable
        handleRowSubmit={this.submit}
        elements={[
          { title: "name", validating: [required, maxLength(10)] },
          { title: "age", validating: [number], warning: number },
          {
            title: "email",
            validating: [required, email],
            warning: aol
          },
          {
            title: "phone",
            validating: [required, phoneNumber],
            warning: phoneNumber
          }
        ]}
        tableValues={this.state.tableElements}
        tableWidth={1200}
      />
    );
  }
}

const mapStateToProps = ({ tableElements }) => ({ tableElements });

export default connect(
  mapStateToProps,
  { saveRow }
)(SampleTable);
