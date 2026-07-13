<template>
  <div class="login-page">

    <div class="login-card">

      <div class="text-center mb-4">

        <i class="bi bi-recycle logo-icon"></i>

        <h2 class="logo mt-2">
          EcoShare
        </h2>

        <p class="text-muted">
          Sustainable Sharing Platform
        </p>

      </div>

      <div class="row mb-4">

        <div class="col-6">

          <button
            class="btn w-100"
            :class="!isRegister ? 'btn-purple' : 'btn-light'"
            @click="switchMode(false)"
          >
            Login
          </button>

        </div>

        <div class="col-6">

          <button
            class="btn w-100"
            :class="isRegister ? 'btn-purple' : 'btn-light'"
            @click="switchMode(true)"
          >
            Register
          </button>

        </div>

      </div>

      <div
        v-if="message"
        class="alert"
        :class="success ? 'alert-success' : 'alert-danger'"
      >
        {{ message }}
      </div>

      <form @submit.prevent="submitForm">

        <div
          class="mb-3"
          v-if="isRegister"
        >

          <label class="form-label">

            Nama

          </label>

          <input
            class="form-control"
            v-model="form.name"
            type="text"
            required
          >

        </div>

        <div class="mb-3">

          <label class="form-label">

            Email

          </label>

          <input
            class="form-control"
            v-model="form.email"
            type="email"
            required
          >

        </div>

        <div class="mb-4">

          <label class="form-label">

            Password

          </label>

          <input
            class="form-control"
            v-model="form.password"
            type="password"
            required
          >

        </div>

        <div
          class="mb-4"
          v-if="isRegister"
        >

          <label class="form-label d-block">

            Role

          </label>

          <div class="form-check">

            <input
              class="form-check-input"
              type="radio"
              value="owner"
              v-model="form.role"
            >

            <label class="form-check-label">

              Owner

            </label>

          </div>

          <div class="form-check">

            <input
              class="form-check-input"
              type="radio"
              value="renter"
              v-model="form.role"
            >

            <label class="form-check-label">

              Renter

            </label>

          </div>

        </div>

        <button
          class="btn btn-purple w-100"
          :disabled="loading"
        >

          <span
            v-if="loading"
            class="spinner-border spinner-border-sm me-2"
          ></span>

          {{ isRegister ? 'Register' : 'Login' }}

        </button>

      </form>

      <div class="text-center mt-4">

        <small>

          {{ isRegister ? 'Sudah punya akun?' : 'Belum punya akun?' }}

          <a
            href="#"
            class="text-purple fw-semibold"
            @click.prevent="switchMode(!isRegister)"
          >

            {{ isRegister ? 'Login' : 'Daftar sekarang' }}

          </a>

        </small>

      </div>

    </div>

  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/auth";
import authService from "../services/authService";

const router = useRouter();
const auth = useAuthStore();

const isRegister = ref(false);
const loading = ref(false);
const success = ref(false);
const message = ref("");

const form = ref({
  name: "",
  email: "",
  password: "",
  role: "renter",
});

const resetForm = () => {
  form.value = {
    name: "",
    email: "",
    password: "",
    role: "renter",
  };
};

const switchMode = (mode) => {
  isRegister.value = mode;
  message.value = "";
  resetForm();
};

const submitForm = async () => {
  loading.value = true;
  message.value = "";

  try {
    if (isRegister.value) {
      const response = await authService.register(form.value);

      success.value = true;
      message.value = response.data.message;

      switchMode(false);

      return;
    }

    const response = await authService.login({
      email: form.value.email,
      password: form.value.password,
    });

    auth.login(
      response.data.user,
      response.data.token
    );

    success.value = true;
    message.value = response.data.message;

    router.push("/dashboard");

  } catch (error) {

    success.value = false;

    if (error.response) {
      message.value =
        error.response.data.message || "Terjadi kesalahan.";
    } else {
      message.value = "Tidak dapat terhubung ke server.";
    }

  } finally {

    loading.value = false;

  }
};
</script>