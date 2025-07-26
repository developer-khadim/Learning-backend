const express = require("express");
const router = express.Router();

// Mongoose user models
const User = require("./../models/User");
const UserVerification = require("./../models/UserVerification");

// password hashing
const crypto = require("crypto");

// email handler
const nodemailer = require("nodemailer")

// unique string
const {v4: uuidv4} = require("uuid");

// env variables
require("dotenv").config();

// nodemailer stuff
let transporter = nodemailer.createTransport({
    service:"gmail",
    auth:{
        user: process.env.AITH_EAMIL,
        pass : process.env.AITH_PASSWORD,
    }
})

//Testing success
transporter.verify((error,success)=>{
if(error){
    console.log(error)
}else{
    console.log("Ready to send message")
    console.log(success)
}
})

// Signup Route
router.post("/signup", async (req, res) => {
  let { first_name, last_name, email, password } = req.body;

  // Trim input
  first_name = first_name?.trim();
  last_name = last_name?.trim();
  email = email?.trim();
  password = password?.trim();

  // Validate input
  if (!first_name || !last_name || !email || !password) {
    return res.json({
      status: "FAILED",
      message: "Empty input fields!",
    });
  }

  const nameRegex = /^[a-zA-Z]+$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!nameRegex.test(first_name) || !nameRegex.test(last_name)) {
    return res.json({
      status: "FAILED",
      message: "Invalid name entry!",
    });
  } else if (!emailRegex.test(email)) {
    return res.json({
      status: "FAILED",
      message: "Invalid email format!",
    });
  }

  // Check if user exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.json({
      status: "FAILED",
      message: "User already exists!",
    });
  }

  try {
    // ✅ Generate a random salt
    const salt = crypto.randomBytes(16).toString("hex");
  
    // ✅ Hash the password securely
    const hashedPassword = crypto.pbkdf2Sync(password, salt, 100000, 64, "sha512").toString("hex");
  
    // ✅ Save user with hashed password and salt
    const newUser = new User({
      first_name,
      last_name,
      email,
      password: hashedPassword,
      salt,
    });


    newUser.save().then(result=>{

    })
    await newUser.save();

    res.json({
      status: "SUCCESS",
      message: "Signup successful. Proceed to verify email.",
    });

  } catch (error) {
    console.error(error);
    res.json({
      status: "FAILED",
      message: "An error occurred during signup.",
    });
  }
});

module.exports = router;
