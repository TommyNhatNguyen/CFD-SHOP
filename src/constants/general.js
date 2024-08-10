export const MENU_TABS = {
  menu: "mobile-menu-link",
  categories: "mobile-cats-link",
};

export const SORT_OPTIONS = {
  popularity: {
    value: "popularity",
    label: "Most Popular",
    queryObject: { orderBy: undefined, order: undefined },
  },
  pricelow: {
    value: "pricelow",
    label: "Price Low to High",
    queryObject: { orderBy: "price", order: "1" },
  },
  pricehigh: {
    value: "pricehigh",
    label: "Price High to Low",
    queryObject: { orderBy: "price", order: "-1" },
  },
  newest: {
    value: "newest",
    label: "Newest",
    queryObject: { orderBy: "createdAt", order: "-1" },
  },
  rating: {
    value: "rating",
    label: "Most Rated",
    queryObject: { orderBy: "rating", order: "-1" },
  },
};

export const DETAIL_TABS = [
  { id: "description", name: "Description" },
  { id: "shippingReturn", name: "Shipping Returns" },
  {
    id: "review",
    name(totalReview) {
      return `Reviews (${totalReview})`;
    },
  },
];
