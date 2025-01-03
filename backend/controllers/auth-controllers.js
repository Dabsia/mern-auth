import { User } from "../model/user.js";
import bcrypt from "bcryptjs";
import { generateVerificationToken } from "../utils/generateVeriificationToken.js";
import { generateJWTToken } from "../utils/generateJWTToken.js";
import { generateSignUpMail } from "../emails/email.js";

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
    await generateSignUpMail(user.email, user.verificationToken);
    return res.status(201).json({
      status: "success",
      message:
        "User Created Successfully, A verification code has been sent to ur mail",
    });
  } catch (error) {
    console.log(error);
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
