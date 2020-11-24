import React, { useRef } from "react";
import { connect } from "react-redux";
import { actFetchProductsRequest } from "../../actions/action";
import Card from "./cards/card";
import Pagination from "./pagination/pagination";

function Items(props) {
  const { filters, fetchData } = props;
  const optionRef = useRef("");

  const handleSelect = () => {
    let option = "";
    let sort = "";
    switch (optionRef.current.value) {
      case "price asc":
        option = "asc";
        break;
      case "price desc":
        option = "desc";
        break;
      default:
        option = "";
    }
    if (option !== "") {
      sort = "price";
    } else sort = "";
    fetchData({
      ...filters,
      _sort: sort,
      _order: option,
    });
  };

  return (
    <div className="items">
      <section className="results__topbar">
        <div className="results__topbar__stats">
          <div className="results__topbar__stats__quantity">
            {props.data ? props.data.length : 0}
          </div>
          <span>found in 1ms</span>
        </div>
        <div className="results__topbar__sort">
          <label>Sort by</label>
          <div className="results__topbar__sort__selector">
            <select
              className="sort__by__selector"
              ref={optionRef}
              onChange={() => handleSelect()}
            >
              <option value="featured">Featured</option>
              <option value="price asc">Price asc.</option>
              <option value="price desc">Price desc.</option>
            </select>
          </div>
        </div>
      </section>
      <Card products={props.products} />
      <Pagination
        // pagination={props.pagination}
        totalRows={props.totalRows}
        onPageChange={props.onPageChange}
      />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    products: state.products,
    data: state.totalRows.data,
    filters: state.filters,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: (filters) => {
      dispatch(actFetchProductsRequest(filters));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Items);
