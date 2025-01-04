import nodemailer from "nodemailer";
import Mailgen from "mailgen";
// import { emailSetup, transporter, mailGenerator } from "../utils/emailSetup";

export const generateSignUpMail = (email, verificationCode) => {
  let config = {
    service: "gmail",
    auth: {
      user: process.env.NODEMAILER_EMAIL,
      pass: process.env.NODEMAILER_PASSWORD,
    },
  };

  let transporter = nodemailer.createTransport(config);

  let mailGenerator = new Mailgen({
    theme: "default",
    product: {
      name: "Mailgen",
      link: "https://mailgen.js",
    },
  });
  let response = {
    body: {
      name: "John Appleseed",
      intro: "Welcome to Mailgen! We're very excited to have you on board.",
      action: {
        instructions: `This is your verification code: ${verificationCode}`,
        button: {
          color: "#22BC66", // Optional action button color
          text: "Confirm your account",
          link: "https://mailgen.js/confirm?s=d9729feb74992cc3482b350163a1a010",
        },
      },
      outro:
        "Need help, or have questions? Just reply to this email, we'd love to help.",
    },
  };

  let mail = mailGenerator.generate(response);

  let message = {
    from: process.env.NODEMAILER_EMAIL,
    to: email,
    subject: "Verification Code",
    html: mail,
  };

  transporter
    .sendMail(message)
    .then(() => {
      console.log("worked");
    })
    .catch((err) => {
      console.log(err);
    });
};

export const sendWelcomeEmail = (email, name) => {
  let config = {
    service: "gmail",
    auth: {
      user: process.env.NODEMAILER_EMAIL,
      pass: process.env.NODEMAILER_PASSWORD,
    },
  };

  let transporter = nodemailer.createTransport(config);

  let mailGenerator = new Mailgen({
    theme: "default",
    product: {
      name: "Mailgen",
      link: "https://mailgen.js",
    },
  });
  let response = {
    body: {
      name: `${name}`,
      intro: "Welcome to Mailgen! We're very excited to have you on board.",
      action: {
        button: {
          color: "#22BC66", // Optional action button color
          text: "Confirm your account",
          link: "https://mailgen.js/confirm?s=d9729feb74992cc3482b350163a1a010",
        },
      },
      outro:
        "Need help, or have questions? Just reply to this email, we'd love to help.",
    },
  };

  let mail = mailGenerator.generate(response);

  let message = {
    from: process.env.NODEMAILER_EMAIL,
    to: email,
    subject: "Welcome Email",
    html: mail,
  };

  transporter
    .sendMail(message)
    .then(() => {
      console.log("worked");
    })
    .catch((err) => {
      console.log(err);
    });
};

// send resetpassword email
export const sendResetPasswordEmail = (email, resetUrl) => {
  let config = {
    service: "gmail",
    auth: {
      user: process.env.NODEMAILER_EMAIL,
      pass: process.env.NODEMAILER_PASSWORD,
    },
  };

  let transporter = nodemailer.createTransport(config);

  let mailGenerator = new Mailgen({
    theme: "default",
    product: {
      name: "Mailgen",
      link: "https://mailgen.js",
    },
  });
  let response = {
    body: {
      name: `hello`,
      intro: "",
      action: {
        button: {
          color: "#22BC66", // Optional action button color
          text: "Click here to reset your password",
          link: `${resetUrl}`,
        },
      },
      outro: "",
    },
  };

  let mail = mailGenerator.generate(response);

  let message = {
    from: process.env.NODEMAILER_EMAIL,
    to: email,
    subject: "Reset Password",
    html: mail,
  };

  transporter
    .sendMail(message)
    .then(() => {
      console.log("worked");
    })
    .catch((err) => {
      console.log(err);
    });
};

// resetpassword success
export const resetPasswordSuccess = (email) => {
  let config = {
    service: "gmail",
    auth: {
      user: process.env.NODEMAILER_EMAIL,
      pass: process.env.NODEMAILER_PASSWORD,
    },
  };

  let transporter = nodemailer.createTransport(config);

  let mailGenerator = new Mailgen({
    theme: "default",
    product: {
      name: "Mailgen",
      link: "https://mailgen.js",
    },
  });
  let response = {
    body: {
      name: `hello`,
      intro: "Your password has been reset successfully",
      action: {
        button: {
          color: "#22BC66", // Optional action button color
          text: "Click here to reset your password",
          link: ``,
        },
      },
      outro: "",
    },
  };

  let mail = mailGenerator.generate(response);

  let message = {
    from: process.env.NODEMAILER_EMAIL,
    to: email,
    subject: "Reset Password Success",
    html: mail,
  };

  transporter
    .sendMail(message)
    .then(() => {
      console.log("worked");
    })
    .catch((err) => {
      console.log(err);
    });
};
