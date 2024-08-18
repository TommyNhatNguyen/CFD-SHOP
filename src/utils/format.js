import moment from "moment";

export const formatCurrency = (data) => {
  return data.toLocaleString("en-US", { style: "currency", currency: "USD" });
};

export const formatDate = (data) => {
  return moment(data).format("MMMM DD, YYYY");
};
