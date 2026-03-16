import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import jobService from "./jobService";

const initialState = {
  // list
  jobs: [],
  currentPage: 1,
  totalPages: 1,
  listLoading: false,
  listError: "",

  // detail
  job: null,
  jobLoading: false,
  jobError: "",

  // AI helpers
  questionLoading: false,
  questionError: "",
  questionAnswer: "",
  questionJob: null,

  resumeLoading: false,
  resumeError: "",
  resumeAnswer: "",
  resumeJob: null,
};

// ================= FETCH JOBS LIST =================
export const fetchJobs = createAsyncThunk(
  "JOBS/FETCH_LIST",
  async ({ page = 1, keyword = "" } = {}, thunkAPI) => {
    try {
      return await jobService.fetchJobs({ page, limit: 10, keyword });
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Failed to load jobs. Please try again.";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// ================= FETCH SINGLE JOB =================
export const fetchJobById = createAsyncThunk(
  "JOBS/FETCH_ONE",
  async (id, thunkAPI) => {
    try {
      return await jobService.fetchJobById(id);
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Failed to load job details.";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// ================= AI QUESTION =================
export const askJobQuestion = createAsyncThunk(
  "JOBS/ASK_AI",
  async (question, thunkAPI) => {
    try {
      return await jobService.askJobQuestion(question);
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "AI suggestion failed. Please try again.";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// ================= AI RESUME MATCH =================
export const matchResumeToJobs = createAsyncThunk(
  "JOBS/MATCH_RESUME",
  async (resumeText, thunkAPI) => {
    try {
      return await jobService.matchResumeToJobs(resumeText);
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "AI resume matching failed. Please try again.";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const jobSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {
    resetJobErrors(state) {
      state.listError = "";
      state.jobError = "";
      state.questionError = "";
      state.resumeError = "";
    },
  },
  extraReducers: (builder) => {
    builder
      // LIST
      .addCase(fetchJobs.pending, (state) => {
        state.listLoading = true;
        state.listError = "";
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.listLoading = false;
        state.jobs = action.payload.jobs || [];
        state.totalPages = action.payload.totalPages || 1;
        state.currentPage = action.payload.currentPage || 1;
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        state.listLoading = false;
        state.listError = action.payload;
      })

      // JOB DETAIL
      .addCase(fetchJobById.pending, (state) => {
        state.jobLoading = true;
        state.jobError = "";
      })
      .addCase(fetchJobById.fulfilled, (state, action) => {
        state.jobLoading = false;
        state.job = action.payload.job || null;
      })
      .addCase(fetchJobById.rejected, (state, action) => {
        state.jobLoading = false;
        state.jobError = action.payload;
        state.job = null;
      })

      // AI QUESTION
      .addCase(askJobQuestion.pending, (state) => {
        state.questionLoading = true;
        state.questionError = "";
        state.questionAnswer = "";
        state.questionJob = null;
      })
      .addCase(askJobQuestion.fulfilled, (state, action) => {
        state.questionLoading = false;
        state.questionAnswer = action.payload.answer || "";
        state.questionJob = action.payload.job || null;
      })
      .addCase(askJobQuestion.rejected, (state, action) => {
        state.questionLoading = false;
        state.questionError = action.payload;
      })

      // AI RESUME
      .addCase(matchResumeToJobs.pending, (state) => {
        state.resumeLoading = true;
        state.resumeError = "";
        state.resumeAnswer = "";
        state.resumeJob = null;
      })
      .addCase(matchResumeToJobs.fulfilled, (state, action) => {
        state.resumeLoading = false;
        state.resumeAnswer = action.payload.answer || "";
        state.resumeJob = action.payload.job || null;
      })
      .addCase(matchResumeToJobs.rejected, (state, action) => {
        state.resumeLoading = false;
        state.resumeError = action.payload;
      });
  },
});

export const { resetJobErrors } = jobSlice.actions;

export default jobSlice.reducer;

