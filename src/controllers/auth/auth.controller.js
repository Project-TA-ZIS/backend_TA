require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const amilRepo = require("../../repositories/ZIS_monitoring_repo/amil.repo");
const dasawismaRepo = require("../../repositories/dasawisma_monitoring_repo/anggotaDasawisma.repo");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const amil = await amilRepo.getAmilByEmail(email);
    if (amil) {
      const isPasswordValid = await bcrypt.compare(password, amil.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: "password salah" });
      }
      const token = jwt.sign(
        { id: amil.id, role: amil.role },
        process.env.JWT_SECRET,
        { expiresIn: "1h" },
      );
      return res.json({ message: "login berhasil", token });
    }

    const dasawisma = await dasawismaRepo.getAnggotaDasawismaByEmail(email);
    if (dasawisma) {
      const isPasswordValid = await bcrypt.compare(
        password,
        dasawisma.password,
      );
      if (!isPasswordValid) {
        return res.status(401).json({ message: "password salah" });
      }
      const token = jwt.sign(
        { id: dasawisma.id, role: dasawisma.role },
        process.env.JWT_SECRET,
        { expiresIn: "1h" },
      );
      return res.json({ message: "login berhasil", token });
    }

    res.status(400).json({ message: "username atau password salah" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getUserLoggedIn = async (req, res) => {
  try {
    const userId = req.id;
    const userRole = req.role;
    let userData;

    if (userRole === "amil") {
      userData = await amilRepo.getAmilById(userId);
    } else if (
      userRole === "anggota dasawisma" ||
      userRole === "koordinator dasawisma"
    ) {
      userData = await dasawismaRepo.getAnggotaDasawismaById(userId);
    }

    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User data retrieved successfully", user: userData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const cekEmailTerpakai = async (email) => {
  const [dasawisma, amil] = await Promise.all([
    dasawismaRepo.getAnggotaDasawismaByEmail(email),
    amilRepo.getAmilByEmail(email),
  ]);

  return dasawisma || amil;
};

const cekEmail = async (email) => {
  const user = await cekEmailTerpakai(email);
  return !!user;
};

module.exports = {
  login,
  getUserLoggedIn,
  cekEmail,
  cekEmailTerpakai,
};
