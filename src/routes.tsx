import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Signin from "./features/auth/Signin";
import Signup from "./features/auth/Signup";
import Jobs from "./features/job/jobs";
import NewJobs from "./features/job/newJobs";
import JobDetail from "./features/job/jobDetail";
import Users from "./features/user/users";

import { selectCurrentUser } from "./features/auth/authSlice";
import { useAppSelector } from "./app/hooks";

const MainRoutes = () => {
  const currentUser = useAppSelector(selectCurrentUser);

  return currentUser ? (
    <>
      <Routes>
        <Route path="/home" element={<div>Welcome to HomePage</div>} />
        <Route path="/users" element={<Users />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/jobs/new" element={<NewJobs />} />
        <Route path="/jobs/:id" element={<JobDetail />} />
      </Routes>
    </>
  ) : (
    <>
      <Routes>
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Navigate replace to="/home" />} />
      </Routes>
    </>
  );
};

export default MainRoutes;
