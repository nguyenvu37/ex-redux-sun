import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import {
  actFetchProductsRequest,
  actFetchTotalRowsRequest,
} from "../../../../actions/action";
import getValuePrices from "../../../../common/getValuePrice";

function CategoriesPrice(props) {
  const { filters, arrPrices, fetchData, fetChTotalRows } = props;

  const [price, setPrice] = useState([]);

  const reftextFrom = useRef(null);
  const reftextTo = useRef(null);

  const [isValueInput, setIsvalueInput] = useState(false);

  useEffect(() => {
    if (arrPrices) {
      const arrPrice = getValuePrices([...arrPrices]);
      if (arrPrice) {
        setPrice(arrPrice);
      }
    }
  }, [arrPrices]);

  const handleDataFromPrice = (range) => {
    reftextFrom.current.value = range.min;
    reftextTo.current.value = range.max;
    let arrPrice = [{ ...range }];

    let dataFilterRows = {
      filterTotalRows: {
        ...filters,
        price_gte: range.min,
        price_lte: range.max,
        _page: "",
        _limit: "",
      },
      dataTypeChangePage: [],
      dataBrandChangePage: [],
      dataRateChangePage: [],
    };

    setPrice(arrPrice);
    setIsvalueInput(!isValueInput);
    fetchData({
      ...filters,
      price_gte: range.min,
      price_lte: range.max,
    });

    fetChTotalRows({
      ...dataFilterRows,
    });
  };

  const handleForm = (e) => {
    e.preventDefault();
    const arrPrice = getValuePrices([...arrPrices]);
    let range = {};

    let dataFilterRows = {
      filterTotalRows: { price_gte: range.min, price_lte: range.max },
      dataTypeChangePage: [],
      dataBrandChangePage: [],
      dataRateChangePage: [],
    };

    if (isValueInput === false) {
      range = {
        min: parseFloat(reftextFrom.current.value),
        max: parseFloat(reftextTo.current.value),
      };

      dataFilterRows = {
        ...dataFilterRows,
        filterTotalRows: {
          price_gte: parseFloat(reftextFrom.current.value),
          price_lte: parseFloat(reftextTo.current.value),
        },
      };
      setPrice([{ ...range }]);
      setIsvalueInput(!isValueInput);
      fetchData({
        ...filters,
        price_gte: range.min,
        price_lte: range.max,
      });
      fetChTotalRows({
        ...dataFilterRows,
      });
    } else {
      reftextFrom.current.value = "";
      reftextTo.current.value = "";
      setIsvalueInput(!isValueInput);
      setPrice([...arrPrice]);
      fetchData({
        ...filters,
        price_gte: range.min,
        price_lte: range.max,
      });
      fetChTotalRows({
        ...dataFilterRows,
      });
    }
  };
  return (
    <div className="facet__item">
      <div className="facet__item__title">Prices</div>
      <div className="facet__item__list">
        {price.map((item, index) => {
          return (
            <div className="facet__item__list__price" key={index}>
              <div
                onClick={() =>
                  handleDataFromPrice({ min: item.min, max: item.max })
                }
              >
                <i className="fas fa-dollar-sign"></i>
                <span className="facet-price">
                  {parseFloat(item.min).toFixed(2)} -{" "}
                  {parseFloat(item.max).toFixed(2)}
                </span>
              </div>
            </div>
          );
        })}
      </div>
      <form className="facet__item__form-price">
        <div className="form-price__value">
          <label>
            <i className="fas fa-dollar-sign"></i>
            <input type="number" className="range-input" ref={reftextFrom} />
          </label>
          <span className="separator">to</span>
          <label>
            <i className="fas fa-dollar-sign"></i>
            <input type="number" className="range-input" ref={reftextTo} />
          </label>
        </div>
        <div className="form-price__btn">
          <button type="submit" onClick={(e) => handleForm(e)}>
            Go
          </button>
        </div>
      </form>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    filters: state.filters,
    arrPrices: state.totalRows.arrPrices,
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

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesPrice);
