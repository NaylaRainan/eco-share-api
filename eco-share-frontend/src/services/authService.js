import api from "../api/api";

export default {

    login(data){

        return api.post("/api/auth/login",data);

    },

    register(data){

        return api.post("/api/auth/register",data);

    }

}