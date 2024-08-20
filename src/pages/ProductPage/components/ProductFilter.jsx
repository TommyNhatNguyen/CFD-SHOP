import React, { useEffect, useRef } from "react";
import CheckBox from "../../../components/CheckBox";
import useQuery from "../../../hooks/useQuery";
import { productService } from "../../../services/productService";
import { useLocation } from "react-router-dom";
import { useMainContext } from "../../../context/MainContext";

const ProductFilter = ({
  productsAllFiltered,
  categories,
  currentPriceRange,
  activeCategory,
  onCateFilterChange,
  handlePriceFilterChange,
  search,
  handleCleanAllFilter,
}) => {
  const priceSliderRef = useRef();
  function destroyExistingSlider() {
    if (priceSliderRef.current && priceSliderRef.current.noUiSlider) {
      priceSliderRef.current.noUiSlider.destroy();
    }
  }
  useEffect(() => {
    if (typeof noUiSlider === "object") {
      var priceSlider = priceSliderRef.current;
      // Check if #price-slider elem is exists if not return
      // to prevent error logs
      if (priceSlider == null) return;
      // if (noUiSliderRef.current) {
      //   noUiSliderRef.current = null;
      //   return;
      // }

      noUiSlider.create(priceSlider, {
        start: currentPriceRange,
        connect: true,
        step: 50,
        margin: 200,
        range: {
          min: 0,
          max: 1500,
        },
        tooltips: true,
        format: wNumb({
          decimals: 0,
          prefix: "$",
        }),
      });
    }
    // Update Price Range
    priceSliderRef.current.noUiSlider.on("slide", function (values, handle) {
      if (values) {
        $("#filter-price-range").text(values.join(" - "));
        handlePriceFilterChange?.(values);
      }
    });
    return () => {
      destroyExistingSlider();
    };
  }, [search]);

  const { state } = useLocation();
  const _onFilterChange = (id, isChecked) => {
    onCateFilterChange(id, isChecked);
  };

  useEffect(() => {
    if (state?.category) {
      _onFilterChange(state?.category, true);
    }
  }, [state]);

  const _onCleanAll = () => {
    $("#filter-price-range").text(["$0", "$1000"].join(" - "));
    handleCleanAllFilter();
  };

  return (
    <aside className="col-lg-3 order-lg-first">
      <div className="sidebar sidebar-shop">
        <div className="widget widget-clean">
          <label>Filters:</label>
          <a href="#" className="sidebar-filter-clear" onClick={_onCleanAll}>
            Clean All
          </a>
        </div>
        <div className="widget widget-collapsible">
          <h3 className="widget-title">
            <a
              data-toggle="collapse"
              href="#widget-1"
              role="button"
              aria-expanded="true"
              aria-controls="widget-1"
            >
              Category
            </a>
          </h3>
          <div className="collapse show" id="widget-1">
            <div className="widget-body">
              <div className="filter-items filter-items-count">
                {categories?.map((category, index) => {
                  const productCountByTab = productsAllFiltered?.filter(
                    (product) => product?.category?.id === category?.id
                  )?.length;
                  return (
                    <div key={category?.id || index} className="filter-item">
                      <CheckBox
                        id={category?.id || index}
                        name={category?.id || ""}
                        label={category.name || ""}
                        checked={
                          activeCategory.includes(category?.id || "") &&
                          productCountByTab !== 0
                        }
                        onChange={(value) => {
                          _onFilterChange(category?.id, value.target.checked);
                        }}
                        disabled={productCountByTab === 0}
                      />
                      <span className="item-count">{productCountByTab}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <div className="widget widget-collapsible">
          <h3 className="widget-title">
            <a
              data-toggle="collapse"
              href="#widget-2"
              role="button"
              aria-expanded="true"
              aria-controls="widget-5"
            >
              Price
            </a>
          </h3>
          <div className="collapse show" id="widget-2">
            <div className="widget-body">
              <div className="filter-price">
                <div className="filter-price-text">
                  Price Range: <span id="filter-price-range" />
                </div>
                <div id="price-slider" ref={priceSliderRef} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default ProductFilter;
