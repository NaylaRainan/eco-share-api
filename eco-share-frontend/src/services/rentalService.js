import api from "../api/api";

export default {

    create(data){
        return api.post("/api/rentals", data);
    }

}