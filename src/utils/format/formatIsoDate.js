export const formatIsoDate = (date) => {
  try {
    return new Date(date).toLocaleDateString().split("T")[0];
  } catch (e) {
    return "Fecha no registrada";
  }
};
export const formatIsoDateTime = (date) => {
  try {
    return new Date(date).toLocaleTimeString().split("T")[0];
  } catch (e) {
    return "Fecha no registrada";
  }
};
export const formatDateToIso = (date) => {
  return date.toISOString().replace("Z", "");
};
