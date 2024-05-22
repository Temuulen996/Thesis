export const FormatStatus = (status) => {
  if (status === "Pending") return "Хүлээгдэж буй";
  if (status === "Complete") return "Амжилттай";
  if (status === "Cancelled") return "Цуцлагдсан";
};
