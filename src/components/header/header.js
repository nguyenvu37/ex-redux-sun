import React, { useRef } from "react";
import { connect } from "react-redux";
import {
  actFetchProductsRequest,
  actFetchTotalRowsRequest,
} from "../../actions/action";

function HeaderComponent(props) {
  const { filters, fetchData, fetChTotalRows } = props;
  const keywords = useRef(null);

  const handleSearch = () => {
    let keyword = keywords.current.value;
    let dataFilterRows = {
      filterTotalRows: { q: keyword },
      dataTypeChangePage: [],
      dataBrandChangePage: [],
      dataRateChangePage: [],
    };
    fetchData({
      ...filters,
      q: keyword,
    });
    fetChTotalRows({
      ...dataFilterRows,
    });
  };
  return (
    <div className="header">
      <div className="logo">
        <a href="index.html" className="logo__img">
          <img src={require("../../assests/img/logo.png")} width="40" alt="" />
        </a>
        <a href="index.html" className="logo__title">
          amazing
        </a>
      </div>
      <div className="search">
        <form>
          <input
            placeholder="Search a product"
            type="text"
            ref={keywords}
            onChange={() => handleSearch()}
          />
          <button type="button">
            <i className="fas fa-search"></i>
          </button>
        </form>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
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

export default connect(mapStateToProps, mapDispatchToProps)(HeaderComponent);
