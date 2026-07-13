import api from "../api/api";

export default {

    getProfile() {
        return api.get("/api/profile");
    }

}