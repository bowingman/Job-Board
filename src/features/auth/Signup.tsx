import React from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import { useAppDispatch } from "../../app/hooks";
import { signupAsync } from "./authSlice";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Textarea,
  Text,
  useColorModeValue,
  Link,
} from "@chakra-ui/react";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Link as RouteLink } from "react-router-dom";

const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  password: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  title: Yup.string().required("Required"),
  description: Yup.string().required("Required"),
  role: Yup.string().required("Required"),
});

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return (
    <Flex
      minH={"75vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Sign up
          </Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            to enjoy all of our cool features ✌️
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
              name: "",
              password: "",
              role: "client",
              title: "",
              description: "",
            }}
            validationSchema={SignupSchema}
            onSubmit={async (values) => {
              const data = await dispatch(signupAsync({ ...values }));
              if (data.type !== "auth/signup/rejected") navigate("/signin");
            }}
          >
            {({ errors, touched }) => (
              <Form>
                <Stack spacing={4}>
                  <HStack>
                    <Box>
                      <FormControl id="name" isRequired>
                        <FormLabel>Name</FormLabel>
                        <Field
                          type="text"
                          name="name"
                          className="chakra-input css-10ex9a1"
                          style={
                            errors.name &&
                            touched.name && { borderColor: "red" }
                          }
                        />
                      </FormControl>
                      <Input type="hidden" />
                    </Box>
                    <Box>
                      <FormControl id="role">
                        <FormLabel>Role</FormLabel>
                        <Field
                          as="select"
                          type="text"
                          name="role"
                          className="chakra-input css-10ex9a1"
                          style={
                            errors.role &&
                            touched.role && { borderColor: "red" }
                          }
                        >
                          <option value="client">Client</option>
                          <option value="freelancer">Freelancer</option>
                        </Field>
                      </FormControl>
                    </Box>
                  </HStack>
                  <FormControl id="title" isRequired>
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
                  <Textarea style={{ display: "none" }} />
                  <FormControl id="password" isRequired>
                    <FormLabel>Password</FormLabel>
                    <InputGroup>
                      <Field
                        type={showPassword ? "text" : "password"}
                        name="password"
                        className="chakra-input css-10ex9a1"
                        style={
                          errors.password &&
                          touched.password && { borderColor: "red" }
                        }
                      />
                      <InputRightElement h={"full"}>
                        <Button
                          variant={"ghost"}
                          onClick={() =>
                            setShowPassword((showPassword) => !showPassword)
                          }
                        >
                          {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                  </FormControl>
                  <Stack spacing={10} pt={2}>
                    <Button
                      type="submit"
                      loadingText="Submitting"
                      size="lg"
                      bg={"blue.400"}
                      color={"white"}
                      _hover={{
                        bg: "blue.500",
                      }}
                    >
                      Sign up
                    </Button>
                  </Stack>
                  <Stack pt={6}>
                    <Text align={"center"}>
                      Already a user?{" "}
                      <Link as={RouteLink} color={"blue.400"} to="/signin">
                        Login
                      </Link>
                    </Text>
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

export default Signup;
