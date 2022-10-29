<template>
  <div class="background">
    <div id="building">
      <div class="left-nav"><img :src="imgURL" /></div>
      <div class="list-item">
        <ul>
          <li>
            <br />
            <div class="title">First Dose</div>
            <div class="value">
              {{ dose(patient.vaccineinfo.firstdose_name) }}
            </div>
          </li>
          <li>
            <div class="title">First Dose Date</div>
            <div class="value">
              {{ time(patient.vaccineinfo.firstdose_time) }}
            </div>
            <br />
          </li>
          <li>
            <div class="title">Second Dose</div>
            <div class="value">
              {{ dose(patient.vaccineinfo.seconddose_name) }}
            </div>
          </li>
          <li>
            <div class="title">Second Dose Date</div>
            <div class="value">
              {{ time(patient.vaccineinfo.seconddose_time) }}
            </div>
          </li>
          <br />
        </ul>
      </div>
    </div>
    <h2>Please add the info!</h2>
    <div id="building1">
      <div class="left-nav"><img :src="imgURL" /></div>
      <div class="list-item">
        <ul>
          <li>
            <br />
            <div class="title">First Dose</div>
            <div class="value">
              <div v-if="patient.vaccineinfo.firstdose_name">
                {{ dose(patient.vaccineinfo.firstdose_name) }}
              </div>
              <div v-else>
                <input
                  type="text"
                  value=""
                  class="input_control"
                  placeholder="input"
                  name="firstdose_name"
                  @input="print($event.target.value)"
                />
              </div>
            </div>
          </li>
          <li>
            <div class="title">First Dose Date</div>
            <div class="value">
              <div v-if="patient.vaccineinfo.firstdose_time">
                {{ dose(patient.vaccineinfo.firstdose_time) }}
              </div>
              <div v-else>
                <input
                  type="text"
                  value=""
                  class="input_control"
                  placeholder="input"
                  name="firstdose_time"
                  @input="print($event.target.value)"
                />
              </div>
            </div>
            <br />
          </li>
          <li>
            <div class="title">Second Dose</div>
            <div class="value">
              <div v-if="patient.vaccineinfo.seconddose_name">
                {{ dose(patient.vaccineinfo.seconddose_name) }}
              </div>
              <div v-else>
                <input
                  type="text"
                  value=""
                  class="input_control"
                  placeholder="input"
                  name="seconddose_name"
                  @input="print($event.target.value)"
                />
              </div>
            </div>
          </li>
          <li>
            <div class="title">Second Dose</div>
            <div class="value">
              <div v-if="patient.vaccineinfo.seconddose_time">
                {{ dose(patient.vaccineinfo.firstdose_time) }}
              </div>
              <div v-else>
                <input
                  type="text"
                  value=""
                  class="input_control"
                  placeholder="input"
                  name="seconddose_time"
                  @input="print($event.target.value)"
                />
              </div>
            </div>
          </li>
          <br />
        </ul>
      </div>
    </div>
    <button @click="vaccine">Return</button>
  </div>
</template>
<script>
export default {
  props: ['id', 'patient'],
  inject: ['GStore'],

  methods: {
    vaccine() {
      // this.GStore.flashMessage =
      //   'You are successfully return to ' +
      //   this.patient.name +
      //   ' ' +
      //   this.patient.sur_name
      // setTimeout(() => {
      //   this.GStore.flashMessage = ''
      // }, 3000)
      // this.$router.push({
      //   name: 'PatientDetail',
      //   params: { id: this.patient.id }
      // })
      console.log(this.vaccineinfo.seconddose_name)
    }
  },
  computed: {
    dose() {
      return function (dose) {
        if (!dose) return 'Not Vaccinated'
        else return dose
      }
    },
    time() {
      return function (time) {
        if (!time) return 'None'
        else return time
      }
    },
    imgURL() {
      return require('../assets/' + this.patient.id + '.jpg')
    }
  }
}
</script>
<style scoped>
#building {
  display: flex;
  flex-direction: column;
  padding: 10px;
  width: 500px;
  height: 200px;
  cursor: pointer;
  border: 3px solid #a6abb1;
  border-radius: 20px;
  margin: auto;
  text-align: center;
  background-image: url('../assets/card.jpg');
  background-position: absolute;
  background-size: 100% 100%;
  /* background-color: blanchedalmond; */
}
/*����Ա������Ϣ�����ʽ*/
#building1 {
  display: flex;
  flex-direction: column;
  padding: 10px;
  width: 600px;
  height: 300px;
  cursor: pointer;
  border: 3px solid #a6abb1;
  border-radius: 20px;
  margin: auto;
  text-align: center;
  background-color: #a6abb1;
  background-position: absolute;
  background-size: 100% 100%;
  /* background-color: blanchedalmond; */
}
.input_control {
  width: 200px;
  margin: 10px auto;
  box-sizing: border-box;
  text-align: center;
  height: 2.7em;
  border-radius: 4px;
  border: 1px solid #c8cccf;
  color: #6a6f77;
  -web-kit-appearance: none;
  -moz-appearance: none;
  display: block;
  outline: 0;
  padding: 0 1em;
  text-decoration: none;
  width: 100%;
}

input[type='text']:focus {
  border: 1px solid #ff7496;
}
.list-item {
  /* border: 3px double #39495c; */
  text-align: left;
  float: right;
  position: absolute;
  width: 400px;
  height: 180px;
  margin: 10px 0 0 100px;
}
.left-nav {
  float: left;
  width: 66px;
  height: 66px;
  background-color: #fff;
  padding: 3px;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.3);
  margin: 20px 0 10px 30px;
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
  width: 50%;
  text-align: center;
  text-align-last: center;
}
.title:before {
  position: absolute;
  left: 90%;
  content: '\FF1A';
}
.value {
  padding-left: 50%;
  color: green;
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
