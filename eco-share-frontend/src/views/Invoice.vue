<template>

<div class="container">

<h2 class="fw-bold mb-4">
Invoice Rental
</h2>


<div
v-if="rental"
class="card-custom p-4"
>


<h5>
Invoice #{{ rental.id }}
</h5>


<hr>


<p>
<b>Barang:</b>
{{ rental.Item?.name }}
</p>


<p>
<b>Harga / Hari:</b>

Rp {{ Number(rental.Item?.price_per_day)
.toLocaleString('id-ID') }}

</p>



<p>
<b>Qty:</b>

{{ rental.qty }}

</p>



<p>
<b>Tanggal Mulai:</b>

{{ rental.start_date }}

</p>



<p>
<b>Tanggal Selesai:</b>

{{ rental.end_date }}

</p>



<hr>


<h4>

Total:

Rp {{ Number(rental.total_price)
.toLocaleString('id-ID') }}

</h4>



<span
class="badge mt-3"
:class="
rental.status==='approved'
?'bg-success'
:
'bg-warning'
"
>

{{ rental.status }}

</span>



</div>


<div v-else>

Loading invoice...

</div>


</div>

</template>


<script setup>

import { ref,onMounted } from "vue"

import { useRoute } from "vue-router"

import rentalService from "../services/rentalService"



const route = useRoute()


const rental = ref(null)



const loadInvoice = async()=>{


try{


const res =
await rentalService.getById(
route.params.id
)


rental.value=res.data.data



}catch(err){

console.log(err)

}


}



onMounted(loadInvoice)


</script>