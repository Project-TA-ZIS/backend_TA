require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const verifyJWT = require("./middleware/verifyToken");

app.use(cors());
app.use(express.json());
app.use("/auth", require("./routes/auth_routes/auth.routes"));
app.use(
  "/amil",
  verifyJWT,
  require("./routes/ZIS_monitoring_routes/amil.routes"),
);
app.use(
  "/dasawisma",
  verifyJWT,
  require("./routes/dasawisma_monitoring_routes/anggotaDasawisma.routes"),
);
app.use(
  "/mustahik",
  verifyJWT,
  require("./routes/ZIS_monitoring_routes/mustahik.routes"),
);
app.use(
  "/muzakki",
  verifyJWT,
  require("./routes/ZIS_monitoring_routes/muzakki.routes"),
);

// const bcrypt = require('bcrypt');
// bcrypt.hash('testdasawisma', 10).then(console.log);

module.exports = app;
