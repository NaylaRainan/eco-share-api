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
        @click="resetForm"
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

            <th v-if="auth.role==='owner' || auth.role==='renter'">
              Aksi
            </th>

          </tr>

        </thead>

        <tbody>

          <tr
            v-for="(item,index) in items"
            :key="item.id"
          >

            <td>
              {{ index+1 }}
            </td>

            <td>
              {{ item.name }}
            </td>

            <td>
              {{ item.description }}
            </td>

            <td>
              Rp {{ Number(item.price_per_day).toLocaleString('id-ID') }}
            </td>

            <td>

              <span
                class="badge"
                :class="
                  item.status==='available'
                  ? 'bg-success'
                  : 'bg-secondary'
                "
              >
                {{ item.status }}
              </span>

            </td>

            <td>
              {{ item.stock }}
            </td>

            <!-- OWNER ACTION -->

            <td v-if="auth.role==='owner'">

              <button
                class="btn btn-warning btn-sm me-2"
                @click="editItem(item)"
                data-bs-toggle="modal"
                data-bs-target="#itemModal"
              >

                <i class="bi bi-pencil"></i>

              </button>

              <button
                class="btn btn-danger btn-sm"
                @click="deleteItem(item.id)"
              >

                <i class="bi bi-trash"></i>

              </button>

            </td>

            <!-- RENTER ACTION -->

            <td v-if="auth.role==='renter'">

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

          <tr v-if="items.length===0">

            <td
              colspan="7"
              class="text-center"
            >

              Belum ada data.

            </td>

          </tr>

        </tbody>

      </table>

    </div>

    <!-- MODAL -->

    <div
      class="modal fade"
      id="itemModal"
      tabindex="-1"
    >

      <div class="modal-dialog">

        <div class="modal-content">

          <div class="modal-header">

            <h5>
              {{ isEdit ? 'Edit Item' : 'Tambah Item' }}
            </h5>

            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
            ></button>

          </div>

          <div class="modal-body">

            <div class="mb-3">

              <label>
                Nama Item
              </label>

              <input
                v-model="form.name"
                class="form-control"
              >

            </div>

            <div class="mb-3">

              <label>
                Deskripsi
              </label>

              <textarea
                v-model="form.description"
                class="form-control"
              ></textarea>

            </div>

            <div class="mb-3">

              <label>
                Stok
              </label>

              <input
                  type="number"
                  v-model.number="form.stock"
                  class="form-control"
              />

            </div>

            <div class="mb-3">

              <label>
                Harga / Hari
              </label>

              <input
                  type="number"
                  v-model.number="form.price_per_day"
                  class="form-control"
              />

            </div>

          </div>

          <div class="modal-footer">

            <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
            >
                Batal
            </button>

            <button
              type="button"
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

import { ref, onMounted } from "vue"
import * as bootstrap from "bootstrap"

import itemService from "../services/itemService"

import { useAuthStore } from "../stores/auth"

const auth = useAuthStore()

const items = ref([])

const isEdit = ref(false)

const editId = ref(null)

const form = ref({

    name:"",
    description:"",
    stock:1,
    price_per_day:0,
    status:"available"

})

const loadItems = async()=>{
    try{

        const res = await itemService.getAll()
        items.value = res.data.data
    }catch(err){
        console.log(err)
    }

}

const resetForm = ()=>{

    isEdit.value=false

    editId.value=null

    form.value={

        name:"",
        description:"",
        stock:1,
        price_per_day:0,
        status:"available"

    }

}

const editItem = (item)=>{

    isEdit.value=true

    editId.value=item.id

    form.value={

        name:item.name,

        description:item.description,

        stock:item.stock,

        price_per_day:item.price_per_day,

        status:item.status

    }

}

const saveItem = async()=>{

try{

    if(isEdit.value){

        await itemService.update(
            editId.value,
            form.value
        )

    }else{

        await itemService.create(
            form.value
        )

    }

    await loadItems()


    resetForm()



    const modalEl = document.getElementById("itemModal")

    const modal =
        bootstrap.Modal.getInstance(modalEl)
        || new bootstrap.Modal(modalEl)

    document.activeElement.blur()

    modal.hide()

    setTimeout(()=>{

        document
            .querySelectorAll(".modal-backdrop")
            .forEach(el => el.remove())

        document.body.classList.remove("modal-open")

        document.body.style.removeProperty("padding-right")

    },300)



}catch(err){


    console.log(err)


    alert(
      err.response?.data?.message ||
      "Gagal menyimpan"
    )


}



}

const deleteItem = async(id)=>{


    if(!confirm("Yakin hapus item ini?"))
        return



    try{


        await itemService.delete(id)


        await loadItems()



    }catch(err){


        console.log(err)


    }


}

onMounted(loadItems)


</script>