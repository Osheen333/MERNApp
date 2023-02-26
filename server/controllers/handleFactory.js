const catchAsync = require("./../utils/catchAsync");
const { Model } = require("mongoose");
const bcrypt = require("bcrypt");
exports.getUser = (Model) =>
  catchAsync(async (req, res, next) => {
    try {
      const user = req.body.user
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
    next()
  });
