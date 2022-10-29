<template>
  <div class="background">
    <VaccineItem
      v-for="vaccine in vaccines"
      :key="vaccine.id"
      :vaccine="vaccine"
    ></VaccineItem>
    <div class="home">
      <h1>People who have been vaccinated with the defferent doses</h1>
      <h2>
        Number of people vaccinated with first dose vaccine :
        {{ this.first_dose }}
      </h2>
      <div class="home-list">
        <FirstDose
          v-for="patient in patients"
          :key="patient.id"
          :patient="patient"
        />
      </div>
      <h2>
        Number of patient vaccinated with second dose vaccine :
        {{ this.second_dose }}
      </h2>
      <div class="home-list">
        <SecondDose
          v-for="patient in patients"
          :key="patient.id"
          :patient="patient"
        />
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import FirstDose from '@/components/FirstDose.vue'
import SecondDose from '@/components/SecondDose.vue'
import VaccineItem from '@/components/VaccineItem.vue'
import VaccineService from '@/services/VaccineService.js'
import { watchEffect } from '@vue/runtime-core'
export default {
  name: 'HomeView',
  components: {
    FirstDose,
    SecondDose,
    VaccineItem
  },
  data() {
    return {
      vaccines: [],
      first_dose: 0,
      second_dose: 0,
      length: 0
    }
  },
  created() {
    watchEffect(() => {
      VaccineService.getTotalVaccines().then((response) => {
        this.vaccines = response.data
      })
    })
  }
}
</script>
<style scoped>
.home-list {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.pagination {
  display: flex;
  width: 290px;
}
.pagination a {
  flex: 1;
  text-decoration: none;
  color: #2c3e50;
}
#page-prev {
  text-align: left;
  margin-right: 100px;
  padding-bottom: 100px;
}

#page-next {
  text-align: right;
  margin-left: 100px;
  padding-bottom: 100px;
}
</style>
