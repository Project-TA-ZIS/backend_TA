const { spawnSync } = require("child_process");
const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");

const rootDir = path.resolve(__dirname, "..");

function loadEnvFile(relativePath) {
  const envPath = path.join(rootDir, relativePath);

  if (fs.existsSync(envPath)) {
    dotenv.config({ path: envPath });
    console.log(`Loaded environment file: ${relativePath}`);
  }
}

loadEnvFile(".env.performance");
loadEnvFile(path.join("performance", ".env.test.local"));

const tests = {
  login: "login.k6.js",
  dasawisma: "manajemenDasawisma.k6.js",
  zis: "manajemenZIS.k6.js",
};

const requestedTest = process.argv[2] || "all";
const availableTests = Object.keys(tests);

if (requestedTest === "--list") {
  console.log(availableTests.join("\n"));
  process.exit(0);
}

if (requestedTest !== "all" && !tests[requestedTest]) {
  console.error(`Unknown performance test: ${requestedTest}`);
  console.error(`Available tests: ${availableTests.join(", ")}, all`);
  process.exit(1);
}

const selectedTests =
  requestedTest === "all" ? availableTests : [requestedTest];

const resultDir = path.join(rootDir, "performance", "result");
const timestamp = new Date().toISOString().replace(/[:.]/g, "-");

fs.mkdirSync(resultDir, { recursive: true });

for (const testName of selectedTests) {
  const testFile = path.join("performance", tests[testName]);
  const outputFile = path.join(resultDir, `${timestamp}-${testName}.jsonl`);
  const testEnv = { ...process.env };

  if (testName === "dasawisma") {
    testEnv.K6_EMAIL = process.env.K6_DASAWISMA_EMAIL || process.env.K6_EMAIL;
    testEnv.K6_PASSWORD =
      process.env.K6_DASAWISMA_PASSWORD || process.env.K6_PASSWORD;
  }

  if (testName === "zis") {
    testEnv.K6_EMAIL = process.env.K6_AMIL_EMAIL || process.env.K6_EMAIL;
    testEnv.K6_PASSWORD =
      process.env.K6_AMIL_PASSWORD || process.env.K6_PASSWORD;
  }

  if (!testEnv.BASE_URL) {
    console.error("BASE_URL is required.");
    process.exit(1);
  }

  if (!testEnv.K6_EMAIL || !testEnv.K6_PASSWORD) {
    console.error(`K6 credential is required for ${testName} test.`);
    console.error("Use K6_EMAIL/K6_PASSWORD or the role-specific variables.");
    process.exit(1);
  }

  console.log(`\nRunning ${testName} performance test`);
  console.log(`Raw JSONL output: ${outputFile}\n`);

  const result = spawnSync(
    "k6",
    ["run", "--out", `json=${outputFile}`, testFile],
    {
      cwd: rootDir,
      env: testEnv,
      shell: process.platform === "win32",
      stdio: "inherit",
    },
  );

  if (result.status !== 0) {
    console.error(`\n${testName} performance test failed.`);
    process.exit(result.status || 1);
  }
}

console.log(`\nPerformance result files saved in: ${resultDir}`);
