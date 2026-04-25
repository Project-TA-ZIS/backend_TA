require("dotenv").config();
const PORT = process.env.PORT;
const express = require("express");
const cors = require("cors");
const app = require("../src/app")


app.use(express.json());
app.use(cors());

app.listen(PORT, () => {
  console.log(`listening at http://localhost:${PORT}`);
});
