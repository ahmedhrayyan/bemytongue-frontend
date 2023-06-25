import { AspectRatio, Box, HStack, IconButton, VStack } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { uniqueId } from "lodash-es";
import { FormEvent, useEffect, useRef, useState } from "react";
import { BeatLoader } from "react-spinners";
import textSignApi from "../api/textSignApi";
import useChat from "../hooks/useChat";
import useConfig from "../hooks/useConfig";
import AudioRecorder from "./AudioRecorder";
import ChatInput from "./ChatInput";
import ChatMessage from "./ChatMessage";
import { Trash } from "./CustomIcons";

export default function Chat() {
  const listRef = useRef<HTMLUListElement>(null);

  const [showRecorder, setShowRecorder] = useState(false);
  const { language } = useConfig();
  const { messages, onMessageAdd, onMessageDelete, onReset } = useChat();
  function onSuccess({ url }: { url: string }) {
    onMessageAdd({
      id: uniqueId(),
      isMine: false,
      type: "video",
      content: url,
    });
  }

  function onError(_: unknown, { id }: { id: string }) {
    onMessageDelete(id);
  }

  const textToSignMutation = useMutation(textSignApi.textToSign, {
    onSuccess,
    onError,
  });
  const audioToSignMutation = useMutation(textSignApi.audioToSign, {
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
    textToSignMutation.mutate({ id, text, language });
    e.currentTarget.reset();
  }

  function onRecordAvailable(audio: File) {
    setShowRecorder(false);
    const id = uniqueId();
    onMessageAdd({
      id,
      isMine: true,
      type: "audio",
      content: audio,
    });
    audioToSignMutation.mutate({ id, audio, language });
  }

  useEffect(() => {
    window.setTimeout(() => {
      listRef.current?.scrollTo({ top: listRef.current.scrollHeight });
    }, 50);
  }, [messages]);

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
          ref={listRef}
          as="ul"
          w="full"
          textAlign="start"
          align="start"
          mb="4"
          spacing="3"
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
          {(textToSignMutation.isLoading || audioToSignMutation.isLoading) && (
            <BeatLoader size="12" style={{ alignSelf: "flex-end" }} />
          )}
        </VStack>
        <Box w="full">
          {!showRecorder && (
            <form onSubmit={onSubmit}>
              <HStack align="stretch">
                <IconButton
                  aria-label="test"
                  minW="12"
                  h="auto"
                  icon={<Trash />}
                  onClick={onReset}
                />
                <ChatInput onRecord={() => setShowRecorder(true)} />
              </HStack>
            </form>
          )}
          {showRecorder && (
            <AudioRecorder
              onChange={onRecordAvailable}
              onDelete={() => {
                setShowRecorder(false);
              }}
            />
          )}
        </Box>
      </Box>
    </AspectRatio>
  );
}
