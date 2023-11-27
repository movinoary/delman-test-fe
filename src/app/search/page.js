"use client";
// Module
import { useRef, useState, useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Box,
  Button,
  Center,
  Divider,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import * as FaIcons from "react-icons/fa";
import * as FcIcons from "react-icons/fc";
// Context
import { useDataContext } from "@/context/dataReducer";
import { deleteUser, getUsers } from "@/config/api";
// Component
import Header from "@/components/header";

export default function Home() {
  const [dataState, { dataDispatch }] = useDataContext();
  const [query, setQuery] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { userProfile } = dataState;
  const btnRef = useRef();
  const queryClient = useQueryClient();
  const toast = useToast();

  // Get Data Users
  const { data: usersData } = useQuery({
    queryKey: ["usersData"],
    queryFn: () => getUsers(),
  });

  useEffect(() => {
    dataDispatch.getUsersData(usersData);
  }, [usersData]);

  // Search Data
  const keys = ["email"];
  const Search = (data) => {
    return data?.filter((item) =>
      keys.some((key) => item[key].toLowerCase().includes(query))
    );
  };
  const data = Search(dataState?.users);

  const renderSearchUser = (
    <Flex direction="column" w="100%">
      <Header title="Search User" subTitle="Search existing user" />
      <Flex direction="column" w="100%" h="100%" p="1rem 2rem" gap="1rem">
        <InputGroup borderRadius={5} size="md" color="gray.500">
          <InputLeftElement
            pointerEvents="none"
            children={<FaIcons.FaSearch />}
          />
          <Input
            type="text"
            placeholder="Search..."
            border="1px solid #b6b6b6"
            color="gray.700"
            onChange={(e) => setQuery(e.target.value)}
          />
        </InputGroup>
        <Box
          w="100%"
          h="100%"
          maxH="65vh"
          overflow="auto"
          border="1px solid #b6b6b6"
          borderRadius={5}
          padding="1rem"
        >
          {query === "" ? (
            <Center w="100%" h="100%">
              <Flex
                direction="column"
                alignItems="center"
                justifyContent="center"
              >
                <FcIcons.FcFinePrint
                  style={{
                    fontSize: "8rem",
                  }}
                />
                <Heading as="h1" size="xl" cursor="default">
                  Input Email
                </Heading>
              </Flex>
            </Center>
          ) : data?.length === 0 ? (
            <Center w="100%" h="100%">
              <Flex
                direction="column"
                alignItems="center"
                justifyContent="center"
              >
                <FcIcons.FcDeleteDatabase
                  style={{
                    fontSize: "8rem",
                  }}
                />
                <Heading as="h1" size="xl" cursor="default">
                  No User
                </Heading>
              </Flex>
            </Center>
          ) : (
            data?.map((item, index) => (
              <Flex
                direction="column"
                alignItems="center"
                justifyContent="center"
                gap="10px"
                padding="1rem"
                borderRadius={5}
                border="1px solid #b6b6b6"
                marginBottom="1rem"
                key={index}
              >
                <Heading as="h1" size="lg" cursor="default">
                  {item?.email}
                </Heading>
                <Text fontSize="lg">{item?.name}</Text>
                <Divider colorScheme="blackAlpha" />
                <Button
                  color="white"
                  backgroundColor="blue.500"
                  onClick={() => handleOpenProfile(item)}
                  ref={btnRef}
                >
                  View User Profile
                </Button>
              </Flex>
            ))
          )}
        </Box>
      </Flex>
    </Flex>
  );

  // Detail Profile
  const handleOpenProfile = (item) => {
    dataDispatch.setUserProfile(item);
    onOpen();
  };

  const handleCloseProfile = () => {
    onClose();
  };

  const deletePostMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["deleteUser"] });
    },
  });

  const handleDelete = (id) => {
    deletePostMutation.mutate(id);
    onClose();
    toast({
      title: `success delete user in email : ${userProfile?.data?.["email"]}`,
      status: `success`,
      isClosable: true,
      position: "top",
    });
    dataDispatch.setUserProfile({});
  };

  const renderDetailProfile = (
    <Drawer
      isOpen={isOpen}
      placement="right"
      onClose={onClose}
      finalFocusRef={btnRef}
      size="md"
      p="0 2rem"
    >
      <DrawerOverlay />
      <DrawerContent bgColor="gray.200">
        <DrawerCloseButton />
        <DrawerHeader>
          <Heading as="h1" size="lg" cursor="default">
            User Details
          </Heading>
          <Text fontSize="sm" fontWeight="400">
            This is inuiry user with email : {userProfile?.data?.["email"]}
          </Text>
        </DrawerHeader>

        <DrawerBody>
          <Box
            w="100%"
            h="100%"
            overflow="auto"
            borderTop="1px solid #b6b6b6"
            borderBottom="1px solid #b6b6b6"
          >
            {userProfile?.fields?.map((item, index) => {
              return (
                <Flex key={index}>
                  <Text w="250px">{item?.text}</Text>
                  <Text wordBreak="break-all" w="400px">
                    : {userProfile?.data?.[item?.field]}
                  </Text>
                </Flex>
              );
            })}
          </Box>
        </DrawerBody>

        <DrawerFooter>
          <Flex justifyContent="space-between" w="100%">
            <Button variant="transparant" mr={3} onClick={handleCloseProfile}>
              Cancel
            </Button>
            <Button
              colorScheme="red"
              onClick={() => handleDelete(userProfile?.data?.id)}
            >
              Delete User
            </Button>
          </Flex>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );

  return (
    <>
      {renderSearchUser}
      {renderDetailProfile}
    </>
  );
}
