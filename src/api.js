import axios from "axios";

const api = axios.create({
    baseURL: "https://8oi9s0nnth.apigw.ntruss.com/corona19-masks/v1/"
  });

export const getMaskData = (lat, lng) => api.get(`storesByGeo/json?lat=${lat}&lng=${lng}&m=1000`);