const AppError = require('./../utils/appError');
const catchAsync = require('./../utils/catchAsync');
const { Model } = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWT_SECRET =
  "hvdvay6ert72839289()aiyg8t87qt72393293883uhefiuh78ttq3ifi78272jbkj?[]]pou89ywe";
// exports.deleteOne = Model =>
//     catchAsync(async (req, res, next) => {
//         const doc = await Model.findByIdAndDelete(req.params.id);

//         if (!doc) return next(new AppError('No transaction found with that Id', 404));

//         res.status(204).json({
//             status: 'success',
//             data: null
//         });
//     });
    

// exports.updateOne = Model =>
//     catchAsync(async (req, res, next) => {
//         const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
//             new: true,
//             runValidators: true
//         });

//         if (!doc) return next(new AppError('No transaction found with that Id', 404));

//         res.status(200).json({
//             status: 'success',
//             data: {
//                 data: doc
//             }
//         });
//     });


// exports.createOne = Model => 
//     catchAsync(async (req, res, next) => {
//         const doc = await Model.create(req.body);

//         res.status(201).json({
//             status: 'success',
//             data: {
//                 data: doc
//             }
//         });
//     });

// exports.getOne = Model => 
//     catchAsync(async (req, res, next) => {
//         let query = Model.findById(req.params.id);

//         const doc = await query;
//         if (!doc) return next(new AppError('No transaction found with that Id', 404));

//         res.status(200).json({
//             status: 'success',
//             data: {
//                 data: doc
//             }
//         });
//     });
   

// exports.getAll = Model => 
//     catchAsync(async (req, res, next) => {

//         const {startDate, endDate, status} = req.query;

//         const filter = {
//             ...(status && {status}),
//             ...(startDate && {date: {$gte:startDate}}),
//             ...(endDate && {date: {$lte: endDate}}),
//         }
//         const query = Model.find(filter);

//         const doc = await query;

//         res.status(200).json({
//             status: 'success',
//             results: doc.length,
//             data: {
//                 data: doc
//             }
//         });
//     });

// exports.uploadtransactions = Model => 
//     catchAsync(async (req, res, next) => {
//         let data  = fs.readFileSync(req.file.path);
//         data  = JSON.parse(data);
//         const doc = await Model.create(data);

//         res.status(201).json({
//             status: 'success',
//             data: {
//                 data: doc
//             }
//         });
//     });


exports.getUser = Model => catchAsync(async (req, res, next) => {
    const { token } = req.body;
    const user = jwt.verify(token, JWT_SECRET, (err, res) => {
      if (err) {
        return "token expired";
      }
      return res;
    });
    if (user == "token expired") {
      return res.status(401).send({data :"Token expired"});
    }
    const useremail = user.email;
    const data = await Model.findOne({ email: useremail });
    res.status(201).json({ status: "ok", data: data });
  });


  exports.register = Model => catchAsync(async (req, res, next) => {
    const { name, email, password, cpassword } = req.body;
    const encryptedPassword = await bcrypt.hash(password, 10);
    const oldUser = await Model.findOne({ email });
    if (oldUser) {
      return res.status(400).send({data :'User already registered'});
    }
    await Model.create({
        name,
        email,
        password: encryptedPassword,
        cpassword,
    });
    res.send({ status: 'ok' });
  });

   exports.login = Model => catchAsync(async (req, res, next) => {
    const { email, password } = req.body;
    const user = await Model.findOne({ email });
    if (!user) {
      return res.status(404).send({data :'No user found'});
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(404).send({data :'Invalid password'});
    }
    const token = jwt.sign({ email: user.email }, JWT_SECRET, { expiresIn: '10s' });
    res.status(201).json({ status: "ok", data: token });
  });


    