import { Container, Heading, Text } from "@chakra-ui/react";
import Page from "../components/Page";
import Chat from "../components/Chat";
import useConfig from "../hooks/useConfig";

const languages = {
  ar: "العربية",
  en: "الإنجليزية",
};
export default function TextTranslator() {
  const { language } = useConfig();
  return (
    <Page docTitle="مترجم النصوص" py="12">
      <Container textAlign="center">
        <Heading as="h1" size="lg" mb="2.5">
          مترجم النصوص
        </Heading>
        <Text mb="6" lineHeight="7">
          اداة تساعد غير القادرين على التواصل باللغة{" "}
          <strong>{languages[language]}</strong> فهم النصوص المختلفة وترجمتها
          إلى لغة الإشارة
          <br />
          يمكنك تغيير اللغة اعلاه
        </Text>
        <Chat />
      </Container>
    </Page>
  );
}
