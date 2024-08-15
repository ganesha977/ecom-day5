const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/usermodel");
require("dotenv").config();

const home = async (req, res) => {
  try {
    res.status(200).json({ msg: "Welcome to our home page" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal server error" });
  }
};

const register = async (req, res) => {
  try {
    const { name, email, phone, password,address,answer } = req.body;

    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const userCreated = await User.create({ name, email, phone, password,address,answer});
    const token = await userCreated.generateToken();

    res.status(201).json({
      msg: "Registration Successful",
      token:token,
      userId: userCreated._id.toString(),
     user:userCreated,

    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal server error" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userExist = await User.findOne({ email });
    if (!userExist) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isPasswordValid = await userExist.comparePassword(password);
    if (isPasswordValid) {
      const token = await userExist.generateToken();
      res.status(200).json({
        msg: "Login Successful",
        token,
        userId: userExist._id.toString(),
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { home, register, login };
