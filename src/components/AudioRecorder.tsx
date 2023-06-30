import {
  Box,
  chakra,
  HStack,
  IconButton,
  shouldForwardProp,
  Text,
} from "@chakra-ui/react";
import { isValidMotionProp, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { formatSecondsDuration } from "../utils/date";
import { Send, Trash } from "./CustomIcons";

const ChakraBox = chakra(motion.div, {
  /**
   * Allow motion props and non-Chakra props to be forwarded.
   */
  shouldForwardProp: (prop) =>
    isValidMotionProp(prop) || shouldForwardProp(prop),
});

async function createMediaRecorder() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: false,
    });
    return new MediaRecorder(stream, { mimeType: "audio/webm" });
  } catch (err: any) {
    alert(err.message);
    return null;
  }
}

interface Props {
  onChange: (file: File) => void;
  onDelete: () => void;
  maxDuration?: number; // in seconds
}

export default function AudioRecorder({
  onChange,
  onDelete,
  maxDuration = 1 * 60,
}: Props) {
  const mediaRecorderRef = useRef<MediaRecorder>();
  const ignoreRecording = useRef<boolean>();
  const [isRecording, setIsRecording] = useState(false);
  const [duration, setDuration] = useState<number>(0);

  async function startRecording() {
    const mediaRecorder = await createMediaRecorder();
    if (mediaRecorder) {
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.start();
      setIsRecording(true);

      // manages state and duration
      let durationInterval: number;
      mediaRecorder.addEventListener("start", () => {
        // set the interval to update the duration every second
        durationInterval = setInterval(() => {
          setDuration((prev) => {
            const newDuration = prev + 1;
            if (newDuration >= maxDuration) stopRecording();
            return newDuration;
          });
        }, 1000);
      });
      const audioChunks: Blob[] = [];
      mediaRecorder.addEventListener("dataavailable", (event) => {
        if (typeof event.data === "undefined") return;
        if (event.data.size === 0) return;
        audioChunks.push(event.data);
      });
      mediaRecorder.addEventListener("stop", () => {
        clearInterval(durationInterval); // stop updating the duration
        if (ignoreRecording.current) ignoreRecording.current = false; // reset
        else {
          // create the recording file and upload it
          const audioBlob = new Blob(audioChunks, {
            type: "audio/webm",
          });
          const file = new File([audioBlob], "audio.webm");
          onChange(file);
          setIsRecording(false);
        }
      });
    }
  }

  useEffect(() => {
    // start recording on mount
    startRecording();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  function stopRecording() {
    mediaRecorderRef.current?.stop();
    mediaRecorderRef.current?.stream
      .getAudioTracks()
      .forEach((track) => track.stop());
  }

  return (
    <Box>
      <HStack
        dir="ltr"
        px="4"
        py="3"
        borderRadius="lg"
        bgColor="gray.100"
        borderBottom="1px solid"
        borderColor="gray.200"
      >
        <IconButton
          aria-label="Stop recording"
          icon={<Send />}
          onClick={stopRecording}
          variant="link"
          minW="auto"
          px="2.5"
        />
        <IconButton
          aria-label="Delete recording"
          colorScheme="red"
          icon={
            <ChakraBox
              lineHeight="0"
              animate={{
                opacity: [1, 0.25, 1],
              }}
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              transition={{
                duration: 2,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "loop",
              }}
            >
              <Trash />
            </ChakraBox>
          }
          onClick={() => {
            ignoreRecording.current = true;
            onDelete();
            stopRecording();
          }}
          variant="link"
          minW="auto"
          px="2.5"
        />
        <Box flexGrow="1" />
        <Text color="gray.500" pe="1.5" fontWeight="bold" fontSize="sm">
          <Text as="span" color="chakra-body-text">
            {formatSecondsDuration(duration)}
          </Text>
          &nbsp;/&nbsp;{formatSecondsDuration(maxDuration)}
        </Text>
      </HStack>
    </Box>
  );
}
