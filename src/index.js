require("dotenv").config();
const PORT = process.env.PORT;
const express = require("express");
const cors = require("cors");
const app = express();

// Initialize upload directories on startup
initializeUploadDirectories();

app.use(express.json());
app.use(cors());

app.listen(PORT, () => {
  console.log(`listening at http://localhost:${PORT}`);
});
