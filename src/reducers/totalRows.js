import getArrDataFilters from "../common/getArrFromFilterKey";
import getArrDataFilterKeyCheckbox from "../common/getArrFronFilterKeyCheckbox";
import * as Types from "../constants/constants";

let initialState = {};

const totalRows = (state = initialState, action) => {
  switch (action.type) {
    case Types.FETCH_TOTALROWS:
      console.log("action totalRows", action);
      state.data = action.data.dataTotalRows;
      let data = [...action.data.dataTotalRows];

      // Get datatype filter
      state.arrTypes = getArrDataFilters(
        data,
        action.data.dataFilterRows.dataTypeChangePage,
        "type"
      ).sort((a, b) => b.value - a.value);

      // Get dataBrand filter
      state.arrBrands = getArrDataFilters(
        data,
        action.data.dataFilterRows.dataBrandChangePage,
        "brand"
      ).sort((a, b) => b.value - a.value);

      // Get dataRating filter
      state.arrRating = getArrDataFilters(
        data,
        action.data.dataFilterRows.dataRateChangePage,
        "rate"
      ).sort((a, b) => b.key - a.key);

      if (
        action.data.dataFilterRows.filterTotalRows.type !== undefined &&
        action.data.dataFilterRows.filterTotalRows.brand !== undefined
      ) {
        state.arrTypes = getArrDataFilterKeyCheckbox(
          data,
          action.data.dataFilterRows.dataTypeChangePage,
          "type"
        ).sort((a, b) => b.value - a.value);
      }

      if (
        action.data.dataFilterRows.filterTotalRows.type !== undefined &&
        action.data.dataFilterRows.filterTotalRows.brand !== undefined &&
        action.data.dataFilterRows.filterTotalRows.rate !== undefined
      ) {
        console.log("test");
        state.arrBrands = getArrDataFilterKeyCheckbox(
          data,
          action.data.dataFilterRows.dataBrandChangePage,
          "brand"
        ).sort((a, b) => b.value - a.value);
      }

      // Get dataPrice filter
      state.arrPrices = data.map((item) => item.price).sort((a, b) => a - b);

      return { ...state };
    default:
      return { ...state };
  }
};

export default totalRows;
