export const stages = () => {
  return [
    // { duration: "10s", target: 10 }, // ramp-up ke 10 user
    // { duration: "1m", target: 50 }, // naik ke 50 user
    // { duration: "1m", target: 100 }, // naik ke 100 user
    // { duration: "30s", target: 0 }, // ramp-down
    
    { duration: "1m", target: 10 },
    { duration: "1m", target: 25 },
    { duration: "1m", target: 50 },
    { duration: "1m", target: 75 },
    { duration: "1m", target: 100 },
    { duration: "1m", target: 110 },
    { duration: "1m", target: 125 },
    { duration: "1m", target: 150 },
  ];
};

export const thresholds = {
  http_req_duration: ["p(95)<3000"],
  http_req_failed: ["rate<0.05"],
};
