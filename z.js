// const { hashPassword, comparePassword } = require("../helpers/authHelper.js");
// const userModel = require("../models/usermodel.js");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");


// const registerController = async (req, res) => {
//   try {
//     const { name, email, password, phone, address ,answer} = req.body;

//     if (!name) {
//       return res.status(400).json({ success: false, message: "Please enter a name" });
//     }
//     if (!email) {
//       return res.status(400).json({ success: false, message: "Please enter an email" });
//     }
//     if (!password) {
//       return res.status(400).json({ success: false, message: "Please enter a password" });
//     }
//     if (!phone) {
//       return res.status(400).json({ success: false, message: "Please enter a phone number" });
//     }
//     if (!address) {
//       return res.status(400).json({ success: false, message: "Please enter an address" });
//     }
//     if (!answer) {
//       return res.status(400).json({ success: false, message: "Please enter an answer" });
//     }
//     const existingUser = await userModel.findOne({ email });
//     if (existingUser) {
//       return res.status(409).json({ success: false, message: "User already exists" });
//     }

//     const hashedPassword = await hashPassword(password);
//     const user = new userModel({
//       name,
//       email,
//       password: hashedPassword,
//       phone,
//       address,
//       answer,
//     });
//     await user.save();

//     res.status(201).send({
//       success: true,
//       message: "User created successfully",
//       user,
//     });
//     console.log(user);
//   } catch (err) {
//     console.log(err);
//     return res.status(500).send({ success: false, message: "Error in registration" });
//   }
// };


// const loginController = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     if (!email || !password) {
//       return res.status(400).json({ success: false, message: "Invalid email or password" });
//     }

//     const user = await userModel.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ success: false, message: "Email is not registered" });
//     }

//     const isMatch = await comparePassword(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ success: false, message: "Invalid password" });
//     }

//     const token = jwt.sign(
//       { id: user._id },
//       process.env.JWT_SECRET,
//       { expiresIn: "7d" }
//     );

//     res.status(200).json({
//       success: true,
//       message: "Login successful",
//       user: {
//         name: user.name,
//         email: user.email,
//         address: user.address,
//         phone: user.phone,
//         role:user.role,
//       },
//       token,
//     });
//   } catch (err) {
//     console.log(err);
//     return res.status(500).json({ success: false, message: "Server error",err });
//   }
// };





// //testcontroller
// const testController = async (req, res) => {
//   console.log('protected route');
//   res.send('protected route');
// }



//  const forgotPasswordController = async (req, res) => {
//   try {
//     const { email, answer, newPassword } = req.body;
//     if (!email) {
//       res.status(400).send({ message: "Emai is required" });
//     }
//     if (!answer) {
//       res.status(400).send({ message: "answer is required" });
//     }
//     if (!newPassword) {
//       res.status(400).send({ message: "New Password is required" });
//     }
//     //check
//     const user = await userModel.findOne({ email, answer });
//     //validation
//     if (!user) {
//       return res.status(404).send({
//         success: false,
//         message: "Wrong Email Or Answer",
//       });
//     }
//     const hashed = await hashPassword(newPassword);
//     await userModel.findByIdAndUpdate(user._id, { password: hashed });
//     res.status(200).send({
//       success: true,
//       message: "Password Reset Successfully",
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({
//       success: false,
//       message: "Something went wrong",
//       error,
//     });
//   }
// };













// module.exports = {testController, registerController, loginController,forgotPasswordController };


<div className="mb-3">
            <input
              type="password"
              name="password"
              value={user.password}
              onChange={handleInput}
              className="form-control"
              placeholder="Enter Your password"
              required
            />