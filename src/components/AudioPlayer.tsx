import { Box, HStack, IconButton, Text } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";
import { formatSecondsDuration } from "../utils/date";
import { Pause, Play } from "./CustomIcons";

export default function AudioPlayer({ audio }: { audio: File | string }) {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [duration, setDuration] = useState<number>(0);
  const [timeElapsed, setTimeElapsed] = useState<number>(0);
  const wavesurferRef = useRef<WaveSurfer>();
  const waveContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    wavesurferRef.current = WaveSurfer.create({
      container: waveContainerRef.current as HTMLElement,
      waveColor: "#D4D4D8",
      progressColor: "#F4F4F5",
      cursorColor: "#F2A431",
      barWidth: 2,
      barRadius: 1,
      barGap: 1.5,
      height: 28,
      responsive: true,
      normalize: true,
      cursorWidth: 3,
      hideScrollbar: true,
    });
    typeof audio === "string"
      ? wavesurferRef.current.load(audio)
      : wavesurferRef.current.loadBlob(audio);
    wavesurferRef.current?.on("ready", () => {
      const duration = Math.floor(wavesurferRef.current?.getDuration() || 0);
      setDuration(duration);
    });

    // manage play/pause and time elapsed
    let interval: number;
    wavesurferRef.current?.on("pause", () => {
      setIsPlaying(false);
      clearInterval(interval);
    });
    wavesurferRef.current?.on("play", () => {
      if (timeElapsed >= duration) setTimeElapsed(0);
      setIsPlaying(true);
      interval = setInterval(() => {
        setTimeElapsed((prev) => prev + 1);
      }, 1000);
    });

    // clean up
    return () => wavesurferRef.current?.destroy();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <HStack flexDir="row-reverse" minW={{base: "15rem", sm:"20rem"}}>
      <IconButton
        aria-label={isPlaying ? "Pause" : "Play"}
        me="-1"
        icon={isPlaying ? <Pause /> : <Play />}
        onClick={() => wavesurferRef.current?.playPause()}
        colorScheme="secondary"
      />
      <Box flexGrow="1" ref={waveContainerRef} />
      <Text color="gray.100" pe="1.5" fontWeight="bold" fontSize="sm">
        {formatSecondsDuration(duration)}
        &nbsp;/&nbsp;
        <Text as="span" color="gray.200">
          {formatSecondsDuration(timeElapsed)}
        </Text>
      </Text>
    </HStack>
  );
}
