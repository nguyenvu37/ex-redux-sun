import * as Types from "../constants/constants";

let initialState = false;

const products = (state = initialState, action) => {
  switch (action.type) {
    case Types.LOADING:
      state = action.loading;
      return state;
    default:
      return state;
  }
};

export default products;
