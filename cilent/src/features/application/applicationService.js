import axios from "axios";

const API_URL = "/api/";

// ================= GET MY APPLICATIONS =================
const fetchMyApplications = async (token) => {
  const options = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(`${API_URL}application/me`, options);
  return response.data;
};

// ================= APPLY TO JOB =================
const applyToJob = async ({ jobId, resumeText, resumeFile, token }) => {
  const formData = new FormData();
  if (resumeText) formData.append("resumeText", resumeText);
  if (resumeFile) formData.append("resume", resumeFile);

  const options = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(
    `${API_URL}application/${jobId}`,
    formData,
    options
  );
  return response.data;
};

// ================= WITHDRAW APPLICATION =================
const withdrawApplication = async ({ applicationId, token }) => {
  const options = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(
    `${API_URL}application/${applicationId}`,
    options
  );
  return response.data;
};

const applicationService = {
  fetchMyApplications,
  applyToJob,
  withdrawApplication,
};

export default applicationService;

