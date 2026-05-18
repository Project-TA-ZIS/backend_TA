const conn = require("../../config/db_connection");

const getAllTotalDasawisma = async () => {
  const [data] = await conn.execute(`
    SELECT *
    FROM total_kas_dasawisma
    LIMIT 1
  `);

  return data[0];
};

const tambahTotalDasawisma = async (jumlah) => {
  const [result] = await conn.execute(
    "UPDATE total_kas_dasawisma SET jumlah_keseluruhan = jumlah_keseluruhan + ?, updated_at = ? ",
    [jumlah, new Date()],
  );
  return result;
};

module.exports = {
  getAllTotalDasawisma,
  tambahTotalDasawisma,
};
