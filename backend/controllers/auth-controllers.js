import { User } from "../model/user.js";
import bcrypt from "bcryptjs";
import { generateVerificationToken } from "../utils/generateVeriificationToken.js";

// signup
export const signUp = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    if (!name || !email || !password) {
      res.status(400).json({
        status: "false",
        message: "All fields are required",
      });
    }
    const userAlreadyExists = User.findOne({ email });
    if (userAlreadyExists) {
      res.status(400).json({
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
    });
  } catch (error) {}
  res.status(200).json({
    status: "succes",
    message: "HELLLO",
  });
};

// login
export const login = (req, res) => {
  res.status(200).json({
    status: "succes",
    message: "HELLLO",
  });
};

//   forgot password
export const forgotPassword = (req, res) => {
  res.status(200).json({
    status: "succes",
    message: "HELLLO",
  });
};

//   logout
export const logout = (req, res) => {
  res.status(200).json({
    status: "succes",
    message: "HELLLO",
  });
};
