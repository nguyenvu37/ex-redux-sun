import React from "react";
import { connect } from "react-redux";
import {
  actFetchProductsRequest,
  actFetchTotalRowsRequest,
} from "../../../../actions/action";
import convertArrRate from "../../../../common/convertArrRate";

function CategoriesRate(props) {
  const { filters, arrRating, fetchData, fetChTotalRows } = props;
  let itemRate = arrRating
    ? arrRating.map((rate) => convertArrRate(rate.key))
    : [];

  const handleChangeRating = (data) => {
    // onChangeRate(data);
    let dataFilterRows = {
      filterTotalRows: { ...filters, rate: data, _page: "", _limit: "" },
      dataTypeChangePage: [],
      dataBrandChangePage: [],
      dataRateChangePage: [...arrRating],
    };

    fetchData({
      ...filters,
      rate: data,
    });

    fetChTotalRows({
      ...dataFilterRows,
    });
  };

  return (
    <div className="facet__item">
      <div className="facet__item__title">Ratings</div>
      <div className="facet__item__list">
        {itemRate.map((item, index) => {
          return (
            <div className="facet__item__list__rating" key={index}>
              <div
                className="facet__item__list__rating__star"
                onClick={() => handleChangeRating(arrRating[index].key)}
              >
                {item.map((r, i) => {
                  return <i className={`${r} fa-star`} key={i}></i>;
                })}
              </div>
              <div className="facet__item__list__rating__count">
                &amp; Up
                <span className="facet-count">{arrRating[index].value}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    filters: state.filters,
    arrRating: state.totalRows.arrRating,
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

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesRate);
