import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
  stages: [
    { duration: "30s", target: 10 }, // ramp-up ke 10 user
    { duration: "1m", target: 50 }, // naik ke 50 user
    { duration: "1m", target: 100 }, // naik ke 100 user
    { duration: "30s", target: 0 }, // ramp-down
  ],

  thresholds: {
    http_req_duration: ["p(95)<3000"], // 95% request harus selesai dalam 3 detik
    http_req_failed: ["rate<0.05"], // kurang dari 5% request boleh gagal
  },
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
