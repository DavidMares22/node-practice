const { Router } = require("express");
const User = require("../models/user");
const nodemailer = require("nodemailer");
const sendgrid = require("nodemailer-sendgrid-transport");
const bcrypt = require("bcryptjs");
const router = Router();
const regEmail = require('../emails/registration')
require('dotenv').config()



// console.log(process.env.SENDGRID_API_KEY);
const transporter = nodemailer.createTransport(sendgrid({
  auth:{api_key:process.env.SENDGRID_API_KEY}
}))

router.get("/login", async (req, res) => {
  res.render("auth/login", {
    title: "authorization",
    isLogin: true,
    loginError: req.flash("loginError"),
    registerError: req.flash("registerError"),
  });
});

router.get("/logout", async (req, res) => {
  req.session.destroy(() => {
    res.redirect("/auth/login#login");
  });
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const candidate = await User.findOne({ email });

    if (candidate) {
      const areSame = await bcrypt.compare(password, candidate.password);

      if (areSame) {
        req.session.user = candidate;
        req.session.isAuthenticated = true;
        req.session.save((err) => {
          if (err) {
            throw err;
          }
          res.redirect("/");
        });
      } else {
        req.flash("loginError", "The password is not correct");
        res.redirect("/auth/login#login");
      }
    } else {
      req.flash("loginError", "That User does not exists");
      res.redirect("/auth/login#login");
    }
  } catch (e) {
    console.log(e);
  }
});

router.post("/register", async (req, res) => {
  try {
    // console.log(req.body);
    const { email, password, confirm, name } = req.body;
    const candidate = await User.findOne({ email });

    if (candidate) {
      req.flash("registerError", "User with that email already exists");
      res.redirect("/auth/login#register");
    } else {
      const hashPassword = await bcrypt.hash(password, 10);
      const user = new User({
        email,
        name,
        password: hashPassword,
        cart: { items: [] },
      });
      await user.save();
      await transporter.sendMail(regEmail(email), function(err, res) {
        if (err) { 
            console.log(err) 
        }
        console.log(res);
      });
      res.redirect("/auth/login#login");
    }
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
