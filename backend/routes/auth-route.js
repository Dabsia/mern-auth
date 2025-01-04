import express from "express";
import {
  login,
  signUp,
  forgotPassword,
  logout,
  resetPassword,
  verify,
} from "../controllers/auth-controllers.js";
const router = express();

// sign up
router.post("/signup", signUp);

// login
router.post("/login", login);

// forgot password
router.post("/forgot-password", forgotPassword);

// verify
router.post("/reset-password/:token", resetPassword);

// logout
router.post("/logout", logout);

// verify
router.post("/verify", verify);

export default router;
