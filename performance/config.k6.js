export const stages = () => {
  return [
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
