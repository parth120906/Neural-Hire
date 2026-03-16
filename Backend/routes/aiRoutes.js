import express from "express";
import {
  askJobAI,
  matchResumeWithJobs,
} from "../controllers/aiJobController.js";

const router = express.Router();

// User question → Job suggestion
router.post("/jobs/ask", askJobAI);

// Resume → Job matching
router.post("/jobs/match-resume", matchResumeWithJobs);

export default router;
