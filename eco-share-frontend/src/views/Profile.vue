<template>
  <div>

    <div class="mb-4">

      <h2 class="fw-bold">Profile</h2>

      <small class="text-muted">
        Informasi akun
      </small>

    </div>

    <div class="card-custom p-4">

      <div class="row">

        <div class="col-md-6 mb-3">

          <label class="fw-semibold">
            Nama
          </label>

          <input
            class="form-control"
            :value="user.name"
            disabled
          >

        </div>

        <div class="col-md-6 mb-3">

          <label class="fw-semibold">
            Email
          </label>

          <input
            class="form-control"
            :value="user.email"
            disabled
          >

        </div>

        <div class="col-md-6">

          <label class="fw-semibold">
            Role
          </label>

          <input
            class="form-control"
            :value="user.role"
            disabled
          >

        </div>

      </div>

    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import profileService from "../services/profileService";

const user = ref({});

const loadProfile = async () => {

    try{

        const res = await profileService.getProfile();

        user.value = res.data.data;

    }catch(err){

        console.log(err);

    }

}

onMounted(loadProfile);
</script>