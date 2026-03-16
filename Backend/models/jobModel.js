import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Job title is required"],
      trim: true,
    },

    description: {
      type: String,
      required: [true, "Job description is required"],
    },

    skills: {
      type: [String],
      required: [true, "Skills are required"],
    },

    experience: {
      type: String,
      required: [true, "Experience is required"],
    },

    location: {
      type: String,
      required: [true, "Location is required"],
    },

    salary: {
      type: String,
    },

    // 👇 recruiter who created the job
    recruiterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // job status (admin / recruiter control)
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const Job = mongoose.model("Job", jobSchema);

export default Job;
