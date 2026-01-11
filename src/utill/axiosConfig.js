import axios from "axios";
import { BASE_URL } from "./apiEndpoint";

const axiosConfig = axios.create({
    baseURL: BASE_URL,
    headers: {
        Accept: "application/json"
        // ❌ DO NOT set Content-Type globally
    }
});

// ✅ Public endpoints (NO TOKEN)
const excludeEndpoint = [
    "/login",
    "/register",
    "/activate",
    "/health",
    "/encode",
    "/email" // ✅ VERY IMPORTANT
];

// Request interceptor
axiosConfig.interceptors.request.use((config) => {
    const shouldSkipToken = excludeEndpoint.some(endpoint =>
        config.url?.includes(endpoint)
    );

    if (!shouldSkipToken) {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
    }

    return config;
}, error => Promise.reject(error));

// Response interceptor
axiosConfig.interceptors.response.use(
    response => response,
    error => {
        if (error.response?.status === 401) {
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);

export default axiosConfig;
