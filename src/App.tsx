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
      .getUserMedia({ video: true })
      .then(async (stream) => {
        video.srcObject = stream;
        await video.play();
        const canvas = document.createElement("canvas");
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext("2d");
        intervalId = window.setInterval(() => {
          ctx?.drawImage(video, 0, 0, canvas.width, canvas.height);
          canvas.toBlob((blob) => {
            if (blob) socket.emit("frame", blob);
          });
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
