import { AspectRatio, Box, Text } from "@chakra-ui/react";
import { ChatMessageItem } from "../contexts/ChatContext";
import AudioPlayer from "./AudioPlayer";

interface ChatMessageProps {
  message: ChatMessageItem;
}
export default function ChatMessage({
  message: { content, type, isMine },
}: ChatMessageProps) {
  return (
    <Box
      minW="8rem"
      maxW="60%"
      p="3"
      bgColor={isMine ? "teal.500" : "gray.100"}
      color="white"
      borderRadius="lg"
      borderBottomStartRadius={isMine ? 0 : undefined}
      borderTopEndRadius={!isMine ? 0 : undefined}
      alignSelf={isMine ? "flex-start" : "flex-end"}
    >
      {type === "text" && <Text>{content as string}</Text>}
      {type === "audio" && <AudioPlayer audio={content} />}
      {type === "video" && <Box as="video" borderRadius="lg" src={content as string} autoPlay controls />}
    </Box>
  );
}
