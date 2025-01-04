import { User } from "../model/user.js";
import bcrypt from "bcryptjs";
import { generateVerificationToken } from "../utils/generateVeriificationToken.js";
import { generateJWTToken } from "../utils/generateJWTToken.js";
import {
  generateSignUpMail,
  sendWelcomeEmail,
  sendResetPasswordEmail,
} from "../emails/email.js";
import crypto from "crypto";

// signup
export const signUp = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    if (!name || !email || !password) {
      return res.status(400).json({
        status: "false",
        message: "All fields are required",
      });
    }
    const userAlreadyExists = await User.findOne({ email });
    if (userAlreadyExists) {
      return res.status(400).json({
        status: "false",
        message: "User already exists",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = generateVerificationToken();
    const user = new User({
      name,
      email,
      password: hashedPassword,
      verificationToken,
      verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
    });

    await user.save();

    // generate auth token
    generateJWTToken(res, user._id);

    // send user verifactiontoken
    generateSignUpMail(user.email, user.verificationToken);
    return res.status(201).json({
      status: true,
      message:
        "User Created Successfully, A verification code has been sent to ur mail",
    });
  } catch (error) {
    console.log(error);
  }
};

// login
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "username or password is not correct",
      });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({
        success: false,
        message: "username or password is not correct",
      });
    }
    const isVerified = user.isVerified;
    if (!isVerified) {
      return res.status(400).json({
        success: false,
        message: "user not verified",
      });
    }
    generateJWTToken(res, user._id);
    return res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        token: generateJWTToken(res, user._id),
        isVerified: user.isVerified,
      },
    });
  } catch (err) {
    res.status(200).json({
      status: false,
      message: err,
    });
  }
};

// verify email
export const verify = async (req, res) => {
  const { code } = req.body;
  try {
    const user = await User.findOne({
      verificationToken: code,
      verificationTokenExpiresAt: { $gt: Date.now() },
    });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired verification code",
      });
    }
    (user.isVerified = true),
      (user.verificationToken = undefined),
      (user.verificationTokenExpiresAt = undefined);
    await user.save();

    sendWelcomeEmail(user.email, user.name);
    return res.status(200).json({
      status: true,
      message: "Email verified successfully",
    });
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: err,
    });
  }
};

//   forgot password
export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }
    const resetPasswordToken = crypto.randomBytes(32).toString("hex");
    const resetPasswordTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000; //1hr

    user.resetPasswordToken = resetPasswordToken;
    user.resetPasswordTokenExpiresAt = resetPasswordTokenExpiresAt;

    await user.save();

    sendResetPasswordEmail(
      user.email,
      `${process.env.CLIENT_URL}/reset-password/${resetPasswordToken}`
    );
    return res.status(200).json({
      status: true,
      message: "Reset Email sent to you successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: err,
    });
  }
};

//   logout
export const logout = async (req, res) => {
  res.clearCookie("token");
  res.status(200).json({
    status: true,
    message: "Logged Out successfully",
  });
};
