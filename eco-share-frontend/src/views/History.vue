<template>

<div>


<h2 class="fw-bold mb-4">
History Rental
</h2>



<div class="card-custom p-4">


<table class="table align-middle">


<thead>

<tr>

<th>No</th>

<th>Barang</th>

<th>Qty</th>

<th>Total</th>

<th>Status</th>

<th>Tanggal</th>

<th>Aksi</th>

</tr>

</thead>



<tbody>


<tr
v-for="(rental,index) in rentals"
:key="rental.id"
>


<td>
{{ index+1 }}
</td>



<td>
{{ rental.Item?.name }}
</td>



<td>
{{ rental.qty }}
</td>



<td>

Rp {{ Number(rental.total_price)
.toLocaleString('id-ID') }}

</td>



<td>


<span
class="badge"
:class="statusClass(rental.status)"
>

{{ rental.status }}

</span>


</td>



<td>

{{ rental.start_date }}

</td>

<td>

<RouterLink
class="btn btn-sm btn-purple"
:to="`/invoice/${rental.id}`"
>

<i class="bi bi-receipt"></i>

Invoice

</RouterLink>

</td>

</tr>



<tr v-if="rentals.length===0">

<td
colspan="7"
class="text-center"
>

Belum ada riwayat rental.

</td>

</tr>


</tbody>


</table>


</div>


</div>

</template>





<script setup>


import {
ref,
onMounted
} from "vue"



import rentalService from "../services/rentalService"




const rentals = ref([])





const loadHistory = async()=>{


try{


const res =
await rentalService.getAll()


rentals.value =
res.data.data



}catch(err){

console.log(err)

}


}







const statusClass=(status)=>{


if(status==="approved"){

return "bg-success"

}


if(status==="finished"){

return "bg-primary"

}


return "bg-warning"


}







onMounted(loadHistory)



</script>