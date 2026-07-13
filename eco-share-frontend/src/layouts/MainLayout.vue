<template>
  <div class="layout">

    <!-- Sidebar -->
    <Sidebar />

    <!-- Main Content -->
    <div class="main-content">

      <!-- Navbar -->
      <Navbar />

      <!-- Isi Halaman -->
      <div class="page">
        <router-view />
      </div>

    </div>

  </div>
</template>

<script setup>
import Sidebar from "../components/Sidebar.vue";
import Navbar from "../components/Navbar.vue";
</script>