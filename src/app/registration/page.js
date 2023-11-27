"use client";
// Module
import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Box, Button, Flex, Input, Text, useToast } from "@chakra-ui/react";
// Context
import { useDataContext } from "@/context/dataReducer";
import { getUsers, postUser } from "@/config/api";
// Component
import Header from "@/components/header";

export default function Home() {
  const [dataState, { dataDispatch }] = useDataContext();
  const toast = useToast();
  const [color, setColor] = useState({
    name: "gray.300",
    email: "gray.300",
  });
  const [form, setForm] = useState({
    name: "",
    email: "",
  });
  const { users } = dataState;

  const { data: usersData } = useQuery({
    queryKey: ["usersData"],
    queryFn: () => getUsers(),
  });

  useEffect(() => {
    dataDispatch.getUsersData(usersData);
  }, [usersData]);

  const colorButton =
    form.name !== "" && form.email !== ""
      ? { backgroundColor: "blue.400", color: "white", width: "350px" }
      : { backgroundColor: "gray.400", color: "white", width: "350px" };

  const onChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const queryClient = useQueryClient();

  const createPostMutation = useMutation({
    mutationFn: postUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["postUser"] });
    },
  });

  const onSubmit = () => {
    const validasiAt = form.email.indexOf("@");
    const validasiCom = form.email.indexOf(".");
    const findEmail = users?.find((d) => d.email === form.email);

    let nameColor = "gray.300";
    let emailColor = "gray.300";
    let titleToats = "complete the input";
    let statusToats = "warning";

    if (form.name === "" && form.email === "") {
      nameColor = "red.300";
      emailColor = "red.300";
      titleToats = "complete the input name & email column";
      statusToats = "warning";
    } else if (form.name !== "" && form.email === "") {
      nameColor = "gray.300";
      emailColor = "red.300";
      titleToats = "complete the input email column";
      statusToats = "warning";
    } else if (validasiAt !== -1) {
      if (validasiCom !== -1) {
        if (findEmail === undefined) {
          createPostMutation.mutate({
            ...form,
          });
          titleToats = "success create user";
          statusToats = "success";
          setForm({
            name: "",
            email: "",
          });
          nameColor = "gray.300";
          emailColor = "gray.300";
        } else {
          emailColor = "red.400";
          titleToats = "The email you entered is now available";
          statusToats = "error";
        }
      } else {
        emailColor = "red.400";
        titleToats = "The email entered is already available incomplete";
        statusToats = "error";
      }
    } else {
      emailColor = "red.400";
      titleToats = "The email entered is already available incomplete";
      statusToats = "error";
    }

    toast({
      title: titleToats,
      status: statusToats,
      isClosable: true,
      position: "top",
    });
    setColor({
      name: nameColor,
      email: emailColor,
    });
  };
  return (
    <Flex direction="column" w="100%">
      <Header title="User Registration" subTitle="Add new User" />
      <Flex direction="column" gap="1rem" w="100%" p="1rem">
        <Flex direction="column" gap="5px">
          <Box>
            <Text mb="8px">Name</Text>
            <Input
              name="name"
              value={form.name}
              onChange={onChange}
              size="sm"
              w="350px"
              borderColor={color.name}
            />
          </Box>
          <Box>
            <Text mb="8px">Email</Text>
            <Input
              name="email"
              value={form.email}
              onChange={onChange}
              size="sm"
              w="350px"
              borderColor={color.email}
            />
          </Box>
        </Flex>
        <Button {...colorButton} onClick={onSubmit}>
          Submit User
        </Button>
      </Flex>
    </Flex>
  );
}
