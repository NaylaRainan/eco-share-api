import api from "../api/api";

export default {

  create(data) {
    return api.post("/api/rentals", data);
  },

  getAll() {
    return api.get("/api/rentals");
  },

  getById(id) {
    return api.get(`/api/rentals/${id}`);
  },

  updateStatus(id, status) {
    return api.put(`/api/rentals/${id}/status`, {
      status
    });
  }

};