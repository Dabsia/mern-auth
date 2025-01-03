import jwt from "jsonwebtoken";

export const generateJWTToken = (res, userID) => {
  const token = jwt.sign({ userID }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  res.cookie("token", token, {
    httpOnly: true, //cookie can not be accessed by client side scripts.
    secure: process.env.NODE_ENV === "production", // cookie will only be on https
    sameSite: "strict", //cookie will only be on the same site
    maxAge: 1 * 60 * 60 * 1000,
  });
  return token;
};
