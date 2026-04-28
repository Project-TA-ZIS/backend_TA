const conn = require("../../config/db_connection");

const getTotalZISByKategori = async () => {
  const [data] = await conn.execute(
    "SELECT kategori, jumlah_keseluruhan AS jumlah, updated_at FROM total_zis"
  );
  return data;
};

const getTotalAllPemasukanZIS = async () => {
  const [data] = await conn.execute(`
    SELECT 
      SUM(jumlah_keseluruhan) as total,
      MAX(updated_at) as updated_at
    FROM total_zis
  `);
  return data[0];
};

const updateTotalZIS = async (kategori, jumlah) => {
  const [result] = await conn.execute(
    "UPDATE total_zis SET jumlah_keseluruhan = jumlah_keseluruhan + ?, updated_at = ? WHERE kategori = ?",
    [jumlah, new Date(), kategori]
  );
  return result;
};

module.exports = {
  getTotalZISByKategori,
  getTotalAllPemasukanZIS,
  updateTotalZIS,
};