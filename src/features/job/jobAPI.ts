import { API } from "../apiCaller";

export function doGetJobs() {
  return API.get("/jobs", {}).then(function (response) {
    return response;
  });
}

export function doGetJob(jobId: number) {
  return API.get(`/jobs/${jobId}`).then(function (response) {
    return response;
  });
}

export function doCreateJob(jobData: object) {
  return API.post("/jobs", {
    ...jobData,
  }).then(function (response) {
    return response;
  });
}

export function doApproveJob(jobId: Number) {
  return API.put(`/jobs/${jobId}/approve`).then(function (response) {
    return response;
  });
}

export function doPostApplication(
  jobId: Number,
  content: String,
  rate: Number
) {
  return API.post(`/applications/${jobId}`, { content, rate }).then(function (
    response
  ) {
    return response;
  });
}

export function doPostApplicationAnswer(applicationId: Number, answer: String) {
  return API.put(`/applications/${applicationId}/answer`, { answer }).then(
    function (response) {
      return response;
    }
  );
}
