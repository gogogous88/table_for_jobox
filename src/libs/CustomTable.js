import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import _ from "lodash";
import styled from "styled-components";
import HOCTable from "./HOCTable";

const TableHead = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-item: center;
  background-color: hsl(240, 100%, 30%);
  max-width: ${({ tableWidth }) => tableWidth}px;
  span {
    color: #fff;
    padding: 10px;
    width: ${({ columns, tableWidth }) => tableWidth / columns}px;
    font-size: 16px;
  }
`;

const TableBody = styled(TableHead)`
  flex-direction: column;
  span {
    font-size: 14px;
    color: #333;
  }
`;

const RowSpan = styled.span`
  background-color: ${({ isOdd }) =>
    isOdd ? "hsl(240, 100%, 98%)" : "hsl(240, 100%, 96%)"};
`;

const AddButton = styled.button`
  background-color: hsl(240, 100%, 96%);
  padding: 5px;
  border-radius: 5px;
  width: 120px;
  margin: 0 0 5px 0;
`;

const FormButton = styled.button`
  height: 22px;
  border-radius: 5px;
  background-color: #fbfbfb;
`;

const EditButton = styled.div`
  padding: 2px 5px 2px 5px;
  border: 1px solid #333;
  border-radius: 5px;
  background-color: #fbfbfb;
  width: 30px;
  text-align: center;
`;

const CellButton = styled.button`
  margin: 5px 2px 0 0;
`;

const FieldInput = styled.input`
  width: 140px;
  height: 20px;
  border-radius: 5px;
  border: 0;
  margin: 0, 0, 5px, 0;
`;

export const required = value =>
  value || typeof value === "number" ? undefined : "Required";
export const maxLength = max => value =>
  value && value.length > max ? `Must be ${max} characters or less` : undefined;
export const maxLength15 = maxLength(15);
export const minLength = min => value =>
  value && value.length < min ? `Must be ${min} characters or more` : undefined;
export const minLength2 = minLength(2);
export const number = value =>
  value && isNaN(Number(value)) ? "Must be a number" : undefined;
export const minValue = min => value =>
  value && value < min ? `Must be at least ${min}` : undefined;
export const minValue13 = minValue(13);
export const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? "Invalid email address"
    : undefined;
export const tooYoung = value =>
  value && value < 13
    ? "You do not meet the minimum age requirement!"
    : undefined;

export const alphaNumeric = value =>
  value && /[^a-zA-Z0-9 ]/i.test(value)
    ? "Only alphanumeric characters"
    : undefined;
export const phoneNumber = value =>
  value && !/^(0|[1-9][0-9]{9})$/i.test(value)
    ? "Invalid phone number, must be 10 digits"
    : undefined;

class CustomTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      elements: _.mapKeys(this.props.elements, "title"),
      rowIsEditing: -1,
      columnIsEditing: -1
    };
  }

  componentWillMount = () => {
    this.headerArr = [...Object.keys(this.state.elements), "edit"];
  };

  renderHeader = () => {
    return this.headerArr.map((eachTitle, index) => {
      return <span key={index}>{eachTitle}</span>;
    });
  };

  onEditClicked = (rowIndex, columnIndex) => {
    if (this.state.rowIsEditing === -1) {
      columnIndex || typeof columnIndex === "number"
        ? this.setState({ columnIsEditing: columnIndex })
        : this.setState({ columnIsEditing: -1 });
      this.setState({ rowIsEditing: rowIndex });
      this.props.rowIsEditing(rowIndex);
    }
  };

  renderField = ({ input, label, type, meta: { touched, error, warning } }) => {
    return (
      <span>
        <FieldInput {...input} type={type} />
        {touched &&
          ((error && <span>{error}</span>) ||
            (warning && <span>{warning}</span>))}
      </span>
    );
  };

  renderEachCell = (eachRow, rowIndex) => {
    eachRow = { ...eachRow, edit: "edit" };

    const { rowIsEditing, columnIsEditing } = this.state;
    const { elements } = this.state;

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
                <div style={{ margin: 5 }}>
                  <CellButton>confirm</CellButton>
                  <CellButton
                    type="button"
                    onClick={() => {
                      const { reset, InitialValues } = this.props;
                      reset(InitialValues);
                      this.setState({ rowIsEditing: -1, columnIsEditing: -1 });
                    }}
                  >
                    cancel
                  </CellButton>
                </div>
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
              <EditButton
                style={{ cursor: "pointer" }}
                type="button"
                onClick={() => this.onEditClicked(rowIndex)}
              >
                edit
              </EditButton>
            ) : (
              <FormButton type="submit">save</FormButton>
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

  onAddClicked = () => {
    if (this.state.rowIsEditing === -1) {
      this.props.reset({});

      this.setState({
        rowIsEditing: this.props.tableValues.length,
        columnIsEditing: -1
      });
      this.props.onAddClicked();

      this.props.rowIsEditing(-1);
    }
  };

  render() {
    return (
      <div>
        <AddButton onClick={this.onAddClicked}>Add Row</AddButton>
        <TableHead
          columns={this.headerArr.length}
          tableWidth={this.props.tableWidth}
        >
          {this.renderHeader()}
        </TableHead>
        <TableBody
          columns={this.headerArr.length}
          tableWidth={this.props.tableWidth}
        >
          {this.renderBody()}
        </TableBody>
      </div>
    );
  }
}
CustomTable = reduxForm({
  form: "customTable",
  keepDirtyOnReinitialize: true,
  enableReinitialize: true
  // validate
})(CustomTable);

export default HOCTable(CustomTable);
