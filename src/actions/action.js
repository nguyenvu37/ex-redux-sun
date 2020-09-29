import callApi from "../common/callApi";
import * as Types from "../constants/constants";
import queryString from "query-string";

export const actFetchProductsRequest = (filters) => {
  const paramString = queryString.stringify(filters);
  return (dispatch) => {
    return callApi(`products?${paramString}`, "get", null).then((res) => {
      if (res && res.data && res.status === 200) {
        dispatch(actFetchProducts([...res.data]));
        dispatch(actGetFilters(filters));
        dispatch(actChangeCategory(filters));
      } else dispatch(actLoading(true));
    });
  };
};

export const actFetchProducts = (products) => {
  return {
    type: Types.FETCH_PRODUCTS,
    products,
  };
};

export const actFetchTotalRowsRequest = (dataFilterRows) => {
  const paramTotalRows = queryString.stringify(dataFilterRows.filterTotalRows);
  return (dispatch) => {
    return callApi(`products?${paramTotalRows}`, "get", null).then((res) => {
      if (res && res.data && res.status === 200) {
        dispatch(
          actFetchTotalRows({
            dataTotalRows: [...res.data],
            dataFilterRows: dataFilterRows,
          })
        );
      }
    });
  };
};

export const actFetchTotalRows = (data) => {
  return {
    type: Types.FETCH_TOTALROWS,
    data,
  };
};

export const actGetFilters = (filters) => {
  return {
    type: Types.GET_FILTERS,
    filters,
  };
};

export const actChangeCategory = (filters) => {
  return {
    type: Types.CHANGE_CATEGORY,
    filters,
  };
};

export const actChangeType = (filters) => {
  return {
    type: Types.CHANGE_TYPE,
    filters,
  };
};

export const actLoading = (loading) => {
  return {
    type: Types.LOADING,
    loading,
  };
};
