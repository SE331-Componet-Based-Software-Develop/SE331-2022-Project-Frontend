<template>
  <div class="background" v-if="GStore.patient">
    <div id="nav">
      <router-link :to="{ name: 'DoctorPatientDetail' }"
        >DoctorPatientDetail</router-link
      >|
      <router-link :to="{ name: 'DoctorCommentView' }"
        >DoctorComment</router-link
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
