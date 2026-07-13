import http from "k6/http";
import { check, sleep } from "k6";
import { stages, thresholds } from "./config.k6.js";

export const options = {
  stages: stages(),
  thresholds,
};

// =====================================================
// LOGIN SEKALI SAJA
// =====================================================
export function setup() {
  const loginUrl = `${__ENV.BASE_URL}/auth/post/login`;

  const payload = JSON.stringify({
    email: __ENV.K6_EMAIL,
    password: __ENV.K6_PASSWORD,
  });

  const params = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const loginRes = http.post(loginUrl, payload, params);

  check(loginRes, {
    "login status 200": (r) => r.status === 200,
  });

  if (loginRes.status !== 200) {
    throw new Error(
      `Login gagal. Status: ${loginRes.status}\n${loginRes.body}`,
    );
  }

  const body = JSON.parse(loginRes.body);

  // SESUAIKAN DENGAN RESPONSE LOGIN ANDA
  const token = body.token;

  return {
    token,
  };
}

// =====================================================
// LOAD TEST
// =====================================================
export default function (data) {
  const authHeaders = {
    headers: {
      Authorization: `Bearer ${data.token}`,
      "Content-Type": "application/json",
    },
  };

  // ==========================================
  // GET PEMASUKAN DASAWISMA
  // ==========================================
  const pemasukanRes = http.get(
    `${__ENV.BASE_URL}/pemasukanDasawisma/get/getAllPemasukan`,
    authHeaders,
  );

  check(pemasukanRes, {
    "GET pemasukan status 200": (r) => r.status === 200,
  });

  // ==========================================
  // GET PENGELUARAN DASAWISMA
  // ==========================================
  const pengeluaranRes = http.get(
    `${__ENV.BASE_URL}/pengeluaranDasawisma/get/getAllPengeluaran`,
    authHeaders,
  );

  check(pengeluaranRes, {
    "GET pengeluaran status 200": (r) => r.status === 200,
  });

  // ==========================================
  // GET TOTAL KAS DASAWISMA
  // ==========================================
  const totalKasRes = http.get(
    `${__ENV.BASE_URL}/totalKasDasawisma/get/getTotalKasDasawisma`,
    authHeaders,
  );

  check(totalKasRes, {
    "GET total kas status 200": (r) => r.status === 200,
  });

  sleep(1);
}
