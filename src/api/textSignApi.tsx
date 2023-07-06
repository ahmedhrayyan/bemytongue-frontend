import axiosInstance from ".";

const textToSign = (data: {
  id: string;
  language: "ar" | "en";
  text: string;
}) => {
  return axiosInstance.post<null, { path: string }>("/api/text-to-sign", data);
};

const audioToSign = (data: {
  id: string;
  language: "ar" | "en";
  audio: File | Blob;
}) => {
  const formData = new FormData();
  formData.append("language", data.language);
  formData.append("audio", data.audio);
  return axiosInstance.post<null, { path: string, text: string }>("/api/audio-to-sign", formData);
};

const textSignApi = {
  textToSign,
  audioToSign,
};

export default textSignApi;
