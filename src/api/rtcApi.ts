import axiosInstance from ".";

async function submitOffer(data: {
  offer: RTCSessionDescriptionInit;
  language?: string;
}) {
  return axiosInstance.post<null, RTCSessionDescription>("/api/offer", data);
}

const rtcApi = {
  submitOffer,
};

export default rtcApi;
