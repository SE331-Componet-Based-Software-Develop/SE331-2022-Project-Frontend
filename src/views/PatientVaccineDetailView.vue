<template>
  <div class="background">
    <div id="building">
      <div class="left-nav" @click="changeImage">
        <img v-for="url in patient.imageUrl" :key="url" :src="url" />
      </div>
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
            <div class="title">First Dose Time</div>
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
            <div class="title">Second Dose Time</div>
            <div class="value">
              {{ time(patient.vaccineinfo.seconddose_time) }}
            </div>
          </li>
          <br />
        </ul>
      </div>
    </div>
    <div v-if="isAdmin">
      <h2>You can update patient's vaccina infomation!</h2>
      <div id="building1">
        <div class="list-item">
          <ul>
            <li>
              <br />
              <div class="title">First Dose Name</div>
              <div class="value">
                <div v-if="patient.vaccineinfo.firstdose_name">
                  {{ dose(patient.vaccineinfo.firstdose_name) }}
                </div>
                <div v-else>
                  <BaseInput
                    v-model="vaccineinfo.firstdose_name"
                    type="text"
                    label="first dose name"
                    class="field"
                  />
                </div>
              </div>
            </li>
            <li>
              <div class="title">First Dose Time</div>
              <div class="value">
                <div v-if="patient.vaccineinfo.firstdose_time">
                  {{ time(patient.vaccineinfo.firstdose_time) }}
                </div>
                <div v-else>
                  <BaseInput
                    v-model="vaccineinfo.firstdose_time"
                    type="text"
                    label="first dose time"
                    class="field"
                  />
                </div>
              </div>
              <br />
            </li>
            <li>
              <div class="title">Second Dose Name</div>
              <div class="value">
                <div v-if="patient.vaccineinfo.seconddose_name">
                  {{ dose(patient.vaccineinfo.seconddose_name) }}
                </div>
                <div v-else>
                  <BaseInput
                    v-model="vaccineinfo.seconddose_name"
                    type="text"
                    label="second dose name"
                    class="field"
                  />
                </div>
              </div>
            </li>
            <li>
              <div class="title">Second Dose Time</div>
              <div class="value">
                <div v-if="patient.vaccineinfo.seconddose_time">
                  {{ time(patient.vaccineinfo.seconddose_time) }}
                </div>
                <div v-else>
                  <BaseInput
                    v-model="vaccineinfo.seconddose_time"
                    type="text"
                    label="second dose time"
                    class="field"
                  />
                </div>
              </div>
            </li>
            <br />
            <li>
              <div class="title">Vaccined Status</div>
              <div class="value">
                <div v-if="patient.vaccineinfo.vaccined_status == 'SecondDose'">
                  {{ patient.vaccineinfo.vaccined_status }}
                </div>
                <div v-else>
                  <BaseSelect
                    :options="this.Status"
                    v-model="vaccineinfo.vaccined_status"
                  />
                </div>
              </div>
            </li>
            <li>
              <div class="title">Doctor</div>
              <div class="value">
                <div v-if="patient.doctor != null">
                  {{ patient.doctor.name }} {{ patient.doctor.sur_name }}
                </div>
                <div v-else>
                  <BaseSelectDoc :options="this.doctors" v-model="tempdid" />
                </div>
              </div>
            </li>
            <br />
          </ul>
        </div>
      </div>
      <button @click="vaccine1">Update</button>
    </div>
  </div>
</template>
<script>
import DoctorService from '@/services/DoctorService.js'
import VaccineService from '@/services/VaccineService.js'
import AuthService from '@/services/AuthService.js'
// import PatientService from '@/services/PatientService'
export default {
  props: ['id', 'patient'],
  inject: ['GStore'],
  data() {
    return {
      vaccineinfo: {
        firstdose_name: '',
        firstdose_time: '',
        seconddose_name: '',
        seconddose_time: '',
        vaccined_status: ''
      },
      tempdid: '',
      doctorid: '',
      Status: [
        { id: '1', name: 'Not Vaccinated' },
        { id: '2', name: 'FirstDose' },
        { id: '3', name: 'SecondDose' }
      ],
      doctors: []
    }
  },
  created: function () {
    DoctorService.getTotalDoctors().then((response) => {
      this.doctors = response.data
    })
  },
  methods: {
    changeImage() {
      this.$router.push({
        name: 'ChangeImage',
        params: { id: this.patient.id }
      })
    },
    vaccine1() {
      if (this.vaccineinfo.firstdose_name == '')
        this.vaccineinfo.firstdose_name =
          this.patient.vaccineinfo.firstdose_name
      if (this.vaccineinfo.firstdose_time == '')
        this.vaccineinfo.firstdose_time =
          this.patient.vaccineinfo.firstdose_time
      if (this.vaccineinfo.vaccined_status == 'Not Vaccinated') {
        this.vaccineinfo.firstdose_name = null
        this.vaccineinfo.firstdose_time = null
        this.vaccineinfo.seconddose_name = null
        this.vaccineinfo.seconddose_time = null
      }
      if (this.vaccineinfo.vaccined_status == 'FirstDose') {
        this.vaccineinfo.seconddose_name = null
        this.vaccineinfo.seconddose_time = null
      }
      console.log(this.status)
      console.log(this.vaccineinfo)
      console.log(this.patient)
      console.log(this.doctors)
      if (this.patient.doctor != null) {
        this.doctorid = this.patient.doctor.id
      } else {
        this.doctorid = this.tempdid
      }
      console.log('this did=' + this.doctorid)
      VaccineService.updateVaccine(
        this.vaccineinfo,
        this.patient.id,
        this.doctorid
      ).then((response) => {
        console.log(response)
        this.$router.go(0)
      })
      this.GStore.flashMessage =
        'You are successfully update to ' +
        this.patient.name +
        ' ' +
        this.patient.sur_name +
        ' vaccine information'
      setTimeout(() => {
        this.GStore.flashMessage = ''
      }, 3000)
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
    },
    isAdmin() {
      return AuthService.hasRoles('ROLE_ADMIN')
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
  width: 150px;
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
