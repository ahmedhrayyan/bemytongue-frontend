import axiosInstance from ".";

const textToSign = (data: {
  id: string;
  text: string;
  language: "ar" | "en";
}) => {
  return axiosInstance.post<null, { url: string }>("/text-to-sign", data);
};

const audioToSign = (data: {
  id: string;
  audio: File | Blob;
  language: "ar" | "en";
}) => {
  const formData = new FormData();
  formData.append("audio", data.audio);
  formData.append("language", data.language);
  return axiosInstance.post<null, { url: string }>("/audio-to-sign", formData);
};

const textSignApi = {
  textToSign,
  audioToSign,
};

export default textSignApi;
