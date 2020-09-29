import * as Types from "../constants/constants";

let initialState = {};

const products = (state = initialState, action) => {
  switch (action.type) {
    case Types.GET_FILTERS:
      state = action.filters;
      return { ...state };
    case Types.CHANGE_CATEGORY:
      state = action.filters;
      return { ...state };
    case Types.CHANGE_TYPE:
      state = action.filters;
      return { ...state };
    default:
      return { ...state };
  }
};

export default products;
