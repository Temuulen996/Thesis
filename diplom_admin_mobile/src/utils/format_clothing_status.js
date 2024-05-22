export const FormatClothingStatus = (status) => {
  if (status === "Very old") return "Маш хуучин";
  if (status === "Old") return "Хуучин";
  if (status === "Used") return "Дундаж хэрэглээ";
  if (status === "Well worn") return "Шинэвтэр";
  if (status === "New") return "Шинэ";
};
