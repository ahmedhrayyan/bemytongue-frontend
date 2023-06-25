import { Box, Button, HStack } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import useConfig from "../hooks/useConfig.ts";
import rtcApi from "../api/rtcApi.ts";

export default function SignDetectionSession() {
  const { language } = useConfig();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const pcRef = useRef<RTCPeerConnection | null>(null);

  useEffect(() => {
    stop();
  }, [language]);

  function createPeerConnection() {
    const pc = new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }], // Google's public STUN server
    });

    pc.addEventListener("connectionstatechange", () => {
      if (pc.connectionState === "failed") {
        stop();
        alert("Connection failed, please try again later.");
      }
    });

    // handle incoming video track
    pc.addEventListener("track", (event) => {
      if (event.track.kind === "video" && videoRef.current) {
        videoRef.current.style.display = "block";
        videoRef.current.srcObject = event.streams[0];
      }
    });

    return pc;
  }

  async function negotiate() {
    if (!pcRef.current) return;

    const offer = await pcRef.current.createOffer();
    await pcRef.current.setLocalDescription(offer);

    const answer = await rtcApi.submitOffer({ offer, language });
    await pcRef.current.setRemoteDescription(answer);
  }

  function stop() {
    setIsPlaying(false);
    if (videoRef.current) videoRef.current.style.display = "none";

    // close transceivers
    pcRef.current
      ?.getTransceivers()
      .forEach((transceiver) => transceiver.stop());

    // close local audio / video
    pcRef.current?.getSenders().forEach((sender) => sender.track?.stop());
    // close peer connection
    pcRef.current?.close();
    pcRef.current = null;
  }

  async function start() {
    setIsPlaying(true);
    setIsLoading(true);
    try {
      pcRef.current = await createPeerConnection();
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 720, height: 1280, frameRate: 15 },
      });
      stream
        .getTracks()
        .forEach((track) => pcRef.current?.addTrack(track, stream));
      await negotiate();
    } catch (err) {
      stop();
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Box>
      <HStack justify="center">
        <Button onClick={start} isDisabled={isPlaying} isLoading={isLoading}>
          جلسة جديدة
        </Button>
        <Button
          onClick={stop}
          isDisabled={!isPlaying || isLoading}
          colorScheme="red"
        >
          إنهاء الجلسة
        </Button>
      </HStack>
      <Box
        as="video"
        ref={videoRef}
        w="full"
        h="full"
        display="none"
        mt="6"
        borderRadius="lg"
        autoPlay
        playsInline
      />
    </Box>
  );
}
