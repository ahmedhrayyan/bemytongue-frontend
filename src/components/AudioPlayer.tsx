import { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";
import { Box, IconButton, Text } from "@chakra-ui/react";
import { Pause, Play } from "./CustomIcons";
import { formatSecondsDuration } from "../utils/date";

export default function AudioPlayer({ audio }: { audio: File | string }) {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [duration, setDuration] = useState<number>(0);
  const [timeElapsed, setTimeElapsed] = useState<number>(0);
  const wavesurferRef = useRef<WaveSurfer>();
  const waveContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    wavesurferRef.current = WaveSurfer.create({
      container: waveContainerRef.current as HTMLElement,
      waveColor: "#D4D4D4",
      progressColor: "#2E653C",
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
    <>
      <IconButton
        aria-label={isPlaying ? "Pause" : "Play"}
        icon={isPlaying ? <Pause /> : <Play />}
        onClick={() => wavesurferRef.current?.playPause()}
        colorScheme="secondary"
      />
      <Box flexGrow="1" ref={waveContainerRef} />
      <Text color="gray.500" pe="1.5" fontWeight="bold" fontSize="sm">
        <Text as="span" color="chakra-body-text">
          {formatSecondsDuration(timeElapsed)}
        </Text>
        &nbsp;/&nbsp;
        {formatSecondsDuration(duration)}
      </Text>
    </>
  );
}
