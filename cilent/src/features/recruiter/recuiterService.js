import axios from "axios";

const API_URL = "/api/";

// ================= GET ALL JOBS =================
const fetchAllJobs = async (token) => {
  const options = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(`${API_URL}job/recruiter/my-jobs`, options);
  return response.data;
};

// ================= CREATE JOB =================
const createJob = async (jobData, token) => {
  const options = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(
    `${API_URL}job/recruiter/create`,
    jobData,
    options
  );

  return response.data;
};

// ================= UPDATE JOB =================
const updateJob = async (jobId, jobData, token) => {
  const options = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(
    `${API_URL}job/recruiter/${jobId}`,
    jobData,
    options
  );

  return response.data;
};

// ================= CLOSE JOB =================
const closeJob = async (jobId, token) => {
  const options = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(`${API_URL}job/recruiter/${jobId}/close`, {}, options);
  return response.data;
};

// ================= DELETE JOB =================
const deleteJob = async (jobId, token) => {
  const options = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(
    `${API_URL}job/recruiter/${jobId}`,
    options
  );

  return response.data;
};

// ================= GET APPLICATIONS FOR JOB =================
const getApplicationsForJob = async (jobId, token) => {
  const options = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(
    `${API_URL}application/recruiter/job/${jobId}`,
    options
  );

  return response.data;
};

// ================= GET RESUME BY APPLICATION =================
const getResumeByApplication = async (applicationId, token) => {
  const options = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(
    `${API_URL}application/recruiter/${applicationId}/resume`,
    options
  );

  return response.data;
};

// ================= GET ALL APPLICATIONS FOR RECRUITER =================
const getAllRecruiterApplications = async (token) => {
  const options = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(`${API_URL}application/recruiter/all`, options);
  return response.data;
};

// ================= UPDATE APPLICATION STATUS =================
const updateApplicationStatus = async ({ applicationId, status, token }) => {
  const options = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(
    `${API_URL}application/${applicationId}/status`,
    { status },
    options
  );

  return response.data;
};

const recruiterService = {
  fetchAllJobs,
  createJob,
  updateJob,
  closeJob,
  deleteJob,
  getApplicationsForJob,
  getResumeByApplication,
  getAllRecruiterApplications,
  updateApplicationStatus,
};

export default recruiterService;