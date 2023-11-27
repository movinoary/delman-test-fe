"use client";
// Module
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Box, Center, Flex } from "@chakra-ui/react";
// Context
import { useDataContext } from "@/context/dataReducer";
import { getUsers } from "@/config/api";
// Component
import Header from "@/components/header";
import Table from "@/components/table";

export default function Home() {
  const [dataState, { dataDispatch }] = useDataContext();

  const { data: usersData } = useQuery({
    queryKey: ["usersData"],
    queryFn: () => getUsers(),
  });

  useEffect(() => {
    dataDispatch.getUsersData(usersData);
  }, [usersData]);

  return (
    <Flex direction="column" w="100%">
      <Header title="Users Data" subTitle="List of Users Data" />
      <Center w="100%" h="100%">
        <Box>
          <Table type="users" />
        </Box>
      </Center>
    </Flex>
  );
}
