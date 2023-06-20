import { Box, Container, Heading } from "@chakra-ui/react";
import SignDetection from "./components/SignDetection.tsx";

function App() {
  return (
    <Box py="12">
      <Container>
        <Heading variant="h3" as="h1" textAlign="center" mb="8">
          كن لساني
        </Heading>
        <SignDetection />
      </Container>
    </Box>
  );
}

export default App;
