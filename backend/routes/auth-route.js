import express from "express";
import {
  login,
  signUp,
  forgotPassword,
  logout,
} from "../controllers/auth-controllers.js";
const router = express();

// sign up
router.post("/signup", signUp);

// login
router.post("/login", login);

// forgot password
router.post("/signup", forgotPassword);

// logout
router.post("/logout", logout);

export default router;
