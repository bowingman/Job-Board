import { API } from "../apiCaller";

export function doSignin(data: { name: string; password: string }) {
  return API.post("/auth/signin", {
    ...data,
  }).then(function (response) {
    return response;
  });
}

export function doSigninByToken() {
  if (localStorage.getItem("_token")) {
    return API.post("/auth/signinbytoken", {
      token: localStorage.getItem("_token"),
    }).then(function (response) {
      return response;
    });
  }
}

export function doLogout(currentUser: object) {
  return API.post("/auth/logout", {
    ...currentUser,
  }).then(function (response) {
    return response;
  });
}

export function doSignup(data: object) {
  return API.post("/auth/signup", {
    ...data,
  }).then((response) => {
    return response.data;
  });
}
