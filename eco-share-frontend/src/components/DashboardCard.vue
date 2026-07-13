<template>
  <div class="dashboard-card h-100">

    <div class="d-flex justify-content-between align-items-center">

      <div>

        <small class="text-muted">
          {{ title }}
        </small>

        <h2 class="mt-2 fw-bold">
          {{ value }}
        </h2>

      </div>

      <div class="icon-box">

        <i :class="icon"></i>

      </div>

    </div>

  </div>
</template>

<script setup>

defineProps({

  title:String,

  value:[String,Number],

  icon:String

})

</script>