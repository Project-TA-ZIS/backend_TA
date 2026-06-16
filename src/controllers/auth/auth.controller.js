require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const amilRepo = require("../../repositories/ZIS_monitoring_repo/amil.repo");
const dasawismaRepo = require("../../repositories/dasawisma_monitoring_repo/anggotaDasawisma.repo");
const mustahikRepo = require("../../repositories/ZIS_monitoring_repo/mustahik.repo");
const muzakkiRepo = require("../../repositories/ZIS_monitoring_repo/muzakki.repo");
const transporter = require("../../config/mail.config");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const amil = await amilRepo.getAmilByEmail(email);
    if (amil) {
      const isPasswordValid = await bcrypt.compare(password, amil.password);
      if (!isPasswordValid) {
        return res
          .status(401)
          .json({ message: "username atau password salah" });
      }
      const token = jwt.sign(
        { id: amil.id, roles: amil.roles },
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
        return res
          .status(401)
          .json({ message: "username atau password salah" });
      }
      const token = jwt.sign(
        { id: dasawisma.id, roles: dasawisma.roles, rw: dasawisma.rw_id },
        process.env.JWT_SECRET,
        { expiresIn: "1h" },
      );
      return res.json({ message: "login berhasil", token });
    }

    res.status(400).json({ message: "Akun belum terdaftar" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getUserLoggedIn = async (req, res) => {
  try {
    const userId = req.id;
    const userroles = req.roles;
    let userData;

    if (userroles === "amil zakat") {
      userData = await amilRepo.getAmilById(userId);
    } else if (
      userroles === "kader dasawisma" ||
      userroles === "penanggung jawab dasawisma"
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

const cekNIKTerpakai = async (nik) => {
  const [mustahik, muzakki] = await Promise.all([
    mustahikRepo.getMustahikByNik(nik),
    muzakkiRepo.getMuzakkiByNik(nik),
  ]);

  return mustahik || muzakki;
};

const cekNIK = async (nik) => {
  const user = await cekNIKTerpakai(nik);
  return !!user;
};

const comparePassword = async (plainPassword, hashedPassword) => {
  return await bcrypt.compare(plainPassword, hashedPassword);
};

const hashPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

const validateDate = (dateString) => {
  if (!dateString) return false;

  const inputDate = new Date(dateString);

  if (isNaN(inputDate.getTime())) {
    return false;
  }

  const today = new Date();

  today.setHours(0, 0, 0, 0);
  inputDate.setHours(0, 0, 0, 0);

  return inputDate <= today;
};

const requestPasswordReset = async (req, res) => {
  const { email } = req.body;

  try {
    let user = null;
    let role = null;

    const dasawisma = await dasawismaRepo.getAnggotaDasawismaByEmail(email);
    if (dasawisma) {
      user = dasawisma;
      role = dasawisma.roles;
    }

    if (!user) {
      const amil = await amilRepo.getAmilByEmail(email);
      if (amil) {
        user = amil;
        role = amil.roles;
      }
    }

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Email tidak ditemukan." });
    }

    const token = jwt.sign(
      { id: dasawisma.id, roles: dasawisma.roles },
      process.env.JWT_SECRET,
      { expiresIn: "30m" },
    );

    const resetLink = `${process.env.WEB_URL}/resetPassword/${token}`;

    const mailOptions = {
      from: process.env.AUTH_EMAIL,
      to: email,
      subject: "Permintaan Atur Ulang Password Anda",
      headers: {
        "X-Priority": "1",
        "X-MSMail-Priority": "High",
        Importance: "high",
      },
      html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
        <h2 style="color: #333;">Reset Password Akun Anda</h2>
        <p>Halo,</p>
        <p>Kami menerima permintaan untuk mengatur ulang password akun Anda. Jika Anda tidak merasa melakukan permintaan ini, abaikan saja email ini dan tidak akan terjadi perubahan apa pun.</p>

        <p>Untuk melanjutkan proses pengaturan ulang password, silakan klik tombol di bawah ini:</p>

        <div style="text-align: center; margin: 30px 0;">
          <a href="${resetLink}" style="background-color: #4CAF50; color: white; padding: 12px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">
            Reset Password
          </a>
        </div>

        <p><strong>Catatan:</strong> Link ini hanya berlaku selama <strong>15 menit</strong> demi keamanan akun Anda.</p>

        <p>Terima kasih telah menggunakan layanan kami.</p>

        <hr style="margin: 30px 0;">
        <p style="font-size: 12px; color: #888;">Email ini dikirim secara otomatis, mohon untuk tidak membalas. Jika Anda membutuhkan bantuan, silakan hubungi tim dukungan kami.</p>
      </div>
    `,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({
      success: true,
      token: token,
      message: "Email reset password telah dikirim.",
    });
  } catch (error) {
    console.error("Error mengirim email reset password:", error);
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

const validateResetToken = async (req, res) => {
  try {
    const { token } = req.params;

    jwt.verify(token, process.env.JWT_SECRET);

    return res.status(200).json({
      success: true,
      message: "Token valid",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Token expired atau tidak valid",
    });
  }
};

const resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const hashedPassword = await hashPassword(newPassword);
    if (decoded.roles === "amil zakat") {
      await amilRepo.updateAmilPassword(decoded.id, hashedPassword);
    }
    if (
      decoded.roles === "kader dasawisma" ||
      decoded.roles === "penanggung jawab dasawisma"
    ) {
      await dasawismaRepo.updatePassword(decoded.id, hashedPassword);
    }
    res
      .status(200)
      .json({ success: true, message: "Password berhasil diperbarui." });
  } catch (error) {
    console.error("Error memperbarui password:", error);
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

module.exports = {
  login,
  getUserLoggedIn,
  cekEmailTerpakai,
  cekEmail,
  cekNIKTerpakai,
  cekNIK,
  comparePassword,
  hashPassword,
  validateDate,
  requestPasswordReset,
  resetPassword,
  validateResetToken,
};
