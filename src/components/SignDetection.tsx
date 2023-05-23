import { useRef, useState } from "react";
import * as classNames from "classnames";
import axiosInstance from "../utils/axios.ts";

export default function SignDetection() {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const pcRef = useRef<RTCPeerConnection | null>(null);

  function createPeerConnection() {
    const pc = new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }], // Google's public STUN server
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
        video: {
          width: { min: 640, ideal: 1280, max: 1920 },
          height: { min: 480, ideal: 720, max: 1080 },
        },
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
    <div className="container mx-auto py-10">
      <h1 className="font-bold text-4xl text-center mb-5">كن لساني</h1>
      <div className="flex justify-center gap-1 mb-10">
        <button className="btn btn-sky" disabled={isPlaying} onClick={start}>
          ابدأ
        </button>
        <button className="btn btn-rose" disabled={!isPlaying} onClick={stop}>
          أوقف
        </button>
      </div>
      <video
        ref={videoRef}
        className={classNames("h-full w-full", { hidden: !isPlaying })}
        autoPlay
        playsInline
      />
    </div>
  );
}
