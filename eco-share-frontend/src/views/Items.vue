<template>
  <div>

    <div class="d-flex justify-content-between align-items-center mb-4">

      <div>

        <h2 class="fw-bold">Items</h2>

        <small class="text-muted">
          Daftar barang EcoShare
        </small>

      </div>

      <button
        v-if="auth.role==='owner'"
        class="btn btn-purple"
        data-bs-toggle="modal"
        data-bs-target="#itemModal"
      >
        <i class="bi bi-plus-circle me-2"></i>
        Tambah Item
      </button>

    </div>

    <div class="card-custom p-4">

      <table class="table align-middle">

        <thead>

          <tr>

            <th>No</th>
            <th>Nama</th>
            <th>Deskripsi</th>
            <th>Harga/Hari</th>
            <th>Status</th>
            <th>Stok</th>

            <th
              v-if="auth.role==='renter'"
            >
              Aksi
            </th>

          </tr>

        </thead>

        <tbody>

          <tr
            v-for="(item,index) in items"
            :key="item.id"
          >

            <td>{{ index+1 }}</td>

            <td>{{ item.name }}</td>

            <td>{{ item.description }}</td>

            <td>
              Rp {{ Number(item.price_per_day).toLocaleString('id-ID') }}
            </td>

            <td>

              <span
                class="badge"
                :class="
                  item.status === 'available'
                  ? 'bg-success'
                  : 'bg-secondary'
                "
              >
                {{ item.status }}
              </span>

            </td>

            <td>{{ item.stock }}</td>


            <td
              v-if="auth.role==='renter'"
            >

              <RouterLink
                class="btn btn-sm btn-purple"
                :to="{
                  path:'/rentals',
                  query:{
                    item:item.id
                  }
                }"
              >
                Pinjam
              </RouterLink>

            </td>

          </tr>

          <tr
            v-if="items.length===0"
          >

            <td
              colspan="5"
              class="text-center"
            >

              Belum ada data.

            </td>

          </tr>

        </tbody>

      </table>

    </div>

    <!-- Modal -->

    <div
      class="modal fade"
      id="itemModal"
      tabindex="-1"
    >

      <div class="modal-dialog">

        <div class="modal-content">

          <div class="modal-header">

            <h5>Tambah Item</h5>

            <button
              class="btn-close"
              data-bs-dismiss="modal"
            ></button>

          </div>

          <div class="modal-body">

            <div class="mb-3">

              <label>Nama Item</label>

              <input
                v-model="form.name"
                class="form-control"
              >

            </div>

            <div class="mb-3">

                <label>Deskripsi</label>

                <textarea
                    v-model="form.description"
                    class="form-control"
                ></textarea>

            </div>

            <div class="mb-3">

                <label>Stok</label>

                <input
                    type="number"
                    v-model="form.stock"
                    class="form-control"
                >

            </div>

            <div class="mb-3">

                <label>Harga / Hari</label>

                <input
                    type="number"
                    v-model="form.price_per_day"
                    class="form-control"
                >

            </div>

            <div class="mb-3">

              <label>Stok</label>

              <input
                type="number"
                v-model="form.stock"
                class="form-control"
              >

            </div>

          </div>

          <div class="modal-footer">

            <button
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >

              Batal

            </button>

            <button
              class="btn btn-purple"
              @click="saveItem"
            >

              Simpan

            </button>

          </div>

        </div>

      </div>

    </div>

  </div>
</template>

<script setup>

import { ref,onMounted } from "vue"

import itemService from "../services/itemService"

import { useAuthStore } from "../stores/auth"

const auth=useAuthStore()

const items=ref([])

const form = ref({
    name: "",
    description: "",
    stock: 1,
    price_per_day: 0,
    status: "available"
})

const loadItems=async()=>{

    try{

        const res=await itemService.getAll()

        items.value=res.data.data

    }catch(err){

        console.log(err)

    }

}

const saveItem=async()=>{

    try{

        await itemService.create(form.value)

        await loadItems()

        form.value={
            name:"",
            description:"",
            stock:1,
            price_per_day:0,
            status:"available"
        }

        bootstrap.Modal.getInstance(
            document.getElementById("itemModal")
        ).hide()

    }catch(err){

        alert(err.response?.data?.message||"Gagal")

    }

}

onMounted(loadItems)

</script>