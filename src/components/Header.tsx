import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  Container,
  Flex,
  HStack,
  Link,
  Switch,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useRef } from "react";
import { NavLink } from "react-router-dom";
import useConfig from "../hooks/useConfig";

export default function Header() {
  const { language, onLangToggle } = useConfig();
  const confirmModal = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement>(null);

  return (
    <Box as="header" bgColor="white" shadow="md" w="full" top="0">
      <Text
        display={{ base: "block", md: "none" }}
        fontFamily="heading"
        fontSize="2xl"
        fontWeight="bold"
        textAlign="center"
        py="3"
      >
        كن لساني
      </Text>
      <Container
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
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
                py: { base: 5, md: 6 },
                px: { base: 2, sm: 2.5 },
                fontSize: { base: "sm", sm: "md" },
                color: "gray.600",
                transitionProperty: "colors",
                transitionDuration: "fast",
                "-webkit-tap-highlight-color": "rgba(255, 255, 255, 0)",
                _hover: { textDecor: "none", color: "chakra-body-text" },
              },
              // active style
              ".chakra-link.active": {
                fontWeight: "semibold",
                color: "teal.600",
                position: "relative",
                bgColor: "#e6fffa75",
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
        <HStack spacing="1">
          <Text fontSize="sm" color="gray.600">
            عربي
          </Text>
          <Switch
            isChecked={language === "ar"}
            onChange={() => {
              if (language === "ar") onLangToggle();
              else confirmModal.onOpen();
            }}
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
      <AlertDialog
        isOpen={confirmModal.isOpen}
        leastDestructiveRef={cancelRef}
        onClose={confirmModal.onClose}
        motionPreset="slideInBottom"
      >
        <AlertDialogOverlay>
          <AlertDialogContent mx="2.5">
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              اختيار اللغة العربية
            </AlertDialogHeader>

            <AlertDialogBody>
              اللغة العربية مازالت تحت الطوير المستمر لذلك الكثير من المميزات
              ليست متاحة بعد
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button
                ref={cancelRef}
                colorScheme="red"
                onClick={confirmModal.onClose}
                me="3"
              >
                إلغاء
              </Button>
              <Button
                onClick={() => {
                  onLangToggle();
                  confirmModal.onClose();
                }}
              >
                اتفهم ذلك
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
}
