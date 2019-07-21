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

const TableBody = styled(TableHead)`
  flex-direction: column;
  span {
    font-size: 12px;
    color: #333;
  }
`;

const RowSpan = styled.span`
  background-color: ${({ isOdd }) =>
    isOdd ? "hsl(240, 100%, 98%)" : "hsl(240, 100%, 96%)"};
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

  renderEachCell = (eachRow, rowIndex) => {
    eachRow = { ...eachRow, edit: "edit" };

    const { rowIsEditing, columnIsEditing } = this.state;
    const { elements } = this.props;

    return this.headerArr.map((eachTitle, columnIndex) => {
      const validate =
        elements[eachTitle] && elements[eachTitle]["validating"]
          ? { validate: elements[eachTitle]["validating"] }
          : { validate: [] };

      const warn =
        elements[eachTitle] && elements[eachTitle]["warning"]
          ? { warn: elements[eachTitle]["warning"] }
          : {};
      if (eachTitle !== "edit") {
        if (rowIsEditing === rowIndex) {
          if (columnIsEditing === columnIndex) {
            return (
              <RowSpan isOdd={rowIndex % 2 === 1} key={columnIndex}>
                <Field
                  name={eachTitle}
                  component={props => this.renderField(props)}
                  type="text"
                  {...validate}
                  {...warn}
                />
                <RowSpan style={{ margin: 5 }}>
                  <button>confirm</button>
                  <button
                    type="button"
                    onClick={() => {
                      const { reset, InitialValues } = this.props;
                      reset(InitialValues);
                      this.setState({ rowIsEditing: -1, columnIsEditing: -1 });
                    }}
                  >
                    cancel
                  </button>
                </RowSpan>
              </RowSpan>
            );
          } else if (columnIsEditing === -1) {
            return (
              <RowSpan isOdd={rowIndex % 2 === 1} key={columnIndex}>
                <Field
                  name={eachTitle}
                  component={props => this.renderField(props)}
                  type="text"
                  {...validate}
                  {...warn}
                />
              </RowSpan>
            );
          } else {
            return (
              <RowSpan
                isOdd={rowIndex % 2 === 1}
                key={columnIndex}
                style={{ cursor: "pointer" }}
                onClick={() => {
                  this.onEditClicked(rowIndex, columnIndex);
                }}
              >
                {eachRow[eachTitle]}
              </RowSpan>
            );
          }
        } else {
          return (
            <RowSpan
              isOdd={rowIndex % 2 === 1}
              key={columnIndex}
              style={{ cursor: "pointer" }}
              onClick={() => {
                this.onEditClicked(rowIndex, columnIndex);
              }}
            >
              {eachRow[eachTitle]}
            </RowSpan>
          );
        }
      } else {
        return (
          <RowSpan isOdd={rowIndex % 2 === 1} key={columnIndex}>
            {this.state.rowIsEditing !== rowIndex ? (
              <div
                style={{ cursor: "pointer" }}
                type="button"
                onClick={() => this.onEditClicked(rowIndex)}
              >
                edit
              </div>
            ) : (
              <button type="submit">save</button>
            )}
          </RowSpan>
        );
      }
    });
  };

  renderBody = () => {
    return this.props.tableValues.map((eachRow, rowIndex) => {
      return (
        <form
          onSubmit={this.props.handleSubmit(values => {
            this.setState({ rowIsEditing: -1 });
            this.props.handleRowSubmit(values, rowIndex);
          })}
          style={{ display: "flex", flexDirection: "row" }}
          key={rowIndex}
        >
          {this.renderEachCell(eachRow, rowIndex)}
        </form>
      );
    });
  };

  render() {
    return (
      <div>
        <TableHead>{this.renderHeader()}</TableHead>
        <TableBody>{this.renderBody()}</TableBody>
      </div>
    );
  }
}

CustomTable = reduxForm({
  // a unique name for the form
  form: "contact"
})(CustomTable);

export default CustomTable;
