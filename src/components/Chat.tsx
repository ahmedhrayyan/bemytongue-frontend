import { FormEvent, useState } from "react";
import { AspectRatio, Box, VStack } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { uniqueId } from "lodash-es";
import ChatInput from "./ChatInput";
import AudioRecorder from "./AudioRecorder";
import useChat from "../hooks/useChat";
import textSignApi from "../api/textSignApi";
import useConfig from "../hooks/useConfig";
import ChatMessage from "./ChatMessage";

export default function Chat() {
  const [showRecorder, setShowRecorder] = useState(false);
  const { language } = useConfig();
  const { messages, onMessageAdd } = useChat();
  function onSuccess({ url }: { url: string }) {
    onMessageAdd({
      id: uniqueId(),
      isMine: false,
      type: "video",
      content: url,
    });
  }

  const textToSignMutation = useMutation(textSignApi.textToSign, { onSuccess });
  const audioToSignMutation = useMutation(textSignApi.textToSign, {
    onSuccess,
  });

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const text = formData.get("text") as string;
    const id = uniqueId();
    onMessageAdd({
      id,
      isMine: true,
      type: "text",
      content: text,
    });
    textToSignMutation.mutate({ text, language });
  }

  function onRecordAvailable(file: File) {
    console.log(file);
  }

  return (
    <AspectRatio
      width="full"
      ratio={16 / 9}
      minH="54vh"
      border="1px solid"
      borderColor="gray.200"
      borderRadius="xl"
      shadow="lg"
      bgColor="gray.50"
    >
      <Box
        px="5"
        py="6"
        flexDirection="column"
        justifyContent="flex-end !important"
      >
        <VStack
          as="ul"
          w="full"
          textAlign="start"
          align="start"
          mb="3"
          flexGrow="1"
          sx={{
            overflowY: "auto",
            "&::-webkit-scrollbar": {
              display: "none",
            },
            "-ms-overflow-style": "none",
            scrollbarWidth: "none",
          }}
        >
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
        </VStack>
        <Box w="full">
          {!showRecorder && (
            <form onSubmit={onSubmit}>
              <ChatInput onRecord={() => setShowRecorder(true)} />
            </form>
          )}
          {showRecorder && <AudioRecorder onChange={onRecordAvailable} />}
        </Box>
      </Box>
    </AspectRatio>
  );
}
