import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import isRecruiter from "../middleware/isRecuiter.js";

import jobController from "../controllers/jobController.js";

const router = express.Router();

/* ======================================================
   USER / CANDIDATE ROUTES
   ====================================================== */

// Get all active jobs (public)
router.get("/", jobController.getAllActiveJobs);

// Get single active job (public)
router.get("/:id", jobController.getSingleActiveJob);

/* ======================================================
   RECRUITER ROUTES
   ====================================================== */

// Create job
router.post(
  "/recruiter/create",
  authMiddleware,
  isRecruiter,
  jobController.createJob
);

// Get recruiter own jobs
router.get(
  "/recruiter/my-jobs",
  authMiddleware,
  isRecruiter,
  jobController.getMyJobs
);

// Update recruiter own job
router.put(
  "/recruiter/:id",
  authMiddleware,
  isRecruiter,
 jobController.updateMyJob
);

// Close recruiter own job
router.put(
  "/recruiter/:id/close",
  authMiddleware,
  isRecruiter,
  jobController.closeJob
);

// Delete recruiter own job
router.delete(
  "/recruiter/:id",
  authMiddleware,
  isRecruiter,
  jobController.deleteMyJob
);

export default router;
