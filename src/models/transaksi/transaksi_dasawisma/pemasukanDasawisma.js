const transaksi = require("../transaksi.models");
class PemasukanDasawisma extends transaksi {
  constructor(data) {
    super(data);
    this.tanggal_penghimpunan = data.tanggal_penghimpunan ?? null;
    this.anggota_dasawisma_id = data.anggota_dasawisma_id ?? null;
    this.created_at = data.created_at ?? new Date();
    this.updated_at = data.updated_at ?? null;
    this.deleted_at = data.deleted_at ?? null;
    this.deleted_status = 0;
  }
}

module.exports = PemasukanDasawisma;
