import { Container, Heading, Text } from "@chakra-ui/react";
import Page from "../components/Page";
import SignDetectionSession from "../components/SignDetectionSession";
import useConfig from "../hooks/useConfig";

const languages = {
  ar: "العربية",
  en: "الإنجليزية",
};
export default function SignDetection() {
  const { language } = useConfig();
  return (
    <Page docTitle="مترجم الإشارات" py="12">
      <Container textAlign="center">
        <Heading as="h1" size="lg" mb="2.5">
          مترجم الإشارات
        </Heading>
        <Text mb="6" lineHeight="7">
          اداة تساعد غير القادرين على التواصل بلغة الإشارة فهم الإشارات المختلفة
          وترجمتها إلى اللغة <strong>{languages[language]}</strong>.
          <br />
          يمكنك تغيير اللغة اعلاه مع ملاحظة ان ذلك سيؤدي إلى اغلاق الجلسة
          الحالية.
        </Text>
      </Container>
      <Container maxW="container.md">
        <SignDetectionSession />
      </Container>
    </Page>
  );
}
