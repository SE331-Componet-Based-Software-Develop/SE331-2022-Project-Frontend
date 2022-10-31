<template>
  <div class="mytable" width="1600">
    <h1></h1>
    <h2></h2>
    <table>
      <tr align="center">
        <th width="200">USER ID: {{ user.id }}</th>
        <th width="300">USER NAME: {{ user.firstname }} {{ user.lastname }}</th>
        <th width="300">USER EMAIL: {{ user.email }}</th>
        <th width="200" class="color">Select User's role</th>
        <th width="20">
          <BaseSelectDoc :options="this.roles" v-model="num" />
        </th>
        <th width="300">
          <button @click="Update1">Confirm</button>
        </th>
      </tr>
      <br />
    </table>
  </div>
</template>
<script>
import UserService from '@/services/UserService.js'
export default {
  name: 'UserItem',
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      num: '',
      roles: [
        { id: '1', name: 'Doctor' },
        { id: '2', name: 'Patient' }
      ]
    }
  },
  methods: {
    Update1() {
      if (this.num == '') {
        alert('the role of the user can not be null')
        return
      }
      console.log(this.user.id, this.num)
      UserService.updaterole(this.user.id, this.num).then((response) => {
        this.users = response.data
        this.$router.go(0)
      })
      this.GStore.flashMessage = 'You are successfully set the role of the user'
      setTimeout(() => {
        this.GStore.flashMessage = ''
      }, 3000).catch(() => {
        ;({ name: 'NetworkError' })
      })
    }
  }
}
</script>
<style scoped>
.name {
  color: green;
  font: bold;
  font-size: 20px;
}
.color {
  color: cadetblue;
}
.mytable {
  margin: 0, auto;
  display: flex;
  text-align: center;
}
.id_center {
  padding-left: 150px;
}
#building {
  display: flex;
  flex-direction: column;
  padding: 10px;
  width: 500px;
  height: 150px;
  cursor: pointer;
  border: 3px solid #a6abb1;
  border-radius: 20px;
  margin-bottom: 18px;
  text-align: center;
  background-image: url('../assets/card.jpg');
  background-position: absolute;
  background-size: 100% 100%;
  /* background-color: blanchedalmond; */
}
.status {
  color: darkseagreen;
}
.list-item {
  /* border: 3px double #39495c; */
  text-align: left;
  float: right;
  position: absolute;
  width: 300px;
  margin: 10px 0 0 190px;
}
.left-nav {
  float: left;
  width: 66px;
  height: 66px;
  background-color: #fff;
  padding: 3px;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.3);
  margin: 20px 0 10px 100px;
  box-sizing: border-box;
  border-radius: 50%;
}
.left-nav img {
  display: block;
  width: 60px;
  height: 60px;
  border-radius: 50%;
}
.right-nav {
  float: right;
}
/* #building {
      background: url('../assets/bc.jpg');
      width: 100%;
      height: 100%;
      position: absolute;
      overflow: auto;
      background-size: 100% 100%;
    } */
body {
  overflow: auto;
}
* {
  margin: 0;
  padding: 0;
}
li {
  position: relative;
  list-style-type: none;
}
.title {
  position: absolute;
  width: 35%;
  text-align: justify;
  text-align-last: justify;
}
.title:before {
  position: absolute;
  left: 100%;
  content: '\FF1A';
}
.value {
  padding-left: 40%;
}
.name {
  color: green;
  font: bold;
  font-size: 20px;
  padding-bottom: 0px;
  padding-top: 15px;
}
.status {
  padding-bottom: 8px;
}
</style>
