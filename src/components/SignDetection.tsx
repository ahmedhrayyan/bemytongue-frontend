import { Box, Button, HStack } from "@chakra-ui/react";
import { useRef, useState } from "react";
import axiosInstance from "../utils/axios.ts";

export default function SignDetection() {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const pcRef = useRef<RTCPeerConnection | null>(null);

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
        videoRef.current.srcObject = event.streams[0];
      }
    });

    return pc;
  }

  async function negotiate() {
    if (!pcRef.current) return;

    const offer = await pcRef.current.createOffer();
    await pcRef.current.setLocalDescription(offer);

    const response = await axiosInstance.post<null, RTCSessionDescription>(
      "/offer",
      offer
    );
    await pcRef.current.setRemoteDescription(response);
  }

  function stop() {
    setIsPlaying(false);

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
    try {
      pcRef.current = await createPeerConnection();
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 1280, height: 720, frameRate: 15 },
      });
      stream
        .getTracks()
        .forEach((track) => pcRef.current?.addTrack(track, stream));
      await negotiate();
    } catch (err) {
      stop();
      console.error(err);
    }
  }

  return (
    <Box>
      <HStack justify="center">
        <Button onClick={start} isDisabled={isPlaying}>
          ابدأ
        </Button>
        <Button onClick={stop} isDisabled={!isPlaying} colorScheme="red">
          اوقف
        </Button>
      </HStack>
      <Box
        as="video"
        ref={videoRef}
        w="full"
        h="full"
        display={isPlaying ? "block" : "none"}
        autoPlay
        playsInline
      />
    </Box>
  );
}
