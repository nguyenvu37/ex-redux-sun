import React from "react";
import CategoriesBrand from "./categoriesBrand/categories-brand";
import CategoriesPrice from "./categoriesPrice/categories-price";
import CategoriesRate from "./categoriesRate/categories-rate";
import CategoriesType from "./categoriesType/categories-type";

function CategoriesRefine(props) {
  return (
    <section className="categories__wrapper">
      <div className="categories__wrapper__title">Refine by</div>
      <div className="categories__wrapper__content facet">
        <CategoriesType />

        <CategoriesBrand />

        <CategoriesRate />

        <CategoriesPrice />
      </div>
    </section>
  );
}

export default CategoriesRefine;
