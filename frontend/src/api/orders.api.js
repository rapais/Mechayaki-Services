import axios from "axios";

const http = axios.create({
  baseURL: "http://localhost:8080/api",
});

export const ordersApi = {
  create(payload) {
    return http.post("/orders", payload).then((r) => r.data);
  },
  list() {
    return http.get("/orders").then((r) => r.data);
  },
  updateStatus(id, status) {
    return http.patch(`/orders/${id}/status`, { status }).then((r) => r.data);
  },
};
