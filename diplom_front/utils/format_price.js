export const formatPrice = (amount) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "MNT",
  }).format(parseFloat(amount));
};
