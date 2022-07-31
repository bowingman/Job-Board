import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getJobsAsync, selectJobs } from "./jobSlice";

import { Button, Container, Flex, Heading } from "@chakra-ui/react";

import JobItem from "../../components/jobItem";
import { selectCurrentUser } from "../auth/authSlice";

const Jobs = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const jobs = useAppSelector(selectJobs);
  const currentUser = useAppSelector(selectCurrentUser);

  useEffect(() => {
    dispatch(getJobsAsync());
  }, [dispatch]);

  return (
    <Container maxW="container.lg">
      <Flex alignItems={"center"}>
        <Heading mt={10} mb={6}>
          Featured Jobs
        </Heading>
        {currentUser && currentUser.role === "client" && (
          <Button
            ml={"auto"}
            colorScheme="facebook"
            onClick={() => navigate("/jobs/new")}
          >
            + New Job
          </Button>
        )}
      </Flex>
      {jobs.map((job, index) => (
        <JobItem jobData={job} key={index} />
      ))}
    </Container>
  );
};

export default Jobs;
