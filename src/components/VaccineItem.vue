<template>
  <h1></h1>
  <h2></h2>
  <li>
    <span>{{ vaccine.id }}</span> |
    <span>{{ vaccine.patient.name }} {{ vaccine.patient.sur_name }}</span> |
    <span>{{ vaccine.vaccined_status }}</span>
    <span>{{ vaccine.firstdose_name }}</span>
    <span>{{ vaccine.firstdose_time }}</span>
    <span>{{ vaccine.seconddose_name }}</span>
    <span>{{ vaccine.seconddose_time }}</span>
    <button>Update</button>
  </li>
</template>
<script>
export default {
  name: 'VaccineItem',
  props: {
    vaccine: {
      type: Object,
      required: true
    }
  },
  computed: {
    firstdose() {
      return function (dose) {
        if (dose) return 'Vaccinated'
        else return 'Not vaccinated'
      }
    },
    imgURl: function () {
      return this.img
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
