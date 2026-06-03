const conn = require("../../config/db_connection");

const makeSaldoTidakCukupError = async (delta) => {
  const current = await getAllTotalDasawisma();
  const saldo = current ? Number(current.jumlah_keseluruhan) : null;

  const err = new Error("Total Kas Dasawisma tidak mencukupi untuk pengeluaran ini");
  err.code = "SALDO_TIDAK_CUKUP";
  err.kategori = "kas dasawisma";
  err.saldo_tersedia = saldo;
  err.perubahan_diminta = -Number(delta);
  return err;
};

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

const kurangiTotalDasawisma = async (jumlah) => {
  const delta = Number(jumlah);
  if (!delta || delta <= 0) return { affectedRows: 0 };

  const now = new Date();
  const [result] = await conn.execute(
    "UPDATE total_kas_dasawisma SET jumlah_keseluruhan = jumlah_keseluruhan - ?, updated_at = ? WHERE jumlah_keseluruhan >= ?",
    [delta, now, delta],
  );

  if (result.affectedRows === 0) {
    throw await makeSaldoTidakCukupError(delta);
  }

  return result;
};

module.exports = {
  getAllTotalDasawisma,
  tambahTotalDasawisma,
  kurangiTotalDasawisma,
};
