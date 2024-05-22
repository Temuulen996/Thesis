export const formatNumber = (digit) => {
  return new Intl.NumberFormat("en-Us").format(parseFloat(digit));
};
