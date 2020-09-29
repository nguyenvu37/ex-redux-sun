import React from "react";
import { connect } from "react-redux";
import {
  actFetchProductsRequest,
  actFetchTotalRowsRequest,
} from "../../../actions/action";

const categories = [
  {
    id: 1,
    name: "appliances",
    types: ["dishwasher", "fan"],
    isBlock: false,
  },
  {
    id: 2,
    name: "audio",
    types: ["headphones", "homeaudio"],
    isBlock: false,
  },
];

function CategoriesName(props) {
  const { fetData, fetchTotalRows } = props;

  function handleFilterCategories(name) {
    let dataFilterRows = {
      filterTotalRows: { category: name },
      dataTypeChangePage: [],
      dataBrandChangePage: [],
      dataRateChangePage: [],
    };
    fetData({
      _limit: 8,
      _page: 1,
      category: name,
    });

    fetchTotalRows({
      ...dataFilterRows,
    });
  }

  function handleFilterTypes(type) {
    let dataFilterRows = {
      filterTotalRows: { typeCategory: type },
      dataTypeChangePage: [],
      dataBrandChangePage: [],
      dataRateChangePage: [],
    };
    fetData({
      _limit: 8,
      _page: 1,
      typeCategory: type,
    });

    fetchTotalRows({
      ...dataFilterRows,
    });
  }

  return (
    <section className="categories__wrapper">
      <div className="categories__wrapper__title">Show results for</div>
      <div className="categories__wrapper__content">
        <div className="categories__wrapper__content__item">
          <div className="appliances item-name">
            {categories.map((item) => {
              return (
                <div className="appliancies__btn" key={item.id}>
                  <button
                    onClick={() => {
                      handleFilterCategories(item.name);
                      item.isBlock = !item.isBlock;
                    }}
                  >
                    <i className="fa fa-angle-right"></i>
                    {item.name}
                  </button>
                  {item.isBlock
                    ? item.types.map((type, index) => {
                        return (
                          <div
                            className={`appliances__item item-categories`}
                            key={index}
                            value={item.name}
                          >
                            <button
                              type="button"
                              onClick={() => handleFilterTypes(type)}
                            >
                              <i className="fa fa-angle-right"></i>
                              {type}
                            </button>
                          </div>
                        );
                      })
                    : ""}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

const mapStateToProps = (state) => {
  return {
    filters: state.filters,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetData: (filters) => {
      dispatch(actFetchProductsRequest(filters));
    },
    fetchTotalRows: (totalRows) => {
      dispatch(actFetchTotalRowsRequest(totalRows));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesName);
