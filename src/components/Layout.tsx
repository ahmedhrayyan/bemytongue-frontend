import { Box, Container, Grid, Link, Text } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import Header from "./Header";

export default function Layout() {
  return (
    <Box>
      <Header />
      <Box
        as="main"
        minH={{ base: "calc(100vh - 121px)", md: "calc(100vh - 70px)" }}
      >
        <Outlet />
      </Box>
      <Box as="footer" textAlign="center" color="gray.500" fontSize="sm" py="4">
        <Container maxW="container.sm">
          <Text lineHeight="2" mb="2">
            جميع الحقوق محفوظة &copy; 2023
            <br />
            تم تطوير الموقع بواسطة
          </Text>
          <Grid
          dir="ltr"
            gridTemplateColumns="repeat(auto-fit, minmax(160px, 1fr))"
            gap="2"
            sx={{
              a: { color: "teal.500", fontSize: "md" },
            }}
          >
            <Link
              href="https://www.linkedin.com/in/ahmedhrayyan/"
              target="_blank"
            >
              Ahmed Hamed
            </Link>
            <Link
              href="https://www.linkedin.com/in/dina-ahmed-07b744201/"
              target="_blank"
            >
              Dina Ahmed
            </Link>
            <Link
              href="https://www.linkedin.com/in/hassan-ahmed-mahmoud-1a68b21a9/"
              target="_blank"
            >
              Hassan Ahmed
            </Link>
            <Link
              href="https://www.linkedin.com/in/marwan-hatem-472b5b195/"
              target="_blank"
            >
              Marwan Hatem
            </Link>
            <Link
              href="https://www.linkedin.com/in/khaled-serag-38b19a1a6/"
              target="_blank"
            >
              Khaled Serag
            </Link>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}
