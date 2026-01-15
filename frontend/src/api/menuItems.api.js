import axios from "axios";

const http = axios.create({
  baseURL: "http://localhost:8080/api",
});

export const menuItemsApi = {
  list(activeOnly = true) {
    return http.get("/menu-items", { params: { activeOnly } }).then((r) => r.data);
  },
  create(payload) {
    return http.post("/menu-items", payload).then((r) => r.data);
  },
  update(id, payload) {
    return http.put(`/menu-items/${id}`, payload).then((r) => r.data);
  },
  remove(id) {
    return http.delete(`/menu-items/${id}`).then((r) => r.data);
  },
};
