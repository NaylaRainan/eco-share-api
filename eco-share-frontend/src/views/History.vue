<template>
  <div>

    <div class="mb-4">
      <h2 class="fw-bold">Riwayat Rental</h2>
      <small class="text-muted">
        Riwayat transaksi EcoShare
      </small>
    </div>

    <div class="card-custom p-4">

      <table class="table table-hover align-middle">

        <thead>
          <tr>
            <th>No</th>
            <th>Rental ID</th>
            <th>Catatan</th>
          </tr>
        </thead>

        <tbody>

          <tr
            v-for="(history,index) in histories"
            :key="history.id"
          >

            <td>{{ index+1 }}</td>

            <td>{{ history.rental_id }}</td>

            <td>{{ history.note }}</td>

          </tr>

          <tr v-if="histories.length===0">

            <td colspan="3" class="text-center">

              Belum ada riwayat.

            </td>

          </tr>

        </tbody>

      </table>

    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import historyService from "../services/historyService";

const histories = ref([]);

const loadHistory = async () => {

    try{

        const res = await historyService.getAll();

        histories.value = res.data.data;

    }catch(err){

        console.log(err);

    }

}

onMounted(loadHistory);
</script>