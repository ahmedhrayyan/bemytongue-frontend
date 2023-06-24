import {
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { Mic, Send } from "./CustomIcons";

interface Props {
  onRecord: () => void;
}

export default function ChatInput({onRecord}: Props) {
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
