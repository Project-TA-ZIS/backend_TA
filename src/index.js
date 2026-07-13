require("dotenv").config();
const PORT = process.env.PORT;
const express = require("express");
const cors = require("cors");
const app = require("../src/app");
const chalk = require("chalk");
const serverUrl = process.env.API_BASE_URL || `http://localhost:${PORT}`;

app.use(express.json());

const allowedOrigins = (
  process.env.NODE_ENV === "production"
    ? process.env.FRONTEND_URLS
    : "http://localhost:5173"
)
  .split(",")
  .map((origin) => origin.trim());

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  }),
);

app.listen(PORT, () => {
  console.log(chalk.green.bold("\n🚀 Server is running!\n"));
  console.log(
    chalk.cyan("API Base URL: ") + chalk.whiteBright(`${serverUrl}\n`),
  );
  console.log(
    chalk.yellow("Swagger Docs : ") +
      chalk.whiteBright(`${serverUrl}/api-docs\n`),
  );
});
