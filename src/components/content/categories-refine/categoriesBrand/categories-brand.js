import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  actFetchProductsRequest,
  actFetchTotalRowsRequest,
} from "../../../../actions/action";

function CategoriesBrand(props) {
  const { arrBrands, filters, fetchData, fetChTotalRows } = props;
  const [dataBrand, setDataBrand] = useState([]);

  useEffect(() => {
    if (arrBrands) setDataBrand([...arrBrands]);
  }, [arrBrands]);

  const handleBrand = (e, id) => {
    let checkedBrand = e.target.checked;
    let dataCheckedBrands = dataBrand.map((item) => {
      if (item.id === id) {
        item.select = checkedBrand;
      }
      return item;
    });
    let dataCheckedBrand = dataCheckedBrands.filter(
      (item) => item.select === true
    );
    let typeString = dataCheckedBrand.map((item) => item.key);
    let dataFilterRows = {
      filterTotalRows: { ...filters, brand: typeString, _page: "", _limit: "" },
      dataTypeChangePage: [],
      dataBrandChangePage: [...dataBrand],
      dataRateChangePage: [],
    };

    fetchData({
      ...filters,
      brand: typeString,
    });

    fetChTotalRows({
      ...dataFilterRows,
    });
  };

  return (
    <div className="facet__item">
      <div className="facet__item__title">Brand</div>
      <div className="facet__item__list list-brand">
        {dataBrand.map((item, index) => {
          return (
            <div className="facet__item__list__name" key={index + 100}>
              <input
                type="checkbox"
                checked={item.select}
                id={index + 100}
                onChange={(e) => handleBrand(e, item.id)}
              />
              <label htmlFor={index + 100}>{item.key}</label>
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
    arrBrands: state.totalRows.arrBrands,
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

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesBrand);
