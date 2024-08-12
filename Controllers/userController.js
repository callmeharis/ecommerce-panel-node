// const UserModel = require('../models/userModel');
const UserModel = require("../Models/userModel");
const transporter = require("../middleware/emailTransporter");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.createUser = async (req, res) => {
  const { username, email, password, fullName, address, phone } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const createUser = new UserModel({
      username,
      email,
      password: hashedPassword,
      fullName,
      address,
      phone,
    });

    await createUser.save();

    res.status(201).json({ message: "User created successfully", createUser });
  } catch (error) {
    res
      .status(500)
      .json({ message: "User creation failed", error: error.message });
    console.log("User creation failed:", error);
  }
};

exports.updateUser = async (req, res) => {
  const { id } = req.params;
  // const { username, email, password, fullName, address, phone } = req.body;
  const changes = req.body;

  try {
    const user = await UserModel.findByIdAndUpdate(id, changes, { new: true });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // await user.save();

    res.status(200).json({ message: "User updated successfully", user });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
    console.log("User update failed:", error);
  }
};

exports.deleteUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await UserModel.findByIdAndDelete(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully", user });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Intervel Server Error", error: error.message });
    console.log("User delete failed:", error);
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Intervel server Error", error: error.message });
    console.error("Login failed:", error);
  }
};

exports.SendResetPasswordEmailUser = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found with this email" });
    }
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    const mailOptions = {
      from: process.env.HOST_MAIL,
      to: email,
      subject: "Reset Password",
      text: `This is your reset password link:\n\n${process.env.FRONTEND_URL}/reset-password/${token}`,
    };
    await transporter.sendMail(mailOptions);

    return res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Failed to send reset email:", error);
    return res
      .status(500)
      .json({ message: "intervel server error", error: error.message });
  }
};
exports.changePasswordUser = async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  try {
    const tokenDetails = jwt.verify(token, process.env.JWT_SECRET);
    const { userId } = tokenDetails;

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const user = await UserModel.findByIdAndUpdate(
      userId,
      { password: hashedPassword },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    console.error("Password change failed:", error);
    return res
      .status(500)
      .json({ message: "Intervel Server Error", error: error.message });
  }
};
