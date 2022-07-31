import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import {
  Container,
  Box,
  Flex,
  Text,
  Heading,
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalCloseButton,
  useDisclosure,
  Textarea,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";

import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  selectJobOne,
  getJobOneAsync,
  postApplicationAnswerAsync,
} from "./jobSlice";
import JobItem from "../../components/jobItem";

const ApplicationAnswerSchema = Yup.object().shape({
  answer: Yup.string().required("Required"),
});

const JobDetail = () => {
  const dispatch = useAppDispatch();
  const jobDetailData = useAppSelector(selectJobOne);
  const [applicationId, setApplicationId] = useState(0);
  const { id } = useParams();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const finalRef = React.useRef(null);

  useEffect(() => {
    dispatch(getJobOneAsync(Number(id)));
  }, [dispatch, id]);
  return (
    <Container maxW="container.lg">
      {jobDetailData && (
        <>
          <Heading mb={4} mt={4} size={"lg"}>
            Job Information
          </Heading>
          <JobItem jobData={jobDetailData} />
          <Heading mb={4} size={"lg"}>
            {jobDetailData.Application && jobDetailData.Application?.length > 0
              ? `${jobDetailData.Application?.length} Applications`
              : "No Applications"}
          </Heading>
          {jobDetailData.Application?.map((application_info) => (
            <Box borderWidth="2px" mb={4}>
              <Flex mb={2}>
                <Text ml={4} mt={2} mb={2} mr={4} fontWeight={"bold"}>
                  {application_info.user?.name} :{" "}
                </Text>
                <Text maxWidth={"70%"} minWidth={"70%"}>
                  {application_info.content}
                </Text>
                <Text mr={4}>{application_info.rate} USD</Text>
                {!application_info.answered && (
                  <Button
                    colorScheme="black"
                    bgColor={"black"}
                    color={"white"}
                    variant={"outline"}
                    onClick={() => {
                      setApplicationId(Number(application_info.id));
                      onOpen();
                    }}
                  >
                    Answer
                  </Button>
                )}
              </Flex>
              {application_info.answered && (
                <Flex>
                  <Text ml={4} mb={2} fontWeight={"bold"}>
                    Answer :&nbsp;
                  </Text>
                  <Text maxWidth={"90%"} minWidth={"70%"}>
                    {application_info.answer}
                  </Text>
                </Flex>
              )}
            </Box>
          ))}
          <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
            <Formik
              initialValues={{
                answer: "",
              }}
              validationSchema={ApplicationAnswerSchema}
              onSubmit={async (values) => {
                await dispatch(
                  postApplicationAnswerAsync({ applicationId, ...values })
                );
                onClose();
              }}
            >
              {({ errors, touched }) => (
                <Form>
                  <ModalOverlay />
                  <ModalContent>
                    <ModalHeader>Post Application Answer</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                      <Box>
                        <FormControl id="answer" isRequired>
                          <FormLabel>Application Answer</FormLabel>
                          <Field
                            as="textarea"
                            type="text"
                            name="answer"
                            className="chakra-textarea css-1o431tt"
                            style={
                              errors.answer &&
                              touched.answer && { borderColor: "red" }
                            }
                          />
                        </FormControl>
                        <Textarea style={{ display: "none" }} />
                      </Box>
                    </ModalBody>

                    <ModalFooter>
                      <Button colorScheme="blue" mr={3} onClick={onClose}>
                        Close
                      </Button>
                      <Button variant="ghost" type="submit">
                        POST
                      </Button>
                    </ModalFooter>
                  </ModalContent>
                </Form>
              )}
            </Formik>
          </Modal>
        </>
      )}
    </Container>
  );
};

export default JobDetail;
