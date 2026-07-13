import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
    state: () => ({
        token: localStorage.getItem("token") || null,
        role: localStorage.getItem("role") || null,
        user: JSON.parse(localStorage.getItem("user")) || null,
    }),

    getters: {
        isLoggedIn: (state) => !!state.token,

        isOwner: (state) => state.role === "owner",

        isRenter: (state) => state.role === "renter",
    },

    actions: {
        login(user, token) {
            this.user = user;
            this.token = token;
            this.role = user.role;

            localStorage.setItem("token", token);
            localStorage.setItem("role", user.role);
            localStorage.setItem("user", JSON.stringify(user));
        },

        logout() {
            this.user = null;
            this.token = null;
            this.role = null;

            localStorage.removeItem("token");
            localStorage.removeItem("role");
            localStorage.removeItem("user");
        },
    },
});