import axiosInstance from ".";

const textToSign = (data: { text: string; language: "ar" | "en" }) => {
  return axiosInstance.post<null, { url: string }>("/text-to-sign", data);
};

const audioToSign = (data: { audio: File; language: "ar" | "en" }) => {
  const formData = new FormData();
  formData.append("audio", data.audio);
  formData.append("language", data.language);
  return axiosInstance.post<null, { url: string }>("/text-to-sign", formData);
};

const textSignApi = {
  textToSign,
  audioToSign,
};

export default textSignApi;