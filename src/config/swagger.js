const path = require("path");
const swaggerJSDoc = require("swagger-jsdoc");

const port = process.env.PORT || 3000;

const options = {
  definition: {
    openapi: "3.0.3",
    info: {
      title: "Backend TA API",
      version: "1.0.0",
      description: "Dokumentasi API untuk Backend_TA (Express + Sequelize).",
    },
    servers: [{ url: `http://localhost:${port}` }],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        ErrorResponse: {
          type: "object",
          properties: {
            message: { type: "string" },
            error: { type: "string" },
          },
        },
        LoginRequest: {
          type: "object",
          required: ["email", "password"],
          properties: {
            email: { type: "string", example: "user@example.com" },
            password: { type: "string", example: "password" },
          },
        },
        LoginResponse: {
          type: "object",
          properties: {
            message: { type: "string", example: "login berhasil" },
            token: { type: "string" },
          },
        },
        User: {
          type: "object",
          properties: {
            id: { type: "integer", nullable: true },
            nama_lengkap: { type: "string", nullable: true },
            email: { type: "string", nullable: true },
            nomor_telpon: { type: "string", nullable: true },
            alamat: { type: "string", nullable: true },
          },
        },
        Amil: {
          allOf: [
            { $ref: "#/components/schemas/User" },
            {
              type: "object",
              properties: {
                password: { type: "string", nullable: true },
                roles: { type: "string", example: "amil zakat" },
                created_at: { type: "string", format: "date-time" },
                updated_at: { type: "string", format: "date-time", nullable: true },
                deleted_at: { type: "string", format: "date-time", nullable: true },
                deleted_status: { type: "integer", example: 0 },
              },
            },
          ],
        },
        Dasawisma: {
          allOf: [
            { $ref: "#/components/schemas/User" },
            {
              type: "object",
              properties: {
                rw_id: { type: "integer", nullable: true },
                nama_rw: { type: "string", nullable: true },
                password: { type: "string", nullable: true },
                nik: { type: "string", nullable: true },
                roles: { type: "string", nullable: true },
                tempat_lahir: { type: "string", nullable: true },
                tanggal_lahir: { type: "string", format: "date", nullable: true },
                created_at: { type: "string", format: "date-time" },
                updated_at: { type: "string", format: "date-time", nullable: true },
                deleted_at: { type: "string", format: "date-time", nullable: true },
                deleted_status: { type: "integer", example: 0 },
              },
            },
          ],
        },
        Muzakki: {
          allOf: [
            { $ref: "#/components/schemas/User" },
            {
              type: "object",
              properties: {
                npwp: { type: "string", nullable: true },
                nik: { type: "string", nullable: true },
                tempat_lahir: { type: "string", nullable: true },
                tanggal_lahir: { type: "string", format: "date", nullable: true },
                jenis_kelamin: { type: "string", nullable: true },
                pekerjaan: { type: "string", nullable: true },
                created_at: { type: "string", format: "date-time" },
                updated_at: { type: "string", format: "date-time", nullable: true },
                deleted_at: { type: "string", format: "date-time", nullable: true },
                deleted_status: { type: "integer", example: 0 },
              },
            },
          ],
        },
        Mustahik: {
          type: "object",
          properties: {
            id: { type: "integer", nullable: true },
            nama_lengkap: { type: "string", nullable: true },
            nomor_telpon: { type: "string", nullable: true },
            alamat: { type: "string", nullable: true },
            nik: { type: "string", nullable: true },
            tempat_lahir: { type: "string", nullable: true },
            tanggal_lahir: { type: "string", format: "date", nullable: true },
            jenis_kelamin: { type: "string", nullable: true },
            kategori: { type: "string", nullable: true },
            created_at: { type: "string", format: "date-time" },
            updated_at: { type: "string", format: "date-time", nullable: true },
            deleted_at: { type: "string", format: "date-time", nullable: true },
            deleted_status: { type: "integer", example: 0 },
          },
        },
        PemasukanZIS: {
          type: "object",
          properties: {
            id: { type: "integer", nullable: true },
            muzakki_id: { type: "integer" },
            nama_muzakki: { type: "string", nullable: true },
            kategori: { type: "string", example: "zakat fitrah" },
            jumlah: { type: "number", example: 10000 },
            deskripsi: { type: "string", nullable: true },
            tanggal_penghimpunan: { type: "string", format: "date", nullable: true },
            created_at: { type: "string", format: "date-time" },
            updated_at: { type: "string", format: "date-time", nullable: true },
            deleted_at: { type: "string", format: "date-time", nullable: true },
            deleted_status: { type: "integer", example: 0 },
          },
        },
        PengeluaranZIS: {
          type: "object",
          properties: {
            id: { type: "integer", nullable: true },
            mustahik_id: { type: "integer", nullable: true },
            nama_mustahik: { type: "string", nullable: true },
            kategori: { type: "string", example: "zakat fitrah" },
            jumlah: { type: "number", example: 10000 },
            deskripsi: { type: "string", nullable: true },
            tanggal_penyaluran: { type: "string", format: "date", nullable: true },
            created_at: { type: "string", format: "date-time" },
            updated_at: { type: "string", format: "date-time", nullable: true },
            deleted_at: { type: "string", format: "date-time", nullable: true },
            deleted_status: { type: "integer", example: 0 },
          },
        },
        TotalKasZIS: {
          type: "object",
          properties: {
            id: { type: "integer" },
            jumlah_keseluruhan: { type: "number" },
            kategori: { type: "string", nullable: true },
            updated_at: { type: "string", format: "date-time", nullable: true },
          },
        },
        PemasukanDasawisma: {
          type: "object",
          properties: {
            id: { type: "integer", nullable: true },
            jumlah: { type: "number", example: 10000 },
            deskripsi: { type: "string", nullable: true },
            sumber: { type: "string", nullable: true, example: "IURAN" },
            nama_anggota: { type: "string", nullable: true },
            tanggal_penghimpunan: { type: "string", format: "date", nullable: true },
            anggota_dasawisma_id: { type: "integer", nullable: true },
            rw_id: { type: "integer", nullable: true },
            created_at: { type: "string", format: "date-time" },
            updated_at: { type: "string", format: "date-time", nullable: true },
            deleted_at: { type: "string", format: "date-time", nullable: true },
            deleted_status: { type: "integer", example: 0 },
          },
        },
        PengeluaranDasawisma: {
          type: "object",
          properties: {
            id: { type: "integer", nullable: true },
            jumlah: { type: "number", example: 10000 },
            deskripsi: { type: "string", nullable: true },
            tanggal_penyaluran: { type: "string", format: "date", nullable: true },
            nama_anggota: { type: "string", nullable: true },
            rw_id: { type: "integer", nullable: true },
            created_at: { type: "string", format: "date-time" },
            updated_at: { type: "string", format: "date-time", nullable: true },
            deleted_at: { type: "string", format: "date-time", nullable: true },
            deleted_status: { type: "integer", example: 0 },
          },
        },
        TotalKasDasawisma: {
          type: "object",
          properties: {
            id: { type: "integer" },
            jumlah_keseluruhan: { type: "number" },
            updated_at: { type: "string", format: "date-time", nullable: true },
          },
        },
        RW: {
          type: "object",
          properties: {
            id: { type: "integer", nullable: true },
            nama_rw: { type: "string", nullable: true },
            tipe_pengelolaan_kas: { type: "string", nullable: true },
            created_at: { type: "string", format: "date-time" },
            updated_at: { type: "string", format: "date-time", nullable: true },
            deleted_at: { type: "string", format: "date-time", nullable: true },
            deleted_status: { type: "integer", nullable: true },
          },
        },
      },
    },
  },
  apis: [path.join(__dirname, "../documentation/**/*.swagger.js")],
};

module.exports = swaggerJSDoc(options);
