const conn = require("../../config/db_connection");

const makeSaldoTidakCukupError = async (kategori, delta, operation) => {
  const current = await getTotalZISWhereKategori(kategori);
  const saldo = current ? Number(current.jumlah_keseluruhan) : null;
  const err = new Error(`Saldo ${kategori} tidak cukup`);
  err.code = "SALDO_TIDAK_CUKUP";
  err.kategori = kategori;
  err.saldo_tersedia = saldo;
  err.perubahan_diminta = Number(delta);
  err.operation = operation;
  return err;
};

const getTotalZISByKategori = async () => {
  const [data] = await conn.execute(
    "SELECT id, kategori, jumlah_keseluruhan, updated_at FROM total_zis",
  );
  return data;
};

const getTotalZISWhereKategori = async (kategori) => {
  const [data] = await conn.execute(
    `
    SELECT jumlah_keseluruhan
    FROM total_zis
    WHERE kategori = ?
    `,
    [kategori],
  );

  return data[0];
};

const getTotalAllPemasukanZIS = async () => {
  const [data] = await conn.execute(`
    SELECT
      SUM(
        CASE
          WHEN kategori != 'zakat fitrah beras'
          THEN jumlah_keseluruhan
          ELSE 0
        END
      ) AS total_uang,

      SUM(
        CASE
          WHEN kategori = 'zakat fitrah beras'
          THEN jumlah_keseluruhan
          ELSE 0
        END
      ) AS total_beras,

      MAX(updated_at) AS updated_at

    FROM total_zis
  `);

  return data[0];
};

const tambahTotalZIS = async (kategori, jumlah) => {
  const delta = Number(jumlah);
  const [result] = await conn.execute(
    "UPDATE total_zis SET jumlah_keseluruhan = jumlah_keseluruhan + ?, updated_at = ? WHERE kategori = ? AND (jumlah_keseluruhan + ?) >= 0",
    [delta, new Date(), kategori, delta],
  );

  if (!result.affectedRows) {
    throw await makeSaldoTidakCukupError(kategori, delta, "tambah");
  }

  return result;
};

const kurangTotalZIS = async (kategori, jumlah) => {
  const delta = Number(jumlah);
  const [result] = await conn.execute(
    "UPDATE total_zis SET jumlah_keseluruhan = jumlah_keseluruhan - ?, updated_at = ? WHERE kategori = ? AND (jumlah_keseluruhan - ?) >= 0",
    [delta, new Date(), kategori, delta],
  );

  if (!result.affectedRows) {
    throw await makeSaldoTidakCukupError(kategori, -delta, "kurang");
  }

  return result;
};

module.exports = {
  getTotalZISByKategori,
  getTotalZISWhereKategori,
  getTotalAllPemasukanZIS,
  tambahTotalZIS,
  kurangTotalZIS,
};
