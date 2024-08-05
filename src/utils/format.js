export const formatCurrency = (data) => {
  return data.toLocaleString("en-US", { style: "currency", currency: "USD" });
};
