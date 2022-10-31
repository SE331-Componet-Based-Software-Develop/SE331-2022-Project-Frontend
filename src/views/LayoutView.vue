<template>
  <div class="background" v-if="GStore.patient">
    <div id="nav">
      <router-link :to="{ name: 'PatientDetail' }">PatientDetails</router-link>
      |
      <router-link :to="{ name: 'PatientVaccineDetail' }"
        >VaccineDetails</router-link
      >
      |
      <router-link :to="{ name: 'PatientComment' }">Comments</router-link>
    </div>
    <router-view :patient="GStore.patient" />
  </div>
</template>
<script>
export default {
  inject: ['GStore']
}
</script>
