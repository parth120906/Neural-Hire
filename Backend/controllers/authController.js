import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

// ================= REGISTER =================
// Public register → only normal user
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    if (!name || !email || !password) {
      res.status(400);
      throw new Error("Please fill all details");
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400);
      throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      name,
      email,
      password: hashedPassword,
      isAdmin: false,
      isRecruiter: false,
      isActive: true,
    });

    res.status(201).json({
      success: true,
      message: "User registered successfully",
    });
  } catch (error) {
    res.status(res.statusCode || 500);
    throw new Error(error.message);
  }
};

// ================= LOGIN =================
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400);
      throw new Error("Email and password required");
    }

    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      res.status(400);
      throw new Error("Invalid credentials");
    }

    if (!user.isActive) {
      res.status(403);
      throw new Error("Account blocked by admin");
    }

    // 🔐 JWT token generation
    const token = jwt.sign(
      {
        userId: user._id,
        isAdmin: user.isAdmin,
        isRecruiter: user.isRecruiter,
      },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      isRecruiter: user.isRecruiter,
      isActive: user.isActive,
      token,
    });
  } catch (error) {
    res.status(res.statusCode || 500);
    throw new Error(error.message);
  }
};

// ================= PRIVATE (TEST) =================
const privateAccess = (req, res) => {
  res.json({
    message: `Authenticated user: ${req.user.name}`,
  });
};

// ================= GET MY PROFILE =================
const getMe = async (req, res) => {
  res.status(200).json({
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email,
    isAdmin: req.user.isAdmin,
    isRecruiter: req.user.isRecruiter,
    isActive: req.user.isActive,
    createdAt: req.user.createdAt,
    updatedAt: req.user.updatedAt,
  });
};

// ================= UPDATE MY PROFILE =================
const updateMe = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = await User.findById(req.user._id);
    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }

    if (email && email !== user.email) {
      const exists = await User.findOne({ email });
      if (exists) {
        res.status(400);
        throw new Error("Email already in use");
      }
      user.email = email;
    }

    if (name) user.name = name;

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
    }

    await user.save();

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      isRecruiter: user.isRecruiter,
      isActive: user.isActive,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
  } catch (error) {
    res.status(res.statusCode || 500);
    throw new Error(error.message);
  }
};

const authController = {
  registerUser,
  loginUser,
  privateAccess,
  getMe,
  updateMe,
};

export default authController;
