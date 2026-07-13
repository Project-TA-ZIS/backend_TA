import http from "k6/http";
import { check, sleep } from "k6";
import { stages, thresholds } from "./config.k6.js";

export const options = {
  stages: stages(),
  thresholds,
};

// =====================================================
// LOGIN SEKALI
// =====================================================
export function setup() {
  const loginRes = http.post(
    `${__ENV.BASE_URL}/auth/post/login`,
    JSON.stringify({
      email: __ENV.K6_EMAIL,
      password: __ENV.K6_PASSWORD,
    }),
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  check(loginRes, {
    "login success": (r) => r.status === 200,
  });

  const body = JSON.parse(loginRes.body);

  return {
    token: body.token,
  };
}

// =====================================================
// TEST ZIS
// =====================================================
export default function (data) {
  const headers = {
    headers: {
      Authorization: `Bearer ${data.token}`,
      "Content-Type": "application/json",
    },
  };

  // ==========================================
  // GET PEMASUKAN ZIS
  // ==========================================
  const pemasukanRes = http.get(
    `${__ENV.BASE_URL}/pemasukanZIS/get/getAllPemasukanZIS`,
    headers,
  );

  check(pemasukanRes, {
    "GET pemasukan ZIS status 200": (r) => r.status === 200,
  });

  // ==========================================
  // GET PENGELUARAN ZIS
  // ==========================================
  const pengeluaranRes = http.get(
    `${__ENV.BASE_URL}/pengeluaranZIS/get/getAllPengeluaranZIS`,
    headers,
  );

  check(pengeluaranRes, {
    "GET pengeluaran ZIS status 200": (r) => r.status === 200,
  });

  // ==========================================
  // GET TOTAL ZIS
  // ==========================================
  const totalRes = http.get(
    `${__ENV.BASE_URL}/totalZIS/get/getTotalAllPemasukanZIS`,
    headers,
  );

  check(totalRes, {
    "GET total ZIS status 200": (r) => r.status === 200,
  });

  sleep(1);
}
