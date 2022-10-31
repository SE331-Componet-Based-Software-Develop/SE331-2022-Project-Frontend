<template>
  <div class="background" v-if="isAdmin">
    <div class="home">
      <h1>The Doctor List</h1>
      <div class="home-list">
        <DoctorListItem
          v-for="doctor in doctors"
          :key="doctor.id"
          :doctor="doctor"
        />
      </div>
      <router-link
        id="page-prev"
        :to="{
          name: 'doctorhome',
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
          name: 'doctorhome',
          query: { page: page + 1 }
        }"
        rel="next"
        v-if="hasNextPage"
      >
        Next Page
      </router-link>
    </div>
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
import DoctorListItem from '@/components/DoctorListItem.vue'
import DoctorService from '@/services/DoctorService.js'
import AuthService from '@/services/AuthService.js'
export default {
  name: 'DoctorHomeView',
  inject: ['GStore'],
  props: {
    page: {
      type: Number,
      required: true
    }
  },
  components: {
    DoctorListItem
  },
  data() {
    return {
      doctors: null,
      totalitems: 0
    }
  },
  // eslint-disable-next-line no-unused-vars
  beforeRouteEnter(routeTo, routeFrom, next) {
    DoctorService.getDoctors(2, parseInt(routeTo.query.page) || 1)
      .then((response) => {
        next((comp) => {
          comp.doctors = response.data
          comp.totalitems = response.headers['x-total-count']
        })
      })
      .catch(() => {
        next({ name: 'NetworkError' })
      })
  },
  // eslint-disable-next-line no-unused-vars
  beforeRouteUpdate(routeTo, routeFrom, next) {
    DoctorService.getDoctors(2, parseInt(routeTo.query.page) || 1)
      .then((response) => {
        this.doctors = response.data
        this.totalitems = response.headers['x-total-count']
        next()
      })
      .catch(() => {
        next({ name: 'NetworkError' })
      })
  },
  computed: {
    hasNextPage() {
      let totalPages = Math.ceil(this.totalitems / 2)
      return this.page < totalPages
    },
    isDoctor() {
      return AuthService.hasRoles('ROLE_DOCTOR')
    },
    isAdmin() {
      return AuthService.hasRoles('ROLE_ADMIN')
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
