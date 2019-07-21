import { SAVEAROW} from "../actions/types";

const initState = [];

export default (state = initState, action) => {
  switch (action.type) {
    case SAVEAROW:
      if (state[action.payload.rowIndex]) {
        state[action.payload.rowIndex] = action.payload.values;
      } else {
        state = [...state, action.payload.values];
      }

      return state;
      break;

    default:
      return state;
      break;
  }
};
