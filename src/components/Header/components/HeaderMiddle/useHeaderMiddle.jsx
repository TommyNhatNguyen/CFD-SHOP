import { useEffect, useMemo } from "react";
import { useMainContext } from "../../../../context/MainContext";
import { useDispatch, useSelector } from "react-redux";
import { handleRemoveFromCart } from "../../../../store/reducer/cartReducer";
import { productService } from "../../../../services/productService";
import useMutation from "../../../../hooks/useMutation";
import PATHS from "../../../../constants/paths";
import { PopularPostWrapper } from "../../../StyledComponents";
import { Link } from "react-router-dom";
import { renderProductDropDown } from "../../../../utils/renderDropDown";

const useHeaderMiddle = () => {
  const dispatch = useDispatch();
  const { handleShowMobileMenu, isShowMobileMenu } = useMainContext();
  const { cart } = useSelector((state) => state.cart);
  const { products } = useSelector((state) => state.product);

  const options = useMemo(() => {
    return [
      {
        label: "Find product",
        options: products?.map((product) => {
          const { name, slug, images } = product || {};
          const productPath = `${PATHS.PRODUCT.INDEX}/${slug || ""}`;
          return renderProductDropDown(name, images, productPath);
        }),
      },
    ];
  }, [products]);

  const { quantity, variant, totalProduct, total } = cart || {};
  const cartProducts = cart?.product?.map((product, index) => {
    return {
      ...product,
      quantity: quantity?.[index],
      variant: variant?.[index],
      totalProduct: totalProduct?.[index],
    };
  });
  useEffect(() => {
    var $searchWrapper = $(".header-search-wrapper"),
      $body = $("body"),
      $searchToggle = $(".search-toggle");

    $searchToggle.on("click", function (e) {
      $searchWrapper.toggleClass("show");
      $(this).toggleClass("active");
      $searchWrapper.find("input").focus();
      e.preventDefault();
    });

    $body.on("click", function (e) {
      if ($searchWrapper.hasClass("show")) {
        $searchWrapper.removeClass("show");
        $searchToggle.removeClass("active");
        $body.removeClass("is-search-active");
      }
    });

    $(".header-search").on("click", function (e) {
      e.stopPropagation();
    });
    var catDropdown = $(".category-dropdown"),
      catInitVal = catDropdown.data("visible");

    if ($(".sticky-header").length && $(window).width() >= 992) {
      var sticky = new Waypoint.Sticky({
        element: $(".sticky-header")[0],
        stuckClass: "fixed",
        offset: -300,
        handler: function (direction) {
          // Show category dropdown
          if (catInitVal && direction == "up") {
            catDropdown
              .addClass("show")
              .find(".dropdown-menu")
              .addClass("show");
            catDropdown.find(".dropdown-toggle").attr("aria-expanded", "true");
            return false;
          }

          // Hide category dropdown on fixed header
          if (catDropdown.hasClass("show")) {
            catDropdown
              .removeClass("show")
              .find(".dropdown-menu")
              .removeClass("show");
            catDropdown.find(".dropdown-toggle").attr("aria-expanded", "false");
          }
        },
      });
    }
  }, []);

  const handleRemoveProduct = (itemId) => {
    dispatch(handleRemoveFromCart({ itemId }));
  };
  const cartDropdownProps = {
    products: cartProducts,
    total,
    itemsInCart: new Set(cartProducts?.map((item) => item?.id)).size,
    handleRemoveProduct,
  };
  const searchProps = { options };
  return {
    handleShowMobileMenu,
    isShowMobileMenu,
    cartDropdownProps,
    searchProps,
  };
};
export default useHeaderMiddle;
