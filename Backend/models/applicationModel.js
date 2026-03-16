
import mongoose from "mongoose"
const applicationSchema = new mongoose.Schema(
  {
    candidateId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },

    resumeText: String,
    resumeFile: String,

    aiScore: {
      type: Number,
      default: 0,
    },

    aiFeedback: {
      type: String,
    },

    status: {
      type: String,
      enum: ["applied", "shortlisted", "rejected"],
      default: "applied",
    },
  },
  { timestamps: true }
);
const Application = mongoose.model("Application", applicationSchema);

export default Application;