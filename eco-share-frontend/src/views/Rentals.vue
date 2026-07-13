<template>

<div>


<!-- ================= OWNER ================= -->

<div v-if="auth.role==='owner'">


<h2 class="fw-bold mb-4">
Rental Masuk
</h2>



<div class="card-custom p-4">


<table class="table align-middle">


<thead>

<tr>

<th>Invoice</th>

<th>Barang</th>

<th>Qty</th>

<th>Total</th>

<th>Status</th>

<th>Aksi</th>

</tr>

</thead>



<tbody>


<tr
v-for="rental in rentals"
:key="rental.id"
>


<td>
INV-{{ rental.id }}
</td>



<td>
{{ rental.Item?.name }}
</td>



<td>
{{ rental.qty }}
</td>



<td>
Rp {{ Number(rental.total_price).toLocaleString('id-ID') }}
</td>



<td>

<span
class="badge"
:class="
rental.status==='approved'
?'bg-success'
:
'bg-warning'
"
>

{{ rental.status }}

</span>

</td>




<td>


<button
type="button"
class="btn btn-sm btn-purple"
@click="selectedRental=rental"
data-bs-toggle="modal"
data-bs-target="#detailModal"
>
Detail
</button>



</td>



</tr>



</tbody>



</table>


</div>


</div>






<!-- ================= RENTER ================= -->

<div v-if="auth.role==='renter'">


<h2 class="fw-bold mb-4">

Form Rental

</h2>



<div class="card-custom p-4">


<div class="mb-3">


<label>
Barang
</label>


<input
class="form-control"
:value="item?.name"
readonly
>


</div>




<div class="mb-3">

<label>
Harga / Hari
</label>


<input
class="form-control"
:value="item?.price_per_day"
readonly
>


</div>





<div class="mb-3">


<label>
Qty
</label>


<input
type="number"
class="form-control"
v-model="form.qty"
>


</div>





<div class="mb-3">


<label>
Tanggal Mulai
</label>


<input
type="date"
class="form-control"
v-model="form.start_date"
>


</div>





<div class="mb-3">


<label>
Tanggal Selesai
</label>


<input
type="date"
class="form-control"
v-model="form.end_date"
>


</div>





<h4>

Total:

Rp {{ total.toLocaleString('id-ID') }}

</h4>




<button
class="btn btn-purple"
@click="submitRental"
>

Konfirmasi Rental

</button>



</div>


</div>






<!-- MODAL OWNER -->


<div
class="modal fade"
id="detailModal"
>

<div class="modal-dialog">

<div class="modal-content">


<div class="modal-header">


<h5>
Detail Rental
</h5>


<button
type="button"
class="btn-close"
data-bs-dismiss="modal"
></button>


</div>



<div class="modal-body"
v-if="selectedRental"
>


<p>
Barang:
{{ selectedRental.Item?.name }}
</p>


<p>
Status:
{{ selectedRental.status }}
</p>


<button
type="button"
class="btn btn-success"
@click="changeStatus('approved')"
>

Approve

</button>


<button
type="button"
class="btn btn-primary ms-2"
@click="changeStatus('finished')"
>

Finish

</button>


</div>



</div>

</div>

</div>



</div>


</template>






<script setup>


import {
ref,
computed,
onMounted
} from "vue"


import {
useRoute
} from "vue-router"



import itemService from "../services/itemService"
import * as bootstrap from "bootstrap"

import rentalService from "../services/rentalService"

import {useAuthStore} from "../stores/auth"



const auth = useAuthStore()

const route = useRoute()



const rentals = ref([])


const item = ref(null)


const selectedRental = ref(null)





const form = ref({

item_id:null,

qty:1,

start_date:"",

end_date:""

})





const total = computed(()=>{


if(!item.value)
return 0


return (
Number(item.value.price_per_day)
*
Number(form.value.qty)
)


})






const loadRentals = async()=>{


const res = await rentalService.getAll()


rentals.value=res.data.data


}







const loadItem = async()=>{


const id = route.query.item


if(id){


const res =
await itemService.getById(id)


item.value=res.data.data


form.value.item_id=id


}


}







const submitRental = async()=>{


try{


const res = await rentalService.create({

...form.value,

total_price:total.value

})


const id = res.data.data.id


window.location.href =
`/invoice/${id}`



}catch(err){


console.log(err)

alert(
"Gagal membuat rental"
)


}


}






const changeStatus = async(status)=>{


await rentalService.updateStatus(

    selectedRental.value.id,

    status

)


await loadRentals()



const modalEl = document.getElementById("detailModal")

const modal =
    bootstrap.Modal.getInstance(modalEl)


if(modal){

    document.activeElement.blur()

    modal.hide()

}



setTimeout(()=>{

    document
        .querySelectorAll(".modal-backdrop")
        .forEach(el => el.remove())


    document.body.classList.remove("modal-open")


    document.body.style.removeProperty("padding-right")


},300)


}


onMounted(()=>{


if(auth.role==="owner")
loadRentals()


if(auth.role==="renter")
loadItem()



const modalEl = document.getElementById("detailModal")

if(modalEl){

    modalEl.addEventListener(
        "hide.bs.modal",
        ()=>{
            document.activeElement.blur()
        }
    )

}


})



</script>