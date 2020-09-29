import { combineReducers } from "redux";
import products from "./products";
import totalRows from "./totalRows";
import filters from "./filters";
import loading from "./loading";

const appReducers = combineReducers({
  products,
  totalRows,
  filters,
  loading,
});

export default appReducers;
