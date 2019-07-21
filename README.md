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
