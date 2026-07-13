import api from "../api/api";

export default {

    getAll() {
        return api.get("/api/history");
    }

}