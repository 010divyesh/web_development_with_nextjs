import axios from "axios";

const baseURL = "https://crudapi.co.uk/api/v1";
const instance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
    "Authorization":"Bearer 3UGQBVFmyAnuZ9a-PNFD4Chq3uq8UK-iyE1d4dEiE5SxPtDcyw"
  },
});

export default instance;