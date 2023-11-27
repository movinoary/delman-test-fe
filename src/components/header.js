import { Flex, Heading, Text } from "@chakra-ui/react";
import React from "react";

const style = {
  row: {
    direction: "column",
    padding: "1rem",
    borderBottom: "1px",
    borderColor: "gray.200",
    height: "90px",
    width: "100%",
  },
  title: {
    as: "h2",
    size: "lg",
    fontWeight: "500",
    color: "black",
    cursor: "default",
  },
  subTitle: {
    fontSize: "md",
    fontWeight: "500",
    color: "blue.500",
    cursor: "default",
  },
};

export default function Header({ title, subTitle }) {
  return (
    <Flex {...style.row}>
      <Heading {...style.title}>{title}</Heading>
      <Text {...style.subTitle}>{subTitle}</Text>
    </Flex>
  );
}
