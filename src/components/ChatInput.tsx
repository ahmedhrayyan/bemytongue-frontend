import {
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { Mic, Send } from "./CustomIcons";
import useConfig from "../hooks/useConfig";

interface Props {
  onRecord: () => void;
}

export default function ChatInput({ onRecord }: Props) {
  const { language } = useConfig();
  return (
    <InputGroup size="lg" variant="flushed">
      <Input
        name="text"
        type="text"
        borderRadius="lg"
        fontSize="md"
        bgColor="gray.100"
        ps="4"
        pl="5rem"
        lang={language}
      />
      <InputRightElement width="5rem">
        <IconButton
          onClick={onRecord}
          variant="link"
          aria-label="Attach file"
          icon={<Mic />}
          px="2.5"
          minW="auto"
        />
        <IconButton
          type="submit"
          variant="link"
          aria-label="Send message"
          icon={<Send />}
          px="2.5"
          minW="auto"
        />
      </InputRightElement>
    </InputGroup>
  );
}
