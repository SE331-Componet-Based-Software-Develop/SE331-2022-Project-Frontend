<template>
  <div class="background">
    <div class="home">
      <h1>The Patient who had Vaccinated</h1>
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
</template>

<script>
// @ is an alias to /src
import ListItem from '@/components/ListItem.vue'
import PatientService from '@/services/PatientService.js'
export default {
  name: 'HomeView',
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
      totalitems: 0
    }
  },
  // eslint-disable-next-line no-unused-vars
  beforeRouteEnter(routeTo, routeFrom, next) {
    PatientService.getPeoples(5, parseInt(routeTo.query.page) || 1)
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
    PatientService.getPeoples(5, parseInt(routeTo.query.page) || 1)
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
