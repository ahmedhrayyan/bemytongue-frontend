import "./styles/index.css";
import io from "socket.io-client";
import { useEffect, useRef } from "react";

function App() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const socket = io("http://localhost:5000/");
    socket.on("prediction", (data) => {
      console.log(data);
    });

    const video = videoRef.current as HTMLVideoElement;
    let intervalId: number;
    navigator.mediaDevices
      .getUserMedia({
        audio: false,
        video: {
          width: { min: 640, ideal: 1280, max: 1920 },
          height: { min: 480, ideal: 720, max: 1080 },
        },
      })
      .then(async (stream) => {
        video.srcObject = stream;
        await video.play();
        const canvas = document.createElement("canvas");
        canvas.width = 256;
        canvas.height = 256;
        const ctx = canvas.getContext("2d");
        intervalId = window.setInterval(() => {
          ctx?.drawImage(
            video,
            0,
            0,
            video.videoWidth,
            video.videoHeight,
            0,
            0,
            256,
            256
          );
          canvas.toBlob((blob) => {
            if (blob) socket.emit("frame", blob);
          }, "image/webp");
        }, 1000 / 8);
      })
      .catch((err) => console.error(err));

    return () => {
      clearInterval(intervalId);
      socket.close();
    };
  }, []);

  return (
    <div>
      <div className="container mx-auto">
        <h1 className="mt-14 font-bold text-4xl text-center">كن لساني</h1>
        <video ref={videoRef} className="h-full w-full scale-x-[-1]" />
      </div>
    </div>
  );
}

export default App;
