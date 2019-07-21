import { EDITROW } from "./types";

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
