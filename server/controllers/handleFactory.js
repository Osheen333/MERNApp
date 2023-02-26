const AppError = require("./../utils/appError");
const catchAsync = require("./../utils/catchAsync");
const { Model } = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_SECRET =
  "hvdvay6ert72839289()aiyg8t87qt72393293883uhefiuh78ttq3ifi78272jbkj?[]]pou89ywe";

exports.getUser = (Model) =>
  catchAsync(async (req, res, next) => {
    const { token } = req.body;

    try {
      const user = jwt.verify(token, JWT_SECRET);
      const useremail = user.email;
      const data = await Model.findOne({ email: useremail });
      res.status(201).json({ status: "ok", data: data });
    } catch (error) {
      return res.status(401).send({ data: "Token expired" });
    }
  });

exports.register = (Model) =>
  catchAsync(async (req, res, next) => {
    const { name, email, password, cpassword } = req.body;
    const encryptedPassword = await bcrypt.hash(password, 10);
    const oldUser = await Model.findOne({ email });
    if (oldUser) {
      return res.status(400).send({ data: "User already registered" });
    }
    await Model.create({
      name,
      email,
      password: encryptedPassword,
      cpassword,
    });
    res.send({ status: "ok" });
  });

exports.login = (Model) =>
  catchAsync(async (req, res, next) => {
    const { email, password } = req.body;
    const user = await Model.findOne({ email });
    if (!user) {
      return res.status(404).send({ data: "No user found" });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(404).send({ data: "Invalid password" });
    }
    const token = jwt.sign({ email: user.email }, JWT_SECRET, {
      expiresIn: "10s",
    });
    res.status(201).json({ status: "ok", data: token });
  });
