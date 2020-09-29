import React from "react";
import CategoriesName from "./categories-name/categories-name";
import CategoriesRefine from "./categories-refine/categories-refine";

function Categories(props) {
  const { onClearFilter } = props;

  const handleClearFilter = () => {
    onClearFilter();
  };
  return (
    <div className="categories">
      <div id="clear-filter">
        <button type="button" onClick={handleClearFilter}>
          <i className="fas fa-eraser"></i>
          Clear all filters
        </button>
      </div>
      <CategoriesName />
      <CategoriesRefine />
    </div>
  );
}

export default Categories;
