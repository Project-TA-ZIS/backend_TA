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

export default function () {
  const url = `${__ENV.BASE_URL}/auth/post/login`;

  const payload = JSON.stringify({
    email: __ENV.K6_EMAIL,
    password: __ENV.K6_PASSWORD,
  });

  const params = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const res = http.post(url, payload, params);

  check(res, {
    "status is 200": (r) => r.status === 200,
    "response time < 3s": (r) => r.timings.duration < 3000,
  });

  if (res.status !== 200) {
    console.log(`Status: ${res.status}`);
    console.log(res.body);
  }

  sleep(1);
}
