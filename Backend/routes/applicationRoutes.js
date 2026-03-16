import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import applicationController from "../controllers/applicationController.js";
import isRecruiter from "../middleware/isRecuiter.js";
import uploadResume from "../middleware/uploadResume.js";

const router = express.Router();

// Candidate view own applications
router.get("/me", authMiddleware, applicationController.getMyApplications);
router.delete(
  "/:id",
  authMiddleware,
  applicationController.withdrawApplication
);
router.put(
  "/:id",
  authMiddleware,
  applicationController.updateApplication
);




// Recruiter view applicants for a job
router.get("/recruiter/job/:jobId", authMiddleware, isRecruiter, applicationController.getApplicantsByJob);

router.get(
  "/recruiter/:id/resume",
  authMiddleware,
  isRecruiter,
  applicationController.getApplicationResume
);


router.get("/recruiter/all",authMiddleware,isRecruiter,applicationController.getRecruiterApplications)

// Candidate apply job

router.post(
  "/:jobId",
  authMiddleware,
  uploadResume.single("resume"),
  applicationController.applyJob
);

// Recruiter update application status
router.put("/:id/status", authMiddleware, isRecruiter, applicationController.updateApplicationStatus);


export default router;
