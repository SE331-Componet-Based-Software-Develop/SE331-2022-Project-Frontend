<template>
  <div class="background" v-if="GStore.patient">
    <div id="nav">
      <router-link :to="{ name: 'PatientDetail' }">Details</router-link>|
      <router-link :to="{ name: 'PatientVaccineDetail' }"
        >VaccineDetails</router-link
      >|
      <router-link :to="{ name: 'DoctorComment' }"
        >Doctor's Comments</router-link
      >
    </div>
    <router-view :patient="GStore.patient" />
  </div>
</template>
<script>
export default {
  inject: ['GStore']
}
</script>
