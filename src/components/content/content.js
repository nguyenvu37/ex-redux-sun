import React, { useEffect } from "react";
import Categories from "./categories";
import Items from "./items";
import Waiting from "../../common/waiting";
import {
  actFetchProductsRequest,
  actFetchTotalRowsRequest,
} from "../../actions/action";
import { connect } from "react-redux";

function Content(props) {
  const { loading } = props;

  useEffect(() => {
    let dataFilterRows = {
      filterTotalRows: [],
      dataTypeChangePage: [],
      dataBrandChangePage: [],
      dataRateChangePage: [],
    };

    props.fetchData({
      _limit: 8,
      _page: 1,
    });
    props.fetTotalRows({ ...dataFilterRows });
  }, [props]);

  function onClearFilter() {
    window.location.reload();
  }

  if (loading) {
    return (
      <Waiting
        custome={{
          position: "relative",
          top: "300px",
          left: "50%",
          width: "40%",
        }}
      />
    );
  } else {
    return (
      <div className="content">
        <aside>
          <Categories onClearFilter={onClearFilter} />
        </aside>
        <article>
          <Items />
        </article>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: (filters) => {
      dispatch(actFetchProductsRequest(filters));
    },
    fetTotalRows: (filterTotalRows) => {
      dispatch(actFetchTotalRowsRequest(filterTotalRows));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Content);
