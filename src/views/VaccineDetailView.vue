<template>
  <div class="home">
    <div width="1600" class="mytable">
      <table>
        <tr align="center">
          <th class="id_center">Id</th>
          <th width="300">Name</th>
          <th width="200">Vaccined_status</th>
          <th width="350">Firstdose_name</th>
          <th width="150">Firstdose_time</th>
          <th width="350">Seconddose_name</th>
          <th width="150">Deconddose_time</th>
          <th width="300">Update</th>
        </tr>
      </table>
    </div>
    <br />
    <div class="home-list">
      <VaccineItem
        v-for="vaccine in vaccines"
        :key="vaccine.id"
        :vaccine="vaccine"
      />
    </div>
    <router-link
      id="page-prev"
      :to="{
        name: 'VaccineDetail',
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
        name: 'VaccineDetail',
        query: { page: page + 1 }
      }"
      rel="next"
      v-if="hasNextPage"
    >
      Next Page
    </router-link>
  </div>
</template>

<script>
// @ is an alias to /src
import VaccineItem from '@/components/VaccineItem.vue'
import VaccineService from '@/services/VaccineService.js'
export default {
  name: 'VaccineIDetail',
  props: {
    page: {
      type: Number,
      required: true
    }
  },
  components: {
    VaccineItem
  },
  data() {
    return {
      vaccines: null,
      totalitems: 0,
      length: 0
    }
  },
  // eslint-disable-next-line no-unused-vars
  beforeRouteEnter(routeTo, routeFrom, next) {
    VaccineService.getVaccines(5, parseInt(routeTo.query.page) || 1)
      .then((response) => {
        next((comp) => {
          comp.vaccines = response.data
          comp.totalitems = response.headers['x-total-count']
        })
      })
      .catch(() => {
        next({ name: 'NetworkError' })
      })
  },
  // eslint-disable-next-line no-unused-vars
  beforeRouteUpdate(routeTo, routeFrom, next) {
    VaccineService.getVaccines(5, parseInt(routeTo.query.page) || 1)
      .then((response) => {
        this.vaccines = response.data
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
.mytable {
  margin: 0, auto;
  display: flex;
  text-align: center;
}
.id_center {
  padding-left: 150px;
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
