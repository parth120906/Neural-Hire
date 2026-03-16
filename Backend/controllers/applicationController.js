import Application from "../models/applicationModel.js";
import Job from "../models/jobModel.js";
import cloudinary from "../utils/cloudnairy.js";

/* ================= APPLY TO JOB ================= */
const applyJob = async (req, res) => {
  try {
    // 🔐 Only candidate
    if (req.user.isRecruiter || req.user.isAdmin) {
      res.status(403);
      throw new Error("Only candidates can apply for jobs");
    }

    const { jobId } = req.params;
    const candidateId = req.user.userId;
    const { resumeText } = req.body;

    // 1️⃣ Job exists & active
    const job = await Job.findById(jobId);
    if (!job || !job.isActive) {
      res.status(404);
      throw new Error("Job not available");
    }

    let resumeFile = null;

    // 2️⃣ Resume upload (Cloudinary – PDF)
    if (req.file) {
      const base64File = `data:${req.file.mimetype};base64,${req.file.buffer.toString(
        "base64"
      )}`;

      const result = await cloudinary.uploader.upload(base64File, {
        resource_type: "raw",
        folder: "resumes",
      });

      resumeFile = result.secure_url;
    }

    // 3️⃣ Create application
    const application = await Application.create({
      candidateId,
      jobId,
      resumeText,
      resumeFile,
    });

    res.status(201).json({
      success: true,
      message: "Job applied successfully",
      data: application,
    });
  } catch (error) {
    if (error.code === 11000) {
      res.status(400);
      throw new Error("You have already applied to this job");
    }

    res.status(res.statusCode || 500);
    throw new Error(error.message);
  }
};

/* ================= GET APPLICATION RESUME ================= */
const getApplicationResume = async (req, res) => {
  try {
    if (!req.user.isRecruiter && !req.user.isAdmin) {
      res.status(403);
      throw new Error("Not authorized");
    }

    const application = await Application.findById(req.params.id).populate("jobId");

    if (!application) {
      res.status(404);
      throw new Error("Application not found");
    }

    if (!application.jobId) {
      res.status(404);
      throw new Error("Associated job not found (job may be deleted)");
    }

    // Recruiter ownership check
    if (
      req.user.isRecruiter &&
      application.jobId.recruiterId.toString() !== req.user.userId
    ) {
      res.status(403);
      throw new Error("You can access only your job applications");
    }

    if (!application.resumeFile) {
      res.status(404);
      throw new Error("Resume not uploaded");
    }

    res.status(200).json({
      success: true,
      resumeUrl: application.resumeFile,
    });
  } catch (error) {
    res.status(res.statusCode || 500);
    throw new Error(error.message);
  }
};

/* ================= GET MY APPLICATIONS ================= */
const getMyApplications = async (req, res) => {
  try {
    if (req.user.isRecruiter || req.user.isAdmin) {
      res.status(403);
      throw new Error("Access denied");
    }

    const applications = await Application.find({
      candidateId: req.user.userId,
    })
      .populate("jobId", "title location status")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: applications.length,
      data: applications,
    });
  } catch (error) {
    res.status(res.statusCode || 500);
    throw new Error(error.message);
  }
};

/* ================= UPDATE APPLICATION STATUS ================= */
const updateApplicationStatus = async (req, res) => {
  try {
    if (!req.user.isRecruiter && !req.user.isAdmin) {
      res.status(403);
      throw new Error("Not authorized");
    }

    const { status } = req.body;

    if (!["applied", "shortlisted", "rejected"].includes(status)) {
      res.status(400);
      throw new Error("Invalid status value");
    }

    const application = await Application.findById(req.params.id).populate("jobId");

    if (!application) {
      res.status(404);
      throw new Error("Application not found");
    }

    if (
      req.user.isRecruiter &&
      application.jobId.recruiterId.toString() !== req.user.userId
    ) {
      res.status(403);
      throw new Error("You can update only your job applications");
    }

    application.status = status;
    await application.save();

    res.status(200).json({
      success: true,
      message: "Application status updated",
      data: application,
    });
  } catch (error) {
    res.status(res.statusCode || 500);
    throw new Error(error.message);
  }
};

/* ================= GET APPLICANTS BY JOB ================= */
const getApplicantsByJob = async (req, res) => {
  try {
    if (!req.user.isRecruiter && !req.user.isAdmin) {
      res.status(403);
      throw new Error("Only recruiters or admins can view applicants");
    }

    const applications = await Application.find({
      jobId: req.params.jobId,
    })
      .populate("candidateId", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: applications.length,
      data: applications,
    });
  } catch (error) {
    res.status(res.statusCode || 500);
    throw new Error(error.message);
  }
};

/* ================= UPDATE APPLICATION (CANDIDATE) ================= */
const updateApplication = async (req, res) => {
  try {
    if (req.user.isRecruiter || req.user.isAdmin) {
      res.status(403);
      throw new Error("Only candidate can update his application");
    }

    const application = await Application.findById(req.params.id);

    if (!application) {
      res.status(404);
      throw new Error("Application not found");
    }

    if (application.candidateId.toString() !== req.user.userId) {
      res.status(403);
      throw new Error("You are not allowed to update this application");
    }

    const updatedApplication = await Application.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Application updated successfully",
      application: updatedApplication,
    });
  } catch (error) {
    res.status(res.statusCode || 500);
    throw new Error(error.message);
  }
};

/* ================= WITHDRAW APPLICATION ================= */
const withdrawApplication = async (req, res) => {
  try {
    if (req.user.isRecruiter || req.user.isAdmin) {
      res.status(403);
      throw new Error("Only candidates can withdraw applications");
    }

    const application = await Application.findById(req.params.id);

    if (!application) {
      res.status(404);
      throw new Error("Application not found");
    }

    if (application.candidateId.toString() !== req.user.userId) {
      res.status(403);
      throw new Error("Not authorized to withdraw this application");
    }

    if (application.resumeFile) {
      const parts = application.resumeFile.split("/");
      const file = parts[parts.length - 1];
      const publicId = `resumes/${file.split(".")[0]}`;

      await cloudinary.uploader.destroy(publicId, {
        resource_type: "raw",
      });
    }

    await application.deleteOne();

    res.status(200).json({
      success: true,
      message: "Application withdrawn successfully",
    });
  } catch (error) {
    res.status(res.statusCode || 500);
    throw new Error(error.message);
  }
};
/* ================= GET ALL APPLICATIONS FOR RECRUITER ================= */
const getRecruiterApplications = async (req, res) => {
  try {
    // only recruiter or admin
    if (!req.user.isRecruiter && !req.user.isAdmin) {
      res.status(403);
      throw new Error("Only recruiters or admins can access this");
    }

    // 1️⃣ Find all jobs created by this recruiter
    const jobs = await Job.find({ recruiterId: req.user.userId }).select("_id");

    const jobIds = jobs.map(job => job._id);

    // 2️⃣ Find applications for those jobs
    const applications = await Application.find({
      jobId: { $in: jobIds }
    })
      .populate("candidateId", "name email")
      .populate("jobId", "title location")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      totalJobs: jobs.length,
      totalApplications: applications.length,
      data: applications,
    });

  } catch (error) {
    res.status(res.statusCode || 500);
    throw new Error(error.message);
  }
};

/* ================= EXPORT ================= */
const applicationController = {
  applyJob,
  getApplicationResume,
  getMyApplications,
  updateApplicationStatus,
  getApplicantsByJob,
  updateApplication,
  withdrawApplication,
  getRecruiterApplications
};

export default applicationController;
