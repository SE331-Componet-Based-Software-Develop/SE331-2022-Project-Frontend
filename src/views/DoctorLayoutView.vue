<template>
  <div class="background" v-if="GStore.doctor">
    <div id="nav">
      <router-link :to="{ name: 'DoctorDetail' }">DoctorDetail</router-link> |
      <router-link
        :to="{ name: 'DoctorPatient', params: { id: GStore.doctor.id } }"
        >DoctorPatients</router-link
      >
      <!-- <router-link :to="{ name: 'DoctorCommentView' }" -->
      <!-- >DoctorComment</router-link -->
      <!-- > -->
    </div>
    <router-view :doctor="GStore.doctor" />
  </div>
</template>
<script>
export default {
  inject: ['GStore']
}
</script>
