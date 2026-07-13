import api from "../api/api";

export default {

    getAll() {
        return api.get("/api/items");
    },

    getById(id) {
        return api.get(`/api/items/${id}`);
    },


    create(data) {
        return api.post("/api/items", data);
    },


    update(id, data) {
        return api.put(`/api/items/${id}`, data);
    },


    delete(id) {
        return api.delete(`/api/items/${id}`);
    }

};