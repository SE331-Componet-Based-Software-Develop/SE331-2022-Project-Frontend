<template>
  <div class="background" v-if="isAdmin">
    <div class="home">
      <h1 v-if="doctor == null">The Patients who had Vaccinated</h1>
      <h1 v-if="doctor != null">
        Doctor {{ doctor.name }} {{ doctor.sur_name }}'s patients
      </h1>
      <div class="home-list">
        <ListItem
          v-for="patient in patients"
          :key="patient.id"
          :patient="patient"
        />
      </div>
      <router-link
        id="page-prev"
        :to="{
          name: 'home',
          query: { page: page - 1 }
        }"
        rel="prev"
        v-if="page != 1"
      >
        Prev Page
      </router-link>
      <span>{{ this.page }}</span>
      <router-link
        id="page-next"
        :to="{
          name: 'home',
          query: { page: page + 1 }
        }"
        rel="next"
        v-if="hasNextPage"
      >
        Next Page
      </router-link>
    </div>
  </div>
  <div v-else-if="isPatient">
    <h4>Go to your own page</h4>
    <router-link
      :to="{ name: 'PatientDetail', params: { id: GStore.currentUser.id } }"
      >My page</router-link
    >
  </div>
  <div v-else-if="isDoctor">
    <h4>Go to your own page</h4>
    <router-link
      :to="{ name: 'DoctorDetail', params: { id: GStore.currentUser.id } }"
      >My page</router-link
    >
  </div>
</template>

<script>
// @ is an alias to /src
import ListItem from '@/components/ListItem.vue'
import PatientService from '@/services/PatientService.js'
import AuthService from '@/services/AuthService.js'
export default {
  name: 'HomeView',
  inject: ['GStore'],
  props: {
    page: {
      type: Number,
      required: true
    }
  },
  components: {
    ListItem
  },
  data() {
    return {
      patients: null,
      totalitems: 0,
      doctor: null
    }
  },
  // eslint-disable-next-line no-unused-vars
  beforeRouteEnter(routeTo, routeFrom, next) {
    console.log(routeTo, routeFrom)
    PatientService.getPeopleByAlreadyVaccinated(
      5,
      parseInt(routeTo.query.page) || 1
    )
      .then((response) => {
        next((comp) => {
          comp.patients = response.data
          comp.totalitems = response.headers['x-total-count']
        })
      })
      .catch(() => {
        next({ name: 'NetworkError' })
      })
  },
  // eslint-disable-next-line no-unused-vars
  beforeRouteUpdate(routeTo, routeFrom, next) {
    PatientService.getPeopleByAlreadyVaccinated(
      5,
      parseInt(routeTo.query.page) || 1
    )
      .then((response) => {
        this.patients = response.data
        this.totalitems = response.headers['x-total-count']
        next()
      })
      .catch(() => {
        next({ name: 'NetworkError' })
      })
  },
  computed: {
    hasNextPage() {
      let totalPages = Math.ceil(this.totalitems / 5)
      return this.page < totalPages
    },
    isAdmin() {
      return AuthService.hasRoles('ROLE_ADMIN')
    },
    isPatient() {
      return AuthService.hasRoles('ROLE_PATIENT')
    },
    isDoctor() {
      return AuthService.hasRoles('ROLE_DOCTOR')
    }
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
