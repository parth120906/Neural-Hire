import { GoogleGenAI } from "@google/genai";
import Job from "../models/jobModel.js";

// Gemini client
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

/**
 * 1️⃣ USER QUESTION → JOB RECOMMENDATION (with job reference)
 */
export const askJobAI = async (req, res) => {
  try {
    const { question } = req.body;

    // validation
    if (!question) {
      return res.status(400).json({
        success: false,
        message: "question is required",
      });
    }

    // DB se active jobs
    const jobsFromDB = await Job.find({ isActive: true }).limit(10);

    // AI-friendly jobs
    const jobs = jobsFromDB.map((job) => ({
      id: job._id, // 🔑 reference
      title: job.title,
      skills: job.skills,
      description: job.description,
      location: job.location,
    }));

    // AI prompt
    const prompt = `
You are a job recommendation assistant.

Rules:
- Use ONLY the provided jobs
- Recommend ONLY ONE job
- Mention job title + matching skill
- One short sentence only

If no job matches, reply exactly:
"Currently no suitable job available."

Response format:
"You can apply for the <JOB_TITLE> role because it matches your skill in <SKILL> 🎯"

User question:
${question}

Jobs:
${JSON.stringify(jobs)}
`;

    // Gemini call
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    const aiAnswer = response.text;

    // 🔎 Find matched job by title
    const matchedJob = jobsFromDB.find((job) =>
      aiAnswer.toLowerCase().includes(job.title.toLowerCase())
    );

    // Response with job reference
    if (matchedJob) {
      return res.status(200).json({
        success: true,
        answer: aiAnswer,
        job: {
          id: matchedJob._id,
          title: matchedJob.title,
        },
      });
    }

    // No match case
    return res.status(200).json({
      success: true,
      answer: aiAnswer,
      job: null,
    });
  } catch (error) {
    console.error("AI Job Error:", error);
    res.status(500).json({
      success: false,
      message: "AI job recommendation failed",
    });
  }
};

/**
 * 2️⃣ RESUME → JOB MATCHING (with job reference)
 */
export const matchResumeWithJobs = async (req, res) => {
  try {
    const { resumeText } = req.body;

    // validation
    if (!resumeText) {
      return res.status(400).json({
        success: false,
        message: "resumeText is required",
      });
    }

    // DB se active jobs
    const jobsFromDB = await Job.find({ isActive: true }).limit(10);

    // AI-friendly jobs
    const jobs = jobsFromDB.map((job) => ({
      id: job._id, // 🔑 reference
      title: job.title,
      skills: job.skills,
      description: job.description,
      location: job.location,
    }));

    // AI prompt
    const prompt = `
You are a recruitment assistant.

Rules:
- Use ONLY the provided jobs
- Recommend ONLY ONE job
- Mention matching skill clearly
- One short sentence only

If no job matches, reply exactly:
"Currently no suitable job available."

Response format:
"The <JOB_TITLE> role matches your resume because of your skill in <SKILL> 🚀"

Resume:
${resumeText}

Jobs:
${JSON.stringify(jobs)}
`;

    // Gemini call
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    const aiAnswer = response.text;

    // 🔎 Find matched job by title
    const matchedJob = jobsFromDB.find((job) =>
      aiAnswer.toLowerCase().includes(job.title.toLowerCase())
    );

    // Response with job reference
    if (matchedJob) {
      return res.status(200).json({
        success: true,
        answer: aiAnswer,
        job: {
          id: matchedJob._id,
          title: matchedJob.title,
        },
      });
    }

    // No match case
    return res.status(200).json({
      success: true,
      answer: aiAnswer,
      job: null,
    });
  } catch (error) {
    console.error("Resume AI Error:", error);
    res.status(500).json({
      success: false,
      message: "Resume job matching failed",
    });
  }
};
