import axios from "axios";
import { BASE_URL } from "./apiEndpoint";

const axiosConfig = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
    }
});

const excludeEndpoint = ["/login", "/encode", "/health", "/activate", "/register"];

axiosConfig.interceptors.request.use((config) => {
    const shouldSkipToken = excludeEndpoint.some((endpoint) => config.url?.includes(endpoint));

    if (!shouldSkipToken) {
        const accessToken = localStorage.getItem("token");
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

// Response interceptor
axiosConfig.interceptors.response.use((response) => {
    return response;
}, (error) => {
    if (error.response) {
        if (error.response.status === 401) {
            window.location.href = "/login";
        } else if (error.response.status === 500) {
            console.error("Server error ....");
        }
    } else if (error.code === "ECONNATONABORTED") {
        console.error("Request timeout..");
    }
    return Promise.reject(error);
});

export default axiosConfig;
