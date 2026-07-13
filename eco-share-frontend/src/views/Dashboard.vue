<template>

<div>

    <div class="d-flex justify-content-between align-items-center mb-4">

        <div>

            <h2 class="fw-bold">

                Dashboard

            </h2>

            <small class="text-muted">

                Selamat datang di EcoShare

            </small>

        </div>

    </div>

    <div class="row">

        <div class="col-lg-4 col-md-6 mb-4">

            <DashboardCard
                title="Total Items"
                :value="totalItems"
                icon="bi bi-box-seam-fill"
            />

        </div>

        <div class="col-lg-4 col-md-6 mb-4">

            <DashboardCard
                title="Role"
                :value="auth.role"
                icon="bi bi-person-badge-fill"
            />

        </div>

        <div class="col-lg-4 col-md-6 mb-4">

            <DashboardCard
                title="User"
                :value="auth.user?.name"
                icon="bi bi-person-fill"
            />

        </div>

    </div>

    <div class="card-custom p-4 mt-3">

        <h5 class="mb-3">

            Aktivitas

        </h5>

        <p class="text-muted mb-0">

            Selamat datang di sistem EcoShare.
            Gunakan menu di sebelah kiri untuk mengelola item,
            melakukan transaksi rental, melihat riwayat,
            dan mengatur profil akun.

        </p>

    </div>

</div>

</template>

<script setup>

import { ref,onMounted } from "vue"

import DashboardCard from "../components/DashboardCard.vue"

import itemService from "../services/itemService"

import { useAuthStore } from "../stores/auth"

const auth = useAuthStore()

const totalItems = ref(0)

const loadItems = async()=>{

    try{

        const res = await itemService.getAll()

        totalItems.value = res.data.data.length

    }catch(err){

        console.log(err)

    }

}

onMounted(loadItems)

</script>