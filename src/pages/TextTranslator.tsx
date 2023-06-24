import { Container, Heading, Text } from "@chakra-ui/react";
import Page from "../components/Page";
import Chat from "../components/Chat";

export default function TextTranslator() {
  return (
    <Page docTitle="مترجم النصوص" py="12">
      <Container textAlign="center">
        <Heading as="h1" size="lg" mb="2.5">
          مترجم النصوص
        </Heading>
        <Text mb="6" lineHeight="7">
          اداة تساعد غير القادرين على التواصل بلغة الإشارة فهم الإشارات المختلفة
        </Text>
        <Chat />
      </Container>
    </Page>
  );
}
