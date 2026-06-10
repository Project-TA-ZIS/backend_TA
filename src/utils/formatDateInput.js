const formatDateInput = (data) => {
  if (!data) return "";
  const tanggalPenghimpunan = new Date(data);
  if (isNaN(tanggalPenghimpunan.getTime())) return "";

  return tanggalPenghimpunan.toISOString().split("T")[0];
};

module.exports = {
  formatDateInput,
};
