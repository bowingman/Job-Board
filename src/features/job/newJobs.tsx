import React from "react";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import { useNavigate } from "react-router-dom";

import { useAppDispatch } from "../../app/hooks";
import { createJobAsync } from "./jobSlice";

import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

const SigninSchema = Yup.object().shape({
  title: Yup.string().min(2, "Too Short!").required("Required"),
  description: Yup.string().min(2, "Too Short!").required("Required"),
  company_tips: Yup.string().min(2, "Too Short!").required("Required"),
  job_info: Yup.string().min(2, "Too Short!").required("Required"),
  company_scale: Yup.string().min(2, "Too Short!").required("Required"),
});

const NewJobs = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  return (
    <Flex>
      <Stack mx={"auto"} minW={"1200px"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>New Job</Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            to enjoy all of our cool <Link color={"blue.400"}>features</Link> ✌️
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Formik
            initialValues={{
              title: "",
              description: "",
              rate: 0,
              company_scale: "",
              company_tips: "",
              job_info: "",
            }}
            validationSchema={SigninSchema}
            onSubmit={async (values) => {
              await dispatch(createJobAsync({ ...values }));
              navigate("/jobs");
            }}
          >
            {({ errors, touched }) => (
              <Form>
                <Stack spacing={4}>
                  <FormControl>
                    <FormLabel>Title</FormLabel>
                    <Field
                      type="text"
                      name="title"
                      className="chakra-input css-10ex9a1"
                      style={
                        errors.title && touched.title && { borderColor: "red" }
                      }
                    />
                  </FormControl>
                  <Input type="hidden" />
                  <FormControl id="description" isRequired>
                    <FormLabel>Description</FormLabel>
                    <Field
                      as="textarea"
                      type="text"
                      name="description"
                      className="chakra-textarea css-1o431tt"
                      style={
                        errors.description &&
                        touched.description && { borderColor: "red" }
                      }
                    />
                  </FormControl>
                  <FormControl id="company_scale" isRequired>
                    <FormLabel>Company Scale</FormLabel>
                    <Field
                      as="select"
                      type="text"
                      name="company_scale"
                      className="chakra-input css-10ex9a1"
                      style={
                        errors.company_scale &&
                        touched.company_scale && { borderColor: "red" }
                      }
                    >
                      <option value="tiny">Tiny(1 - 10 employees)</option>
                      <option value="small">Small(10 - 100 employees)</option>
                      <option value="medium">
                        Medium(100 - 1000 employees)
                      </option>
                      <option value="large">
                        Large(1000 - 5000 employees)
                      </option>
                      <option value="giant">Giant(+5000 employees)</option>
                    </Field>
                  </FormControl>
                  <FormControl id="company_tips" isRequired>
                    <FormLabel>Company Tips</FormLabel>
                    <Field
                      as="textarea"
                      type="text"
                      name="company_tips"
                      className="chakra-textarea css-1o431tt"
                      style={
                        errors.company_tips &&
                        touched.company_tips && { borderColor: "red" }
                      }
                    />
                  </FormControl>
                  <FormControl id="job_info" isRequired>
                    <FormLabel>Job Info</FormLabel>
                    <Field
                      as="textarea"
                      type="text"
                      name="job_info"
                      className="chakra-textarea css-1o431tt"
                      style={
                        errors.job_info &&
                        touched.job_info && { borderColor: "red" }
                      }
                    />
                  </FormControl>
                  <Textarea style={{ display: "none" }} />

                  <Stack spacing={10}>
                    <Button
                      type="submit"
                      bg={"blue.400"}
                      color={"white"}
                      _hover={{
                        bg: "blue.500",
                      }}
                    >
                      POST JOB
                    </Button>
                  </Stack>
                </Stack>
              </Form>
            )}
          </Formik>
        </Box>
      </Stack>
    </Flex>
  );
};

export default NewJobs;
