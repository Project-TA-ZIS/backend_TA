import http from "k6/http";
import { check, sleep } from "k6";
import { stages, thresholds } from "./config.k6.js";

export const options = {
  stages: stages(),
  thresholds,
};

const today = new Date().toISOString().slice(0, 10);
const kategoriZIS = "infaq";

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
  if (!email || !password) {
    throw new Error("amil credential is required");
  }

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

function getList(response) {
  const body = parseJson(response);
  return Array.isArray(body?.data)
    ? body.data
    : Array.isArray(body)
      ? body
      : [];
}

function expectOk(response, label, accepted = [200]) {
  check(response, {
    [`${label} status ${accepted.join("/")}`]: (r) =>
      accepted.includes(r.status),
  });
}

export function setup() {
  const token = login(
    __ENV.K6_EMAIL || __ENV.K6_AMIL_EMAIL,
    __ENV.K6_PASSWORD || __ENV.K6_AMIL_PASSWORD,
  );
  const headers = jsonHeaders(token);

  const muzakkiRes = http.get(
    `${__ENV.BASE_URL}/muzakki/get/getAllMuzakki`,
    headers,
  );
  expectOk(muzakkiRes, "GET all muzakki for ZIS setup");
  const muzakki = getList(muzakkiRes)[0];
  if (!muzakki?.id) {
    throw new Error(
      "Data muzakki existing diperlukan untuk performance test ZIS",
    );
  }

  const mustahikRes = http.get(
    `${__ENV.BASE_URL}/mustahik/get/getAllMustahik`,
    headers,
  );
  expectOk(mustahikRes, "GET all mustahik for ZIS setup");
  const mustahik = getList(mustahikRes)[0];
  if (!mustahik?.id) {
    throw new Error(
      "Data mustahik existing diperlukan untuk performance test ZIS",
    );
  }

  return { token, muzakki, mustahik };
}

export default function (data) {
  const unique = makeUnique();
  const headers = jsonHeaders(data.token);

  const pemasukanPayload = {
    muzakki_id: data.muzakki.id,
    kategori: kategoriZIS,
    jumlah: 100000,
    deskripsi: `Pemasukan ZIS K6 ${unique}`,
    tanggal_penghimpunan: today,
    nama_muzakki: data.muzakki.nama_lengkap,
  };

  const createPemasukan = http.post(
    `${__ENV.BASE_URL}/pemasukanZIS/add/addPemasukanZIS`,
    JSON.stringify(pemasukanPayload),
    headers,
  );
  expectOk(createPemasukan, "POST pemasukan ZIS");
  const pemasukanId = getCreatedId(createPemasukan);

  expectOk(
    http.get(`${__ENV.BASE_URL}/pemasukanZIS/get/getAllPemasukanZIS`, headers),
    "GET all pemasukan ZIS",
  );
  expectOk(
    http.get(
      `${__ENV.BASE_URL}/pemasukanZIS/get/getPemasukanZISById/${pemasukanId}`,
      headers,
    ),
    "GET pemasukan ZIS by id",
  );

  if (data.muzakki.nik && data.muzakki.nomor_telpon) {
    expectOk(
      http.get(
        `${__ENV.BASE_URL}/pemasukanZIS/get/getRiwayatPemasukanZISByNik?nik=${data.muzakki.nik}&last_phone_digits=${data.muzakki.nomor_telpon.toString().slice(-4)}`,
        headers,
      ),
      "GET riwayat pemasukan ZIS by nik",
    );
  }

  expectOk(
    http.put(
      `${__ENV.BASE_URL}/pemasukanZIS/update/updatePemasukanZIS/${pemasukanId}`,
      JSON.stringify({ ...pemasukanPayload, jumlah: 120000 }),
      headers,
    ),
    "PUT pemasukan ZIS",
  );

  const pengeluaranPayload = {
    mustahik_id: data.mustahik.id,
    kategori: kategoriZIS,
    jumlah: 1000,
    deskripsi: `Pengeluaran ZIS K6 ${unique}`,
    tanggal_penyaluran: today,
    nama_mustahik: data.mustahik.nama_lengkap,
  };

  const createPengeluaran = http.post(
    `${__ENV.BASE_URL}/pengeluaranZIS/add/addPengeluaranZIS`,
    JSON.stringify(pengeluaranPayload),
    headers,
  );
  expectOk(createPengeluaran, "POST pengeluaran ZIS");
  const pengeluaranId = getCreatedId(createPengeluaran);

  expectOk(
    http.get(
      `${__ENV.BASE_URL}/pengeluaranZIS/get/getAllPengeluaranZIS`,
      headers,
    ),
    "GET all pengeluaran ZIS",
  );
  expectOk(
    http.get(
      `${__ENV.BASE_URL}/pengeluaranZIS/get/getPengeluaranZISById/${pengeluaranId}`,
      headers,
    ),
    "GET pengeluaran ZIS by id",
  );
  expectOk(
    http.put(
      `${__ENV.BASE_URL}/pengeluaranZIS/update/updatePengeluaranZIS/${pengeluaranId}`,
      JSON.stringify({ ...pengeluaranPayload, jumlah: 1500 }),
      headers,
    ),
    "PUT pengeluaran ZIS",
  );

  sleep(1);
}
