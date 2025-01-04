import nodemailer from "nodemailer";
import Mailgen from "mailgen";

export const emailSetup = () => {
  let config = {
    service: "gmail",
    auth: {
      user: process.env.NODEMAILER_EMAIL,
      pass: process.env.NODEMAILER_PASSWORD,
    },
  };
  return config;
};
export const transporter = () => {
  return nodemailer.createTransport(config);
};

export const mailGenerator = () => {
  new Mailgen({
    theme: "default",
    product: {
      name: "Mailgen",
      link: "https://mailgen.js",
    },
  });
};
