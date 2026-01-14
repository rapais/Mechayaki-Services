import axios from "axios";

export const api = axios.create({
    baseURL: "http://localhost:8080",
    timeout: 15000,
});

export async function unwrap(res) {
    return res.data;
}