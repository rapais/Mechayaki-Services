import axios from "axios";

const http = axios.create({
  baseURL: "http://localhost:8080/api",
});

export const healthApi = {
  get() {
    return http.get("/health").then((r) => r.data);
  },
};
