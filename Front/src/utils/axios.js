import axios from "axios";
import { BACKEND_URL } from "./constants";

export const axiosInstance = axios.create({
	baseURL: BACKEND_URL,
});
