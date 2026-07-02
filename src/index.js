require("dotenv").config();
const PORT = process.env.PORT;
const express = require("express");
const cors = require("cors");
const app = require("../src/app")
const chalk = require('chalk');
const serverUrl = process.env.API_BASE_URL || `http://localhost:${PORT}`;

app.use(express.json());
app.use(cors());

app.listen(PORT, () => {
  console.log(chalk.green.bold("\n🚀 Server is running!\n"));
  console.log(
    chalk.cyan("API Base URL: ") +
      chalk.whiteBright(`${serverUrl}\n`)
  );
  console.log(
    chalk.yellow("Swagger Docs : ") +
      chalk.whiteBright(`${serverUrl}/api-docs\n`)
  );
});
