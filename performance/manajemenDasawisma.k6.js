import http from "k6/http";
import { check, sleep } from "k6";

import { stages, thresholds } from "./config.k6.js";

export const options = {
  stages: stages(),
  thresholds,
};

const today = new Date().toISOString().slice(0, 10);

function jsonHeaders(token) {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
}

function parseJson(response) {
  try {
    return JSON.parse(response.body || "{}");
  } catch (_) {
    return {};
  }
}

function login(email, password) {
  const response = http.post(
    `${__ENV.BASE_URL}/auth/post/login`,
    JSON.stringify({ email, password }),
    { headers: { "Content-Type": "application/json" } },
  );

  check(response, {
    "login status 200": (r) => r.status === 200,
  });

  if (response.status !== 200) {
    throw new Error(
      `Login gagal. Status: ${response.status}\n${response.body}`,
    );
  }

  return parseJson(response).token;
}

function makeUnique() {
  return `${Date.now()}-${__VU}-${__ITER}`;
}

function getCreatedId(response) {
  return parseJson(response)?.data?.id;
}

function expectOk(response, label, accepted = [200]) {
  check(response, {
    [`${label} status ${accepted.join("/")}`]: (r) =>
      accepted.includes(r.status),
  });
}

export function setup() {
  return {
    token: login(
      __ENV.K6_EMAIL || __ENV.K6_DASAWISMA_EMAIL,
      __ENV.K6_PASSWORD || __ENV.K6_DASAWISMA_PASSWORD,
    ),
  };
}

export default function (data) {
  const unique = makeUnique();
  const headers = jsonHeaders(data.token);

  const pemasukanPayload = {
    jumlah: 50000,
    sumber: "LAINNYA",
    deskripsi: `Pemasukan Dasawisma K6 ${unique}`,
    tanggal_penghimpunan: today,
    nama_anggota: "Performance Test",
  };

  const createPemasukan = http.post(
    `${__ENV.BASE_URL}/pemasukanDasawisma/post/createPemasukan`,
    JSON.stringify(pemasukanPayload),
    headers,
  );
  expectOk(createPemasukan, "POST pemasukan dasawisma");
  const pemasukanId = getCreatedId(createPemasukan);

  expectOk(
    http.get(
      `${__ENV.BASE_URL}/pemasukanDasawisma/get/getAllPemasukan`,
      headers,
    ),
    "GET all pemasukan dasawisma",
  );
  expectOk(
    http.get(
      `${__ENV.BASE_URL}/pemasukanDasawisma/get/getPemasukan/${pemasukanId}`,
      headers,
    ),
    "GET pemasukan dasawisma by id",
  );
  expectOk(
    http.get(
      `${__ENV.BASE_URL}/pemasukanDasawisma/get/getPemasukanByRW`,
      headers,
    ),
    "GET pemasukan dasawisma by RW",
  );
  expectOk(
    http.put(
      `${__ENV.BASE_URL}/pemasukanDasawisma/update/updatePemasukan/${pemasukanId}`,
      JSON.stringify({ ...pemasukanPayload, jumlah: 60000 }),
      headers,
    ),
    "PUT pemasukan dasawisma",
  );

  const pengeluaranPayload = {
    jumlah: 1000,
    deskripsi: `Pengeluaran Dasawisma K6 ${unique}`,
    tanggal_penyaluran: today,
    nama_anggota: "Performance Test",
  };

  const createPengeluaran = http.post(
    `${__ENV.BASE_URL}/pengeluaranDasawisma/post/createPengeluaran`,
    JSON.stringify(pengeluaranPayload),
    headers,
  );
  expectOk(createPengeluaran, "POST pengeluaran dasawisma");
  const pengeluaranId = getCreatedId(createPengeluaran);

  expectOk(
    http.get(
      `${__ENV.BASE_URL}/pengeluaranDasawisma/get/getAllPengeluaran`,
      headers,
    ),
    "GET all pengeluaran dasawisma",
  );
  expectOk(
    http.get(
      `${__ENV.BASE_URL}/pengeluaranDasawisma/get/getPengeluaran/${pengeluaranId}`,
      headers,
    ),
    "GET pengeluaran dasawisma by id",
  );
  expectOk(
    http.get(
      `${__ENV.BASE_URL}/pengeluaranDasawisma/get/getPengeluaranByRW`,
      headers,
    ),
    "GET pengeluaran dasawisma by RW",
  );
  expectOk(
    http.put(
      `${__ENV.BASE_URL}/pengeluaranDasawisma/update/updatePengeluaran/${pengeluaranId}`,
      JSON.stringify({ ...pengeluaranPayload, jumlah: 1500 }),
      headers,
    ),
    "PUT pengeluaran dasawisma",
  );

  sleep(1);
}
