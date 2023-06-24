import {
  Box,
  Container,
  Flex,
  HStack,
  Link,
  Switch,
  Text,
} from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import useConfig from "../hooks/useConfig";

export default function Header() {
  const { language, onLangToggle } = useConfig();
  return (
    <Box as="header" bgColor="white" shadow="md" w="full" top="0">
      <Text
        display={{ base: "block", md: "none" }}
        fontFamily="heading"
        fontSize="2xl"
        fontWeight="bold"
        textAlign="center"
        py="2.5"
      >
        كن لساني
      </Text>
      <Container as={HStack} justify="space-between">
        <Flex gap="6" align="center">
          <Text
            display={{ base: "none", md: "block" }}
            fontFamily="heading"
            fontSize="xl"
            fontWeight="bold"
          >
            كن لساني
          </Text>
          <Flex
            as="nav"
            sx={{
              ".chakra-link": {
                display: "inline-flex",
                alignItems: "center",
                py: 6,
                px: { base: 2, sm: 2.5 },
                fontSize: { base: "sm", sm: "md" },
                color: "gray.600",
                transitionProperty: "colors",
                transitionDuration: "fast",
                _hover: { textDecor: "none", color: "chakra-body-text" },
              },
              // active style
              ".chakra-link.active": {
                fontWeight: "semibold",
                color: "chakra-body-text",
                position: "relative",
                bgColor: "#e6fffa85",
                _after: {
                  content: `""`,
                  position: "absolute",
                  left: 0,
                  top: 0,
                  width: "full",
                  height: "3px",
                  bgColor: "teal.500",
                },
              },
            }}
          >
            <Link as={NavLink} to="/">
              مترجم الإشارات
            </Link>
            <Link as={NavLink} to="/text-translator">
              مترجم النصوص
            </Link>
          </Flex>
        </Flex>
        <HStack>
          <Text fontSize="sm" color="gray.600">
            عربي
          </Text>
          <Switch
            isChecked={language === "ar"}
            onChange={onLangToggle}
            sx={{
              ".chakra-switch__track": {
                "--switch-bg": "var(--chakra-colors-teal-500)",
              },
            }}
          />
          <Text fontSize="sm" color="gray.600">
            انجليزي
          </Text>
        </HStack>
      </Container>
    </Box>
  );
}
