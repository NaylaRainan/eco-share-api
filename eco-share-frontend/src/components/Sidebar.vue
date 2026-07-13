<template>
  <div class="sidebar d-flex flex-column">

    <!-- Logo -->
    <div class="p-4 border-bottom">
      <h3 class="logo mb-0">
        <i class="bi bi-recycle me-2"></i>
        EcoShare
      </h3>
    </div>

    <!-- Menu -->
    <div class="flex-grow-1 p-3">

      <RouterLink
        to="/dashboard"
        class="menu-item"
        active-class="active-link"
      >
        <i class="bi bi-house-door-fill me-2"></i>
        Dashboard
      </RouterLink>

      <RouterLink
        to="/items"
        class="menu-item"
        active-class="active-link"
      >
        <i class="bi bi-box-seam me-2"></i>
        Items
      </RouterLink>

      <RouterLink
        to="/rentals"
        class="menu-item"
        active-class="active-link"
      >
        <i class="bi bi-cart-fill me-2"></i>
        Rentals
      </RouterLink>

      <RouterLink
        to="/history"
        class="menu-item"
        active-class="active-link"
      >
        <i class="bi bi-clock-history me-2"></i>
        History
      </RouterLink>

      <RouterLink
        to="/profile"
        class="menu-item"
        active-class="active-link"
      >
        <i class="bi bi-person-circle me-2"></i>
        Profile
      </RouterLink>

    </div>

    <!-- Logout -->
    <div class="p-3 border-top">

      <button
        class="btn btn-purple w-100"
        @click="logout"
      >
        <i class="bi bi-box-arrow-right me-2"></i>
        Logout
      </button>

    </div>

  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/auth";

const router = useRouter();
const auth = useAuthStore();

const logout = () => {
  auth.logout();
  router.push("/");
};
</script>