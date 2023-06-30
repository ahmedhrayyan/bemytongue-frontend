import { Box, Text } from "@chakra-ui/react";
import { ChatMessageItem } from "../contexts/ChatContext";
import AudioPlayer from "./AudioPlayer";
import useChat from "../hooks/useChat";

interface ChatMessageProps {
  message: ChatMessageItem;
  shouldAutoPlay?: boolean;
  onLoadedMetadata?: () => void;
}
export default function ChatMessage({
  message: { id, content, type, isMine },
  shouldAutoPlay,
  onLoadedMetadata,
}: ChatMessageProps) {
  const { latestVideoId } = useChat();

  return (
    <Box
      minW="8rem"
      maxW="70%"
      px={{ base: 2.5, md: 3 }}
      py={{ base: 1, md: 2 }}
      bgColor={isMine ? "teal.500" : "gray.100"}
      color={isMine ? "white" : "chakra-body-text"}
      borderRadius="lg"
      borderBottomStartRadius={isMine ? 0 : undefined}
      borderTopEndRadius={!isMine ? 0 : undefined}
      alignSelf={isMine ? "flex-start" : "flex-end"}
    >
      {type === "text" && <Text>{content as string}</Text>}
      {type === "audio" && <AudioPlayer audio={content} />}
      {type === "video" && (
        <Box
          as="video"
          borderRadius="lg"
          src={content as string}
          autoPlay={shouldAutoPlay}
          onLoadedMetadata={latestVideoId === id ? onLoadedMetadata : undefined}
          controls
        />
      )}
    </Box>
  );
}
