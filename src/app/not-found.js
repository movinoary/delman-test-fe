"use client";
import React from "react";
import NextLink from "next/link";
import { Button, Center, Flex, Heading, Link } from "@chakra-ui/react";
import * as FcIcons from "react-icons/fc";

export default function NotFound() {
  return (
    <Center w="100%" h="100%">
      <Flex direction="column" alignItems="center" justifyContent="center">
        <FcIcons.FcCancel
          style={{
            fontSize: "8rem",
          }}
        />
        <Heading as="h1" size="xl" cursor="default">
          Your page is not found
        </Heading>
        <Button mt="1rem" color="white" bgColor="blue.300">
          <Link as={NextLink} href="/">
            Back Home
          </Link>
        </Button>
      </Flex>
    </Center>
  );
}
