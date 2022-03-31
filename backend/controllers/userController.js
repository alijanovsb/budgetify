import dotenv from "dotenv";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

dotenv.config();

const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

//@route POST /users/login
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    const payload = {
      id: user.id,
      email: user.email,
      role: user.role,
    };

    const token = generateToken(payload);

    res.json({
      id: user.id,
      email: user.email,
      role: user.role,
      token: `Bearer ${token}`,
    });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
});

//@route POST /users/register
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, age } = req.body;
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("Provided email is already used!");
  }

  const user = await User.create({
    name,
    email,
    password,
    age,
  });

  if (user) {
    const token = generateToken({ user });

    res.status(201).json({
      id: user.id,
      email: user.email,
      role: user.role,
      age: user.age,
      token: `Bearer ${token}`,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  await user.remove();

  res.status(200).json({
    success: true,
    data: {},
  });
});

const editUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  const { name, email, password, age } = req.body;

  user.name = name;
  user.email = email;
  user.password = password;
  user.age = age;

  await user.save();

  res.status(200).json({
    success: true,
    data: user,
  });
});

export { authUser, registerUser, deleteUser, editUser };
