import express from "express";
import authController from "../controllers/authController.js";
import protect from "../middleware/protect.js";

const router = express.Router();

router.post("/register", authController.registerUser);
router.post("/register/candidate", authController.registerCandidate);
router.post("/register/recruiter", authController.registerRecruiter);
router.post("/login", authController.loginUser);

// test protected route
router.get("/private", protect, authController.privateAccess);

// profile
router.get("/me", protect, authController.getMe);
router.put("/me", protect, authController.updateMe);

export default router;
