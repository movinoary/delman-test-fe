"use client";
// Module
import React from "react";
import NextLink from "next/link";
import { Flex, Heading, Link, Text } from "@chakra-ui/react";
import * as HiIcons from "react-icons/hi";
import * as MdIcons from "react-icons/md";
import { usePathname } from "next/navigation";

const menu = [
  {
    icon: <MdIcons.MdSpaceDashboard />,
    title: "dashboard",
    path: "/",
  },
  {
    icon: <HiIcons.HiUsers />,
    title: "users",
    path: "/users",
  },
  {
    icon: <HiIcons.HiUserAdd />,
    title: "registration",
    path: "/registration",
  },
  {
    icon: <HiIcons.HiSearch />,
    title: "search",
    path: "/search",
  },
];

const Menu = ({ type, styleMenu, styleIcon, textText, icon, text, path }) => {
  return type === "link" ? (
    <Link as={NextLink} href={path}>
      <Flex {...styleMenu}>
        <Text {...styleIcon}>{icon}</Text>
        <Heading {...textText}>{text}</Heading>
      </Flex>
    </Link>
  ) : (
    <Flex {...styleMenu}>
      <Text {...styleIcon}>{icon}</Text>
      <Text {...textText} cursor="default">
        {text}
      </Text>
    </Flex>
  );
};

const styles = {
  body: {
    direction: "column",
    width: "100vw",
    height: "100vh",
  },
  container: {
    width: "100vw",
    height: "100%",
  },
  containerLeft: {
    direction: "column",
    backgroundColor: "gray.200",
    width: "250px",
    height: "100%",
    gap: 1,
  },
  containerRight: {
    width: "100vw",
    height: "100%",
    overflow: "auto",
  },
  title: {
    as: "h5",
    size: "sm",
    padding: 3,
    borderBottom: "1px",
    borderColor: "gray.200",
  },
  menuActive: {
    alignItems: "center",
    gap: "10px",
    padding: "12px",
    backgroundColor: "gray.300",
    borderLeft: "2px",
    borderColor: "blue.300",
  },
  menuNonActive: {
    alignItems: "center",
    gap: "10px",
    padding: "12px",
    borderLeft: "2px",
    borderColor: "gray.300",
  },
  textActive: {
    fontSize: "md",
    fontWeight: "400",
    color: "blue.500",
    textTransform: "capitalize",
  },
  textNonActive: {
    fontSize: "md",
    fontWeight: "400",
    color: "black",
    textTransform: "capitalize",
  },
  iconActive: {
    fontSize: "xl",
    color: "blue.500",
  },
  iconNonActive: {
    fontSize: "xl",
    color: "black",
  },
};

export default function Sidebar({ children }) {
  const pathname = usePathname();

  return (
    <Flex {...styles.body}>
      <Heading {...styles.title}>delman.io</Heading>
      <Flex {...styles.container}>
        <Flex {...styles.containerLeft}>
          <Menu
            styleMenu={styles.menuNonActive}
            styleIcon={styles.iconNonActive}
            textText={styles.textNonActive}
            icon={<HiIcons.HiMenuAlt2 />}
            text="Menu"
          />
          {menu.map((item, index) => {
            const styleMenu =
              pathname === item.path ? styles.menuActive : styles.menuNonActive;
            const styleIcon =
              pathname === item.path ? styles.iconActive : styles.iconNonActive;
            const textText =
              pathname === item.path ? styles.textActive : styles.textNonActive;

            return (
              <Menu
                key={index}
                type="link"
                styleMenu={styleMenu}
                styleIcon={styleIcon}
                textText={textText}
                path={item.path}
                icon={item.icon}
                text={item.title}
              />
            );
          })}
        </Flex>
        <Flex {...styles.containerRight}>{children}</Flex>
      </Flex>
    </Flex>
  );
}
