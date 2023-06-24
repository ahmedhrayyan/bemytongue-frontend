import { Box, BoxProps } from "@chakra-ui/react";
import { useEffect } from "react";

interface PageProps extends BoxProps {
  docTitle: string;
}
export default function Page({ docTitle, ...rest }: PageProps) {
  useEffect(() => {
    document.title = docTitle;
  }, [docTitle]);

  return <Box {...rest} />;
}
