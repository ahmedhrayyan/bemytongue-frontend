import { Box, Text } from "@chakra-ui/react";
import { FormEvent } from "react";
import { ChatMessageItem } from "../contexts/ChatContext";
import useChat from "../hooks/useChat";
import AudioPlayer from "./AudioPlayer";

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
      minW="10rem"
      maxW={{ base: "92%", sm: "70%" }}
      px={{ base: 2.5, md: 3 }}
      py="2.5"
      bgColor={isMine ? "teal.500" : "gray.100"}
      color={isMine ? "white" : "chakra-body-text"}
      borderRadius="xl"
      borderBottomStartRadius={isMine ? 0 : undefined}
      borderTopEndRadius={!isMine ? 0 : undefined}
      alignSelf={isMine ? "flex-start" : "flex-end"}
    >
      {type === "text" && <Text>{content as string}</Text>}
      {type === "audio" && <AudioPlayer audio={content} />}
      {type === "video" && (
        <Box
          as="video"
          borderRadius="xl"
          src={content as string}
          autoPlay={shouldAutoPlay}
          onLoadedMetadata={latestVideoId === id ? onLoadedMetadata : undefined}
          controls
          controlsList="nodownload"
          onContextMenu={(evt: FormEvent) => {
            evt.preventDefault();
            return false;
          }}
        >
          <source src={content as string} type="video/mp4" />
        </Box>
      )}
    </Box>
  );
}
