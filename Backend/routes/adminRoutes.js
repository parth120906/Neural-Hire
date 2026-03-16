import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import isAdmin from "../middleware/isAdmin.js";

import adminController from "../controllers/adminController.js";

const router = express.Router();

/* USERS */
router.get("/users", authMiddleware, isAdmin, adminController.getAllUsers);
router.get("/users/:id", authMiddleware, isAdmin, adminController.getSingleUser);
router.put("/users/:id", authMiddleware, isAdmin, adminController.updateUser);

/* JOBS */
router.get("/jobs", authMiddleware, isAdmin, adminController.getAllJobs);
router.get("/jobs/:id", authMiddleware, isAdmin, adminController.getSingleJob);
router.delete("/jobs/:id", authMiddleware, isAdmin,adminController.deleteJob);

/* Appilicatiomn*/
router.get("/application", authMiddleware, isAdmin, adminController.getAllApplications);
router.delete("/application/:id", authMiddleware, isAdmin,adminController.deleteApplication);


export default router;
