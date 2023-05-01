import axios from "axios";
const instance = axios.create({
  baseURL: "https://aviation-blog.vercel.app",
});
export default instance;
