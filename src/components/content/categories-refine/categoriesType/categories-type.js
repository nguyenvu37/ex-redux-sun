import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  actFetchProductsRequest,
  actFetchTotalRowsRequest,
} from "../../../../actions/action";

function CategoriesType(props) {
  const { arrTypes, filters, fetchData, fetChTotalRows } = props;
  const [dataType, setDataType] = useState([]);

  useEffect(() => {
    if (arrTypes) setDataType([...arrTypes]);
  }, [arrTypes]);

  function handleType(e, id) {
    let checked = e.target.checked;
    let dataCheckeds = dataType.map((item) => {
      if (item.id === id) {
        item.select = checked;
      }
      return item;
    });
    let dataChecked = dataCheckeds.filter((item) => item.select === true);
    let typeString = dataChecked.map((item) => item.key);

    let dataFilterRows = {
      filterTotalRows: { ...filters, type: typeString, _page: "", _limit: "" },
      dataTypeChangePage: [...dataType],
      dataBrandChangePage: [],
      dataRateChangePage: [],
    };

    setDataType(dataCheckeds);
    fetchData({
      ...filters,
      type: typeString,
    });

    fetChTotalRows({
      ...dataFilterRows,
    });
  }

  return (
    <div className="facet__item">
      <div className="facet__item__title">Type</div>
      <div className="facet__item__list list-type">
        {dataType.map((item, index) => {
          return (
            <div className="facet__item__list__name" key={index}>
              <input
                type="checkbox"
                checked={item.select}
                id={index}
                onChange={(e) => handleType(e, item.id)}
              />
              <label htmlFor={index}>{item.key}</label>
              <span className="facet-count">({item.value})</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    arrTypes: state.totalRows.arrTypes,
    arrBrands: state.totalRows.arrBrands,
    arrRating: state.totalRows.arrRating,
    filters: state.filters,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: (filters) => {
      dispatch(actFetchProductsRequest(filters));
    },
    fetChTotalRows: (totalRows) => {
      dispatch(actFetchTotalRowsRequest(totalRows));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesType);
