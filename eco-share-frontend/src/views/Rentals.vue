<template>
  <div>

    <div class="d-flex justify-content-between align-items-center mb-4">
      <div>
        <h2 class="fw-bold">Rental Barang</h2>
        <small class="text-muted">
          Lakukan peminjaman barang EcoShare
        </small>
      </div>
    </div>

    <div class="card-custom p-4">

      <form @submit.prevent="submitRental">

        <div class="mb-3">
          <label class="form-label">Item</label>

          <select
            class="form-select"
            v-model="form.item_id"
            required
          >
            <option value="">Pilih Item</option>

            <option
              v-for="item in items"
              :key="item.id"
              :value="item.id"
            >
              {{ item.name }} (Stok : {{ item.stock }})
            </option>

          </select>
        </div>

        <div class="row">

          <div class="col-md-4 mb-3">

            <label>Jumlah</label>

            <input
              type="number"
              class="form-control"
              v-model="form.qty"
              min="1"
            >

          </div>

          <div class="col-md-4 mb-3">

            <label>Tanggal Mulai</label>

            <input
              type="date"
              class="form-control"
              v-model="form.start_date"
            >

          </div>

          <div class="col-md-4 mb-3">

            <label>Tanggal Selesai</label>

            <input
              type="date"
              class="form-control"
              v-model="form.end_date"
            >

          </div>

        </div>

        <button
          class="btn btn-purple"
          type="submit"
        >
          <i class="bi bi-cart-check me-2"></i>
          Pinjam Barang
        </button>

      </form>

    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

import itemService from "../services/itemService";
import rentalService from "../services/rentalService";

const items = ref([]);

const form = ref({
  item_id: "",
  qty: 1,
  start_date: "",
  end_date: ""
});

const loadItems = async () => {
  try {
    const res = await itemService.getAll();
    items.value = res.data.data;
  } catch (err) {
    console.log(err);
  }
};

const submitRental = async () => {
  try {

    await rentalService.create(form.value);

    alert("Rental berhasil dibuat.");

    form.value = {
      item_id: "",
      qty: 1,
      start_date: "",
      end_date: ""
    };

  } catch (err) {

    alert(err.response?.data?.message || "Rental gagal.");

  }
};

onMounted(loadItems);
</script>