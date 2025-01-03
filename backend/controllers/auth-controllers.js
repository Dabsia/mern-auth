import { User } from "../model/user.js";
import bcrypt from "bcryptjs";
import { generateVerificationToken } from "../utils/generateVeriificationToken.js";
import { generateJWTToken } from "../utils/generateJWTToken.js";

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

    generateJWTToken(res, user._id);

    return res.status(201).json({
      status: "success",
      message: "User Created Successfully",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    return res.status(400).json({
      status: "failed",
      message: error.message,
    });
  }
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
