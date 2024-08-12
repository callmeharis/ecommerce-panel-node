const Admin = require("../Models/adminModel");
const transporter = require("../middleware/emailTransporter");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.createAdmin = async (req, res) => {
  const { username, email, password, phone } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const createAdmin = new Admin({
      username,
      email,
      password: hashedPassword,
      phone,
    });
    await createAdmin.save();
    return res.status(201).json({ message: "admin created ", createAdmin });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

exports.updateAdmin = async (req, res) => {
  const { id } = req.params;

  const changes = req.body;
  try {
    const Admin_up = await Admin.findByIdAndUpdate(id, changes, { new: true });

    if (!Admin_up) {
      return res.status(404).json({ message: " admin not found" });
    }
    res.status(200).json({ message: "Admin update successfully", Admin_up });
  } catch (error) {
    console.log("Error in updating", error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

exports.loginAdmin = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(404).json({ message: "admin not found" });
    }
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: "invalid password" });
    }
    const token = jwt.sign(
      { adminId: admin._id, email: admin.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.status(200).json({ message: "login successful", token });
  } catch (error) {
    console.log("wrong email and password");
    res.status(500).json({ message: "intervel server error" });
  }
};

exports.SendResetPasswordEmailAdmin = async (req, res) => {
  const { email } = req.body;
  try {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res
        .status(404)
        .json({ mesage: " admin not found with this email" });
    }
    const token = jwt.sign(
      { adminId: admin._id, email: admin.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    const mailOption = {
      from: process.env.HOST_MAIL,
      to: email,
      subject: "reset password",
      text: `this is reset password link:\n/${token}`,
    };
    await transporter.sendMail(mailOption);
    return res.status(200).json({ mesage: "email send sucessfully" });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ message: "intervel server error", error: error.message });
  }
};

exports.changePasswordAdmin = async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;
  try {
    const tokenDetails = jwt.verify(token, process.env.JWT_SECRET);
    const { adminId } = tokenDetails;
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const admin = await Admin.findByIdAndUpdate(
      adminId,
      { passsword: hashedPassword },
      { new: true }
    );
    if (!admin) {
      return res
        .status(404)
        .json({ mesg: " Password reset succesfully", hashedPassword });
    }

    res.status(200).json({ mesg: "password changed successfully" });
  } catch (error) {
    console.log(error.message);
  }
};

exports.deleteAdmin = async (req, res) => {
  const { id } = req.params;

  try {
    const Admin_del = await Admin.findByIdAndDelete(id);

    if (!Admin_del) {
      return res.status(404).json({ message: "Admin not found" });
    }
    res.status(200).json({ message: "Admin deleted successfully" });
  } catch (error) {
    console.error("Error in deleting:", error);
    res.status(500).json({ message: "intervel server error" });
  }
};
