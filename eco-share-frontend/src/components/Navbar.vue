<template>
  <div class="navbar-custom d-flex justify-content-between align-items-center">

    <div>
      <h5 class="mb-0">
        Selamat Datang 👋
      </h5>

      <small class="text-muted">
        EcoShare Management System
      </small>
    </div>

    <div class="d-flex align-items-center">

      <div class="text-end me-3">

        <strong>
          {{ auth.user?.name || "User" }}
        </strong>

        <br>

        <small class="text-purple">
          {{ auth.role }}
        </small>

      </div>

      <div
        class="rounded-circle bg-light d-flex justify-content-center align-items-center"
        style="width:45px;height:45px;"
      >
        <i class="bi bi-person-fill"></i>
      </div>

    </div>

  </div>
</template>

<script setup>
import { useAuthStore } from "../stores/auth";

const auth = useAuthStore();
</script>