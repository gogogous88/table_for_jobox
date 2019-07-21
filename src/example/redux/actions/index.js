import { SAVEAROW, EDITROW } from "./types";

export const saveRow = (values, rowIndex) => dispatch => {
  dispatch({ type: SAVEAROW, payload: { values, rowIndex } });
};

export const editRow = data => dispatch =>
  dispatch({ type: EDITROW, payload: data });
