import { api, unwrap } from "./axios";

export const stallsApi = {
  list: () => api.get("/api/stalls").then(unwrap),
  create: (payload) => api.post("/api/stalls", payload).then(unwrap),
  update: (id, payload) => api.put(`/api/stalls/${id}`, payload).then(unwrap),
  toggle: (id) => api.patch(`/api/stalls/${id}/toggle`).then(unwrap),
  remove: (id) => api.delete(`/api/stalls/${id}`).then(unwrap),
};
