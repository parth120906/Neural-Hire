import Job from "../models/jobModel.js";
import Application from "../models/applicationModel.js";
import cloudinary from "../utils/cloudnairy.js"

/* ================= RECRUITER CONTROLLERS ================= */

// Recruiter → Create job
const createJob = async (req, res) => {
  try {
    if (!req.user.isRecruiter && !req.user.isAdmin) {
      res.status(403);
      throw new Error("Only recruiters can create jobs");
    }

    const { title, description, skills, experience, location, salary } =
      req.body;

    if (!title || !description || !skills || !experience || !location) {
      res.status(400);
      throw new Error("Please fill all required fields");
    }

    const job = await Job.create({
      title,
      description,
      skills,
      experience,
      location,
      salary,
      recruiterId: req.user.userId,
      isActive: true,
    });

    res.status(201).json({
      success: true,
      message: "Job created successfully",
      job,
    });
  } catch (error) {
    res.status(res.statusCode || 500);
    throw new Error(error.message);
  }
};


const getMyJobs = async (req, res) => {
  try {
    if (!req.user.isRecruiter && !req.user.isAdmin) {
      res.status(403);
      throw new Error("Access denied");
    }

    const jobs = await Job.find({
      recruiterId: req.user.userId,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: jobs.length,
      jobs,
    });
  } catch (error) {
    res.status(res.statusCode || 500);
    throw new Error(error.message);
  }
};


const updateMyJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      res.status(404);
      throw new Error("Job not found");
    }

    if (job.recruiterId.toString() !== req.user.userId) {
      res.status(403);
      throw new Error("Not authorized to update this job");
    }

    const updatedJob = await Job.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: "Job updated successfully",
      job: updatedJob,
    });
  } catch (error) {
    res.status(res.statusCode || 500);
    throw new Error(error.message);
  }
};


const closeJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      res.status(404);
      throw new Error("Job not found");
    }

    if (job.recruiterId.toString() !== req.user.userId) {
      res.status(403);
      throw new Error("Not authorized to close this job");
    }

    job.isActive = false;
    await job.save();

    res.status(200).json({
      success: true,
      message: "Job closed successfully",
    });
  } catch (error) {
    res.status(res.statusCode || 500);
    throw new Error(error.message);
  }
};


const deleteMyJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      res.status(404);
      throw new Error("Job not found");
    }

    if (
      req.user.isRecruiter &&
      job.recruiterId.toString() !== req.user.userId
    ) {
      res.status(403);
      throw new Error("Not authorized to delete this job");
    }

    const applications = await Application.find({ jobId: job._id });

    for (const app of applications) {
      if (app.resumeFile) {
        const parts = app.resumeFile.split("/");
        const file = parts[parts.length - 1];
        const publicId = `resumes/${file.split(".")[0]}`;

        await cloudinary.uploader.destroy(publicId, {
          resource_type: "raw",
        });
      }
    }

    await Application.deleteMany({ jobId: job._id });
    await job.deleteOne();

    res.status(200).json({
      success: true,
      message: "Job and related applications deleted successfully",
    });
  } catch (error) {
    res.status(res.statusCode || 500);
    throw new Error(error.message);
  }
};

/* ================= PUBLIC / CANDIDATE ================= */

// Candidate → Get all active jobs
const getAllActiveJobs = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const keyword = req.query.keyword
      ? { title: { $regex: req.query.keyword, $options: "i" } }
      : {};

    const jobs = await Job.find({
      isActive: true,
      ...keyword,
    })
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const totalJobs = await Job.countDocuments({
      isActive: true,
      ...keyword,
    });

    res.status(200).json({
      success: true,
      totalJobs,
      currentPage: page,
      totalPages: Math.ceil(totalJobs / limit),
      jobs,
    });
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
};


const getSingleActiveJob = async (req, res) => {
  try {
    const job = await Job.findOne({
      _id: req.params.id,
      isActive: true,
    });

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

const jobController = {
  createJob,
  getMyJobs,
  updateMyJob,
  closeJob,
  deleteMyJob,
  getAllActiveJobs,
  getSingleActiveJob,
};

export default jobController;
