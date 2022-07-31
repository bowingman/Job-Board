import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import {
  doCreateJob,
  doGetJobs,
  doGetJob,
  doApproveJob,
  doPostApplication,
  doPostApplicationAnswer,
} from "./jobAPI";
import { jobDto } from "../../interfaces";

export interface JobState {
  jobs: Array<jobDto>;
  job: jobDto | null;
  status: "idle" | "loading" | "failed";
}

const initialState: JobState = {
  jobs: [],
  job: null,
  status: "idle",
};

export const getJobsAsync = createAsyncThunk("get_jobs", async () => {
  const response = await doGetJobs();
  return response.data;
});

export const getJobOneAsync = createAsyncThunk(
  "get_job",
  async (jobId: number) => {
    const response = await doGetJob(jobId);
    return response.data;
  }
);

export const createJobAsync = createAsyncThunk(
  "create_jobs",
  async (jobData: object) => {
    const response = await doCreateJob(jobData);
    return response.data;
  }
);

export const approveJobAsync = createAsyncThunk(
  "approve_job",
  async (jobId: Number) => {
    const response = await doApproveJob(jobId);
    return response.data;
  }
);

export const postApplicationAsync = createAsyncThunk(
  "post_application",
  async (data: { jobId: Number; content: String; rate: Number }) => {
    const response = await doPostApplication(
      data.jobId,
      data.content,
      data.rate
    );
    return response.data;
  }
);

export const postApplicationAnswerAsync = createAsyncThunk(
  "post_application_answer",
  async (data: { applicationId: Number; answer: String }) => {
    const response = await doPostApplicationAnswer(
      data.applicationId,
      data.answer
    );
    return response.data;
  }
);

export const jobSlice = createSlice({
  name: "job",
  initialState,

  reducers: {
    setJobDetailData: (state, action: PayloadAction<jobDto>) => {
      state.job = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getJobsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getJobsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.jobs = action.payload.data;
      })
      .addCase(getJobsAsync.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(createJobAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createJobAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.job = action.payload.data;
      })
      .addCase(createJobAsync.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(approveJobAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(approveJobAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.jobs = action.payload.data;
      })
      .addCase(approveJobAsync.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(postApplicationAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(postApplicationAsync.fulfilled, (state, action) => {
        state.status = "idle";
      })
      .addCase(postApplicationAsync.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(getJobOneAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getJobOneAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.job = action.payload.data;
      })
      .addCase(getJobOneAsync.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(postApplicationAnswerAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(postApplicationAnswerAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.job = action.payload.data;
      })
      .addCase(postApplicationAnswerAsync.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const selectJobs = (state: RootState) => state.job.jobs;
export const selectJobOne = (state: RootState) => state.job.job;

export const { setJobDetailData } = jobSlice.actions;
export default jobSlice.reducer;
