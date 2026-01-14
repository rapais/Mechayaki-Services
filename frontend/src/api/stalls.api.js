import { api, unwrap } from "./axios";

export const stallsApi = {
    list: () => api.get("/api/stalls").then(unwrap),
};