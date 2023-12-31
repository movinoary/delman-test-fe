"use client";
// Module
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Box, Center, Flex } from "@chakra-ui/react";
// Context
import { useDataContext } from "@/context/dataReducer";
import { getSales } from "@/config/api";
// Component
import Header from "@/components/header";
import Table from "@/components/table";

export default function Home() {
  const [_, { dataDispatch }] = useDataContext();

  const { data: salesData } = useQuery({
    queryKey: ["salesData"],
    queryFn: () => getSales(),
  });

  useEffect(() => {
    dataDispatch.getSalesData(salesData);
  }, [salesData]);

  return (
    <Flex direction="column" w="100%">
      <Header title="Sales Data" subTitle="List of Sales Data" />
      <Center w="100%" h="100%">
        <Box>
          <Table type="sales" />
        </Box>
      </Center>
    </Flex>
  );
}
