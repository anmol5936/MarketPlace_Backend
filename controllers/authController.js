const asyncHandler = require("express-async-handler");
const bcryptjs = require("bcryptjs"); 
const jwt = require("jsonwebtoken"); 
const User = require("../models/userModel");

const signup = asyncHandler(async (req, res) => {
  const { username, rollno, email, password } = req.body;

  if (!username || !rollno || !email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory!");
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists!");
  }

  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({
    username,
    rollno,
    email,
    password: hashedPassword,
  });

  await newUser.save();

  res.status(201).json({
    message: "User created successfully!",
    user: {
      _id: newUser._id,
      username: newUser.username,
      rollno: newUser.rollno,
      email: newUser.email,
    },
  });
});

const signin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
  
    if (!email || !password) {
      res.status(400);
      throw new Error("All fields are mandatory!");
    }
  
    const user = await User.findOne({ email }); 
    if (!user) {
      res.status(400);
      throw new Error("User does not exist!");
    }
  
    const validPassword = bcryptjs.compareSync(password, user.password);
  
    if (!validPassword) {
      res.status(400);
      throw new Error("Invalid password!");
    }
  
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  
    const { password: pass, ...rest } = user._doc; 
  
    res
      .cookie('access_token', token, { httpOnly: true })
      .status(200)
      .json(rest);
  });
  
  module.exports = { signup, signin };
  
