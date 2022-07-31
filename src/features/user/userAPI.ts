import { API } from "../apiCaller";

export function doGetUsers() {
  return API.get("/users").then(function (response) {
    return response;
  });
}

export function doApproveUser(userId: Number) {
  return API.put(`/users/${userId}/approve`).then(function (response) {
    return response;
  });
}
