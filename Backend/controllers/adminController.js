import User from "../models/userModel.js";
import Job from "../models/jobModel.js";
import Application from "../models/applicationModel.js";
import cloudinary from "../utils/cloudnairy.js";

/* ================= USERS ================= */

// GET all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");

    res.status(200).json({
      success: true,
      count: users.length,
      users,
    });
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
};

// GET single user
const getSingleUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");

    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(res.statusCode || 500);
    throw new Error(error.message);
  }
};

// UPDATE user (block / recruiter / admin)
const updateUser = async (req, res) => {
  try {
    const { isActive, isRecruiter, isAdmin } = req.body;

    const user = await User.findById(req.params.id);

    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }

    if (isActive !== undefined) user.isActive = isActive;
    if (isRecruiter !== undefined) user.isRecruiter = isRecruiter;
    if (isAdmin !== undefined) user.isAdmin = isAdmin;

    await user.save();

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      user,
    });
  } catch (error) {
    res.status(res.statusCode || 500);
    throw new Error(error.message);
  }
};

/* ================= JOBS ================= */

// GET all jobs
const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find();

    res.status(200).json({
      success: true,
      count: jobs.length,
      jobs,
    });
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
};

// GET single job
const getSingleJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      res.status(404);
      throw new Error("Job not found");
    }

    res.status(200).json({
      success: true,
      job,
    });
  } catch (error) {
    res.status(res.statusCode || 500);
    throw new Error(error.message);
  }
};

// DELETE job
const deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      res.status(404);
      throw new Error("Job not found");
    }

    await job.deleteOne();

    res.status(200).json({
      success: true,
      message: "Job deleted successfully",
    });
  } catch (error) {
    res.status(res.statusCode || 500);
    throw new Error(error.message);
  }
};

/* ================= APPLICATIONS ================= */

// GET all applications (Admin only)
const getAllApplications = async (req, res) => {
  try {
    if (!req.user.isAdmin) {
      res.status(403);
      throw new Error("Admin access only");
    }

    const applications = await Application.find()
      .populate("candidateId", "name email")
      .populate("jobId", "title");

    res.status(200).json({
      success: true,
      count: applications.length,
      applications,
    });
  } catch (error) {
    res.status(res.statusCode || 500);
    throw new Error(error.message);
  }
};

// DELETE application (with resume cleanup)
const deleteApplication = async (req, res) => {
  try {
    if (!req.user.isAdmin) {
      res.status(403);
      throw new Error("Admin access only");
    }

    const application = await Application.findById(req.params.id);

    if (!application) {
      res.status(404);
      throw new Error("Application not found");
    }

    // ☁️ Delete resume from Cloudinary
    if (application.resumeFile) {
      const urlParts = application.resumeFile.split("/");
      const fileWithExt = urlParts[urlParts.length - 1];
      const publicId = `resumes/${fileWithExt.split(".")[0]}`;

      await cloudinary.uploader.destroy(publicId, {
        resource_type: "raw",
      });
    }

    await application.deleteOne();

    res.status(200).json({
      success: true,
      message: "Application deleted successfully",
    });
  } catch (error) {
    res.status(res.statusCode || 500);
    throw new Error(error.message);
  }
};

/* ================= EXPORT ================= */

const adminController = {
  getAllUsers,
  getSingleUser,
  updateUser,
  getAllJobs,
  getSingleJob,
  deleteJob,
  getAllApplications,
  deleteApplication,
};

export default adminController;
