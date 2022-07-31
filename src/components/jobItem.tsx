import React from "react";
import * as Yup from "yup";
import moment from "moment";
import { Formik, Form, Field } from "formik";
import { useNavigate } from "react-router-dom";
import {
  Badge,
  Box,
  Button,
  Flex,
  Text,
  Stack,
  Modal,
  ModalBody,
  ModalFooter,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalCloseButton,
  useDisclosure,
  Textarea,
  Input,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { ChatIcon } from "@chakra-ui/icons";
import { Icon } from "@iconify-icon/react";
import { jobDto } from "../interfaces";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { selectCurrentUser } from "../features/auth/authSlice";
import {
  approveJobAsync,
  postApplicationAsync,
} from "../features/job/jobSlice";

const ApplicationSchema = Yup.object().shape({
  content: Yup.string().required("Required"),
});

const JobItem = ({ jobData }: { jobData: jobDto }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const finalRef = React.useRef(null);
  const [jobId, setJobId] = React.useState(0);
  const [applicationContent, setApplicationContent] = React.useState("");
  const [appplicationRate, setApplicationRate] = React.useState(1000);
  const [newApplication, setNewApplication] = React.useState(true);
  const currentUser = useAppSelector(selectCurrentUser);

  return (
    <>
      <Box borderWidth="2px" mb={6}>
        <Flex>
          <Flex alignItems={"center"} mt={3}>
            <ChatIcon
              fontSize={"20px"}
              color="red"
              mb="30px"
              mr="50px"
              ml="20px"
            />
            <Box>
              <Text fontSize={"2xl"} pb={"5px"}>
                {jobData.title}
              </Text>
              <Text pb={"5px"}>{jobData.description}</Text>
              <Flex alignItems={"center"} pb={"20px"}>
                <Icon icon="fa6-solid:people-group" />
                <Text fontSize={"xs"} color="grey">
                  &nbsp;
                  {jobData.company_scale === "tiny"
                    ? "1-10 EMPLOYEES"
                    : jobData.company_scale === "small"
                    ? "11-100 EMPLOYEES"
                    : jobData.company_scale === "medium"
                    ? "101-1000 EMPLOYEES"
                    : jobData.company_scale === "large"
                    ? "1001-5000 EMPLOYEES"
                    : "+5000 EMPLOYEES"}
                </Text>
              </Flex>
            </Box>
          </Flex>
          <Stack ml={"auto"}>
            {currentUser && currentUser.role !== "freelancer" ? (
              !jobData.approved ? (
                <Badge colorScheme={"red"} fontSize={"14px"}>
                  Disapproved
                </Badge>
              ) : (
                <Badge colorScheme={"green"} fontSize={"14px"}>
                  Approved
                </Badge>
              )
            ) : (
              jobData.Application &&
              jobData.Application.length === 1 && (
                <Badge colorScheme={"green"} fontSize={"14px"}>
                  ALREADY POSTED
                </Badge>
              )
            )}
          </Stack>
        </Flex>
        <Box ml={5} mb={3} mr={5}>
          <Flex direction="row" mb={3}>
            <Badge mr={10}>
              <Flex alignItems={"center"}>
                <Icon icon="fa6-solid:circle-check" />
                &nbsp;ACTIVELY HIRING
              </Flex>
            </Badge>
            <Badge colorScheme="green" mr={10}>
              <Flex alignItems={"center"}>
                <Icon icon="fa6-solid:thumbs-up" />
                &nbsp;HIGHLY RATED
              </Flex>
            </Badge>
            <Badge colorScheme="red" mr={10}>
              <Flex alignItems={"center"}>
                <Icon icon="fa6-solid:bell" />
                &nbsp;SAME INVESTOR AS SNAPCHAT
              </Flex>
            </Badge>
            <Badge colorScheme="purple" mr={10}>
              <Flex alignItems={"center"}>
                <Icon icon="fa6-solid:scale-unbalanced" />
                &nbsp;WORK / LIFE BALANCE
              </Flex>
            </Badge>
            <Badge colorScheme="purple" mr={10}>
              <Flex alignItems={"center"}>
                <Icon icon="fa6-solid:compass" />
                &nbsp;STRONG LEADERSHIP
              </Flex>
            </Badge>
          </Flex>
          <Box borderWidth={"2px"}>
            <Flex alignItems={"center"}>
              <Text
                maxWidth={"70%"}
                minWidth={"70%"}
                ml={4}
                mt={2}
                mb={2}
                mr={4}
              >
                {jobData.job_info}
              </Text>
              <Text color="grey" mr={4} fontSize={"sm"}>
                {moment(jobData.created_at).fromNow()}
              </Text>
              {currentUser &&
                (currentUser.role === "freelancer" ? (
                  !jobData.Application ||
                  (jobData.Application?.length === 0 ? (
                    <>
                      <Button
                        colorScheme="black"
                        variant={"outline"}
                        mr={3}
                        size={"sm"}
                      >
                        Save
                      </Button>
                      <Button
                        colorScheme="black"
                        bgColor={"black"}
                        color={"white"}
                        variant={"outline"}
                        size={"sm"}
                        onClick={() => {
                          setJobId(Number(jobData.id));
                          onOpen();
                        }}
                      >
                        Apply
                      </Button>
                    </>
                  ) : (
                    <Button
                      colorScheme={"green"}
                      size={"sm"}
                      onClick={() => {
                        if (
                          jobData.Application &&
                          jobData.Application.length > 0
                        ) {
                          setApplicationContent(jobData.Application[0].content);
                          setApplicationRate(jobData.Application[0].rate);
                          setNewApplication(false);
                        } else {
                          setNewApplication(true);
                        }
                        onOpen();
                      }}
                    >
                      View Application
                    </Button>
                  ))
                ) : currentUser.role === "admin" ? (
                  !jobData.approved ? (
                    <Button
                      size={"sm"}
                      variant={"outline"}
                      colorScheme="green"
                      onClick={() => dispatch(approveJobAsync(jobData.id))}
                    >
                      Approve
                    </Button>
                  ) : (
                    jobData.Application && (
                      <Button
                        colorScheme={
                          jobData.Application.length === 0 ? "red" : "green"
                        }
                        size={"sm"}
                        onClick={() => {
                          navigate(`/jobs/${jobData.id}`);
                        }}
                      >
                        {jobData.Application.length} Applications
                      </Button>
                    )
                  )
                ) : (
                  currentUser.role === "client" &&
                  jobData.Application && (
                    <Button
                      colorScheme={
                        jobData.Application.length === 0 ? "red" : "green"
                      }
                      size={"sm"}
                      onClick={() => {
                        navigate(`/jobs/${jobData.id}`);
                      }}
                    >
                      {jobData.Application.length} Applications
                    </Button>
                  )
                ))}{" "}
            </Flex>
          </Box>
        </Box>
      </Box>
      <Modal
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
        size="5xl"
      >
        <Formik
          initialValues={{
            content: applicationContent,
            rate: appplicationRate,
          }}
          validationSchema={ApplicationSchema}
          onSubmit={async (values) => {
            await dispatch(postApplicationAsync({ jobId, ...values }));
            onClose();
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Post Application</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <Box>
                    <FormControl id="content" isRequired>
                      <FormLabel>Application Content</FormLabel>
                      <Field
                        as="textarea"
                        type="text"
                        name="content"
                        className="chakra-textarea css-1o431tt"
                        style={
                          errors.content &&
                          touched.content && { borderColor: "red" }
                        }
                      />
                    </FormControl>
                    <FormControl id="rate" isRequired>
                      <FormLabel>Application Rate</FormLabel>
                      <Field
                        type="number"
                        name="rate"
                        className="chakra-input css-10ex9a1"
                        style={
                          errors.rate && touched.rate && { borderColor: "red" }
                        }
                      />
                    </FormControl>
                    <Textarea style={{ display: "none" }} />
                    <Input type="hidden" />
                  </Box>
                </ModalBody>

                <ModalFooter>
                  <Button colorScheme="blue" mr={3} onClick={onClose}>
                    Close
                  </Button>
                  {newApplication && (
                    <Button variant="ghost" type="submit">
                      POST
                    </Button>
                  )}
                </ModalFooter>
              </ModalContent>
            </Form>
          )}
        </Formik>
      </Modal>
    </>
  );
};

export default JobItem;
