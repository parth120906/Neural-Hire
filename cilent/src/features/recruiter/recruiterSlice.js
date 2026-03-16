import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import recruiterService from "./recuiterService";

const initialState = {
  // Jobs
  jobs: [],
  jobsCount: 0,
  jobsLoading: false,
  jobsError: "",

  // Applications for a specific job
  applications: [],
  applicationsCount: 0,
  applicationsLoading: false,
  applicationsError: "",
  selectedJobId: null,

  // All applications across recruiter's jobs
  allApplications: [],
  allApplicationsMeta: { totalJobs: 0, totalApplications: 0 },
  allApplicationsLoading: false,
  allApplicationsError: "",

  // Resume URL
  resumeUrl: null,
  resumeLoading: false,
  resumeError: "",

  // Update application status
  updateStatusLoading: false,
  updateStatusError: "",
};

// ================= GET MY JOBS =================
export const getAllJobs = createAsyncThunk(
  "RECRUITER/GET_JOBS",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await recruiterService.fetchAllJobs(token);
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// ================= CREATE JOB =================
export const createNewJob = createAsyncThunk(
  "RECRUITER/CREATE_JOB",
  async (jobData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      const res = await recruiterService.createJob(jobData, token);
      return res.job;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// ================= UPDATE JOB =================
export const updateRecruiterJob = createAsyncThunk(
  "RECRUITER/UPDATE_JOB",
  async ({ jobId, jobData }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      const res = await recruiterService.updateJob(jobId, jobData, token);
      return res.job;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// ================= CLOSE JOB =================
export const closeRecruiterJob = createAsyncThunk(
  "RECRUITER/CLOSE_JOB",
  async (jobId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      await recruiterService.closeJob(jobId, token);
      return jobId;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// ================= DELETE JOB =================
export const deleteRecruiterJob = createAsyncThunk(
  "RECRUITER/DELETE_JOB",
  async (jobId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      await recruiterService.deleteJob(jobId, token);
      return jobId;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// ================= GET APPLICATIONS FOR ONE JOB =================
export const getApplications = createAsyncThunk(
  "RECRUITER/GET_JOB_APPLICATIONS",
  async (jobId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      const res = await recruiterService.getApplicationsForJob(jobId, token);
      return { jobId, ...res };
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// ================= GET ALL APPLICATIONS (RECRUITER) =================
export const getRecruiterApplications = createAsyncThunk(
  "RECRUITER/GET_ALL_APPLICATIONS",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await recruiterService.getAllRecruiterApplications(token);
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// ================= GET RESUME URL =================
export const getResume = createAsyncThunk(
  "RECRUITER/GET_RESUME",
  async (applicationId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await recruiterService.getResumeByApplication(applicationId, token);
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// ================= UPDATE APPLICATION STATUS =================
export const updateRecruiterApplicationStatus = createAsyncThunk(
  "RECRUITER/UPDATE_APPLICATION_STATUS",
  async ({ applicationId, status }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      const res = await recruiterService.updateApplicationStatus({
        applicationId,
        status,
        token,
      });
      return res.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const recruiterSlice = createSlice({
  name: "recruiter",
  initialState,
  reducers: {
    clearRecruiterResume(state) {
      state.resumeUrl = null;
      state.resumeError = "";
      state.resumeLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // JOBS
      .addCase(getAllJobs.pending, (state) => {
        state.jobsLoading = true;
        state.jobsError = "";
      })
      .addCase(getAllJobs.fulfilled, (state, action) => {
        state.jobsLoading = false;
        state.jobs = action.payload.jobs || [];
        state.jobsCount = action.payload.count || 0;
      })
      .addCase(getAllJobs.rejected, (state, action) => {
        state.jobsLoading = false;
        state.jobsError = action.payload;
      })
      .addCase(createNewJob.fulfilled, (state, action) => {
        state.jobs = [action.payload, ...state.jobs];
        state.jobsCount += 1;
      })
      .addCase(updateRecruiterJob.fulfilled, (state, action) => {
        state.jobs = state.jobs.map((j) =>
          j._id === action.payload._id ? action.payload : j
        );
      })
      .addCase(closeRecruiterJob.fulfilled, (state, action) => {
        state.jobs = state.jobs.map((j) =>
          j._id === action.payload ? { ...j, isActive: false } : j
        );
      })
      .addCase(deleteRecruiterJob.fulfilled, (state, action) => {
        state.jobs = state.jobs.filter((j) => j._id !== action.payload);
        state.jobsCount = Math.max(0, state.jobsCount - 1);
      })

      // APPLICATIONS (JOB)
      .addCase(getApplications.pending, (state) => {
        state.applicationsLoading = true;
        state.applicationsError = "";
      })
      .addCase(getApplications.fulfilled, (state, action) => {
        state.applicationsLoading = false;
        state.selectedJobId = action.payload.jobId;
        state.applications = action.payload.data || [];
        state.applicationsCount = action.payload.count || 0;
      })
      .addCase(getApplications.rejected, (state, action) => {
        state.applicationsLoading = false;
        state.applicationsError = action.payload;
      })

      // APPLICATIONS (ALL)
      .addCase(getRecruiterApplications.pending, (state) => {
        state.allApplicationsLoading = true;
        state.allApplicationsError = "";
      })
      .addCase(getRecruiterApplications.fulfilled, (state, action) => {
        state.allApplicationsLoading = false;
        state.allApplications = action.payload.data || [];
        state.allApplicationsMeta = {
          totalJobs: action.payload.totalJobs || 0,
          totalApplications: action.payload.totalApplications || 0,
        };
      })
      .addCase(getRecruiterApplications.rejected, (state, action) => {
        state.allApplicationsLoading = false;
        state.allApplicationsError = action.payload;
      })

      // RESUME
      .addCase(getResume.pending, (state) => {
        state.resumeLoading = true;
        state.resumeError = "";
        state.resumeUrl = null;
      })
      .addCase(getResume.fulfilled, (state, action) => {
        state.resumeLoading = false;
        state.resumeUrl = action.payload.resumeUrl || null;
      })
      .addCase(getResume.rejected, (state, action) => {
        state.resumeLoading = false;
        state.resumeError = action.payload;
      })

      // UPDATE STATUS
      .addCase(updateRecruiterApplicationStatus.pending, (state) => {
        state.updateStatusLoading = true;
        state.updateStatusError = "";
      })
      .addCase(updateRecruiterApplicationStatus.fulfilled, (state, action) => {
        state.updateStatusLoading = false;
        const updated = action.payload;
        state.applications = state.applications.map((a) =>
          a._id === updated._id ? updated : a
        );
        state.allApplications = state.allApplications.map((a) =>
          a._id === updated._id ? updated : a
        );
      })
      .addCase(updateRecruiterApplicationStatus.rejected, (state, action) => {
        state.updateStatusLoading = false;
        state.updateStatusError = action.payload;
      });
  },
});

export const { clearRecruiterResume } = recruiterSlice.actions;

export default recruiterSlice.reducer;