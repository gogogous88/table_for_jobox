import React, { Component } from "react";

const HOCTable = OriginalTable => {
  class NewTable extends Component {
    state = { rowIsEditing: -1, tableValues: this.props.tableValues };
    onAddClicked = () => {
      this.setState({ tableValues: [...this.state.tableValues, {}] });
    };

    componentWillReceiveProps = newProps =>
      this.props.tableValues !== newProps.tableValues &&
      this.setState({ tableValues: newProps.tableValues });

    render() {
      const { rowIsEditing } = this.state;
      const initialValues =
        rowIsEditing === -1 ? {} : this.props.tableValues[rowIsEditing];

      return (
        <OriginalTable
          {...{ ...this.props, tableValues: this.state.tableValues }}
          rowIsEditing={rowIndex => {
            this.setState({ rowIsEditing: rowIndex });
          }}
          {...{ initialValues }}
          onAddClicked={this.onAddClicked}
        />
      );
    }
  }

  return NewTable;
};

export default HOCTable;
