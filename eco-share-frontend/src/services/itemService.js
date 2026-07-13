import api from "../api/api";

export default {

    getAll() {
        return api.get("/api/items");
    },

    create(data) {
        return api.post("/api/items", data);
    }

};