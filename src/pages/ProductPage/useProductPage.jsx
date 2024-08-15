import { useLocation, useSearchParams } from "react-router-dom";
import queryString from "query-string";
import useMutation from "../../hooks/useMutation";
import { productService } from "../../services/productService";
import { useEffect, useMemo, useRef } from "react";
import { SORT_OPTIONS } from "../../constants/general";
import useQuery from "../../hooks/useQuery";
function useProductPage() {
  const PRODUCT_LIMITS = 6;
  const { search } = useLocation();
  const queryObject = queryString.parse(search);
  const [_, setSearchParams] = useSearchParams();
  const {
    data: productsData,
    loading: productsLoading,
    error: productsError,
    execute: fetchProducts,
  } = useMutation((query) =>
    productService.getProduct(query || `?limit=${PRODUCT_LIMITS}`)
  );
  const products = productsData?.products || [];
  const productsPagi = productsData?.pagination || {};
  const {
    data: categoriesData,
    loading: categoriesLoading,
    error: categoriesError,
  } = useQuery(productService.getProductCategories);
  const categories = categoriesData?.products || [];
  useEffect(() => {
    if (search) {
      fetchProducts(search);
    }
  }, [search]);

  const productListProps = {
    isLoading: productsLoading,
    isError: productsError,
    products,
    isSearch: !!search,
  };

  const updateQueryString = (queryObject) => {
    const newQueryString = queryString.stringify({
      ...queryObject,
      limit: PRODUCT_LIMITS,
    });
    setSearchParams(new URLSearchParams(newQueryString));
  };
  const onPagiChange = (page) => {
    updateQueryString({ ...queryObject, page: page });
  };
  const pagiProps = {
    page: Number(productsPagi?.page || queryObject?.page || 1),
    limit: Number(productsPagi?.limit || 0),
    total: Number(productsPagi?.total || 0),
    onPagiChange,
  };
  const activeSort = useMemo(() => {
    return (
      Object.values(SORT_OPTIONS).find(
        (options) =>
          options.queryObject.orderBy === queryObject.orderBy &&
          options.queryObject.order === queryObject.order
      )?.value || SORT_OPTIONS.popularity.value
    );
  }, [queryObject]);
  const onSortChange = (sortType) => {
    const sortQueryObject = SORT_OPTIONS[sortType].queryObject;
    if (sortQueryObject) {
      updateQueryString({ ...queryObject, ...sortQueryObject, page: 1 });
    }
  };
  const toolboxProps = {
    showNum: products?.length || 0,
    totalNum: productsPagi?.total || 0,
    onSortChange,
    activeSort,
  };
  const onCateFilterChange = (cateId, isChecked) => {
    let newCategoryQuery = Array.isArray(queryObject.category)
      ? [...queryObject.category, cateId]
      : [queryObject.category, cateId];
    if (!isChecked) {
      newCategoryQuery = newCategoryQuery.filter(
        (category) => category !== cateId
      );
    }
    if (!cateId) {
      newCategoryQuery = [];
    }
    updateQueryString({
      ...queryObject,
      category: newCategoryQuery,
      page: 1,
    });
  };
  const priceFilterTimeout = useRef();
  const handlePriceFilterChange = (priceRange) => {
    if (priceRange?.length === 2) {
      if (priceFilterTimeout.current) {
        clearTimeout(priceFilterTimeout.current);
      }
      priceFilterTimeout.current = setTimeout(() => {
        updateQueryString({
          ...queryObject,
          minPrice: priceRange[0].substring(1),
          maxPrice: priceRange[1].substring(1),
          page: 1,
        });
      }, 500);
    }
  };
  const queryObjectCopy = { ...queryObject };
  if (queryObjectCopy["page"]) {
    delete queryObjectCopy["page"];
  }
  if (queryObjectCopy["limit"]) {
    delete queryObjectCopy["limit"];
  }
  if (queryObjectCopy["category"]) {
    delete queryObjectCopy["category"];
  }

  const { data: productsAllData, execute: getProductsAll } = useMutation(
    (query) => productService.getProduct(query)
  );
  useEffect(() => {
    getProductsAll(
      `?${new URLSearchParams(queryString.stringify(queryObjectCopy))}`
    );
  }, [search]);
  // const allProductsFiltered =
  const filterProps = {
    productsAllFiltered: productsAllData?.products || [],
    categories: categories || [],
    isLoading: categoriesLoading,
    isError: categoriesError,
    activeCategory: Array.isArray(queryObject.category)
      ? queryObject.category
      : [queryObject.category],
    currentPriceRange: [
      queryObject.minPrice || 0,
      queryObject.maxPrice || 1000,
    ],
    onCateFilterChange,
    handlePriceFilterChange,
  };
  return { toolboxProps, productListProps, pagiProps, filterProps };
}
export default useProductPage;
