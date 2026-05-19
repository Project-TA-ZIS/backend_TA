require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const verifyJWT = require("./middleware/verifyToken");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");

app.use(cors());
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
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
app.use(
  "/pemasukanZIS",
  verifyJWT,
  require("./routes/ZIS_monitoring_routes/pemasukanZIS.routes"),
);

app.use(
  "/totalZIS",
  verifyJWT,
  require("./routes/ZIS_monitoring_routes/totalZIS.routes"),
);
app.use(
  "/pengeluaranZIS",
  verifyJWT,
  require("./routes/ZIS_monitoring_routes/penyaluranZIS.routes"),
);
app.use(
  "/pemasukanDasawisma",
  verifyJWT,
  require("./routes/dasawisma_monitoring_routes/pemasukanDasawisma.routes"),
);
app.use(
  "/totalKasDasawisma",
  verifyJWT,
  require("./routes/dasawisma_monitoring_routes/totalKasDasawisma.routes"),
);
app.use(
  "/pengeluaranDasawisma",
  verifyJWT,
  require("./routes/dasawisma_monitoring_routes/penyaluranDasawisma.routes"),
);

module.exports = app;
