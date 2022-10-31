<template>
  <div class="home">
    <div class="home-list">
      <UserItem v-for="user in users" :key="user.id" :user="user" />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import UserItem from '@/components/UserItem.vue'
import UserService from '@/services/UserService.js'
export default {
  name: 'AdminUser',
  inject: ['GStore'],
  components: {
    UserItem
  },
  data() {
    return {
      users: null
    }
  },
  created: function () {
    UserService.getUsers().then((response) => {
      this.users = response.data
      console.log(this.users)
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
