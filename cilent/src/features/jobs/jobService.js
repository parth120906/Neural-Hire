import axios from "axios";

const API_URL = "/api/";

// ================= GET JOBS LIST =================
const fetchJobs = async ({ page = 1, limit = 10, keyword = "" }) => {
  const params = new URLSearchParams();
  params.set("page", page.toString());
  params.set("limit", limit.toString());
  if (keyword) params.set("keyword", keyword);

  const response = await axios.get(`${API_URL}job?${params.toString()}`);
  return response.data;
};

// ================= GET SINGLE JOB =================
const fetchJobById = async (id) => {
  const response = await axios.get(`${API_URL}job/${id}`);
  return response.data;
};

// ================= AI HELPERS =================
const askJobQuestion = async (question) => {
  const response = await axios.post(`${API_URL}ai/jobs/ask`, { question });
  return response.data;
};

const matchResumeToJobs = async (resumeText) => {
  const response = await axios.post(`${API_URL}ai/jobs/match-resume`, {
    resumeText,
  });
  return response.data;
};

const jobService = {
  fetchJobs,
  fetchJobById,
  askJobQuestion,
  matchResumeToJobs,
};

export default jobService;

