const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../model/userModel");
const userRouter = express.Router();

userRouter.post("/register", async (req, res) => {
  let { name, age, gender, image, email, password } = req.body;

  let user = await UserModel.find({ email });
  if (user.length > 0)
    return res.status(400).send({ err: "user already exist please login" });
  try {
    bcrypt.hash(password, 4, async (err, hashedPassword) => {
      req.body.password = hashedPassword;
      let user = new UserModel(req.body);
      await user.save();
      res.send({ mess: "User Registered Successfull" });
    });
  } catch (error) {
    console.log({ Error: error.message });
    res.send({ Error: error.message });
  }
});

userRouter.post("/login", async (req, res) => {
  let { email, password } = req.body;
  let user = await UserModel.findOne({ email });
  console.log({ Email: email, Password: password });
  if (user) {
    bcrypt.compare(password, user.password, async (err, result) => {
      if (result) {
        const token = jwt.sign({ userID: user._id }, "masai", {
          expiresIn: "7d",
        });
        const userWithoutPassword = { ...user.toObject() };
        delete userWithoutPassword.password;

        res.json({
          message: "Login successful",
          token,
          user: userWithoutPassword,
        });
      } else {
        res.status(400).json({ err: "Wrong credentials" });
      }
    });
  } else {
    res.status(400).json({ err: "Wrong credentials" });
  }
});

module.exports = {
  userRouter,
};
