import axios from "axios";

const apiClient = axios.create({
    baseURL: "https://api-wedding-bintang.baharihari.com",
    withCredentials: false,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    },
})


export default apiClient;