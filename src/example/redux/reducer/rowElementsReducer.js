import { EDITROW } from "../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case EDITROW:
      return action.payload;
      break;

    default:
      return state;
      break;
  }
};
