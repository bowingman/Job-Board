import React, { useEffect } from "react";
import {
  Container,
  Heading,
  TableContainer,
  Table,
  TableCaption,
  Tr,
  Th,
  Thead,
  Td,
  Tbody,
  Badge,
  Button,
} from "@chakra-ui/react";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getUsersAsync, seelctUsers, approveUserAsync } from "./userSlice";

const Users = () => {
  const dispatch = useAppDispatch();
  const users = useAppSelector(seelctUsers);

  useEffect(() => {
    dispatch(getUsersAsync());
  }, [dispatch]);

  return (
    <Container maxW="container.lg">
      <Heading mt={10} mb={6}>
        User List
      </Heading>
      <TableContainer>
        <Table variant="striped" colorScheme="teal">
          <TableCaption>User List</TableCaption>
          <Thead>
            <Tr>
              <Th>No</Th>
              <Th>Name</Th>
              <Th>Role</Th>
              <Th>Title</Th>
              <Th>Rate</Th>
              <Th>Approved</Th>
            </Tr>
          </Thead>
          <Tbody>
            {users.map((user, index) => (
              <Tr key={index}>
                <Td>{index + 1}</Td>
                <Td>{user.name}</Td>
                <Td>{user.role}</Td>
                <Td>{user.title}</Td>
                <Td>{user.rate}</Td>
                <Td>
                  {user.approved ? (
                    <Badge colorScheme={"yellow"}>Approved</Badge>
                  ) : (
                    <Button
                      colorScheme={"facebook"}
                      onClick={() => {
                        dispatch(approveUserAsync(user.id));
                      }}
                    >
                      Approve User
                    </Button>
                  )}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default Users;
