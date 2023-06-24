import axiosInstance from ".";

async function submitOffer(offer: RTCSessionDescriptionInit) {
  return axiosInstance.post<null, RTCSessionDescription>("/offer", offer);
}

const rtcApi = {
  submitOffer,
}

export default rtcApi;
