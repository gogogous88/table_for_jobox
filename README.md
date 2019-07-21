### DEPENDENCY NAME: table_for_jobox

### installaction and start

### `yarn`

### `yarn start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### Documentation:

This Table Dependency is an extension of redux-form

### Prop Types:

|    Property     |   Type   | Required? |                                                                                    Discription                                                                                    |
| :-------------: | :------: | :-------: | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
|   tableValues   |  array   |    yes    |                                                  map list of items with key: value pairs. e.g. [{name: 'marc', age: 34,...},...]                                                  |
|    elements     |  array   |    yes    | map list of headers with name, validating and warning. e.g. [{ title: "name", validating: [required, maxLength(10)] },...] (check the following table for validating and warning) |
|   tableWidth    |  number  |           |                                                                                max-width of table                                                                                 |
| handleRowSubmit | function |    yes    |                                            form submit callback (values, rowIndex), use values and rowIndex to update the tableValues                                             |

### Prop Types for validation and warning:

default validations:

```

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

```

TIPS: YOU CAN ALSO ADD YOUR OWN Validation Method IN THE CODE, such as in the example:

````

const aol = value =>
  value && /.+@aol\.com/.test(value)
    ? "Really? You still use AOL for your email?"
    : undefined;

    ```
````
