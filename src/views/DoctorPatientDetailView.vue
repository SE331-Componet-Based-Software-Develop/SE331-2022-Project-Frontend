<!-- <template>
  <div class="background">
    <div id="building">
      <div class="left-nav"><img :src="imgURL" /></div>
      <div class="list-item">
        <ul>
          <li>
            <br />
            <div class="title">Name</div>
            <div class="value">{{ patient.name }}</div>
            <br />
          </li>
          <li>
            <div class="title">SurName</div>
            <div class="value">{{ patient.sur_name }}</div>
            <br />
          </li>
          <li>
            <div class="title">Age</div>
            <div class="value">{{ patient.age }}</div>
            <br />
          </li>
          <li>
            <div class="title">Home Town</div>
            <div class="value">{{ patient.hometown }}</div>
          </li>
        </ul>
        <br />
      </div>
    </div>
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
            <div class="title">Second Dose</div>
            <div class="value">
              {{ time(patient.vaccineinfo.seconddose_time) }}
            </div>
          </li>
          <br />
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ['patient'],
  computed: {
    imgURL() {
      return require('../assets/' + this.patient.id + '.jpg')
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
  width: 15%;
  text-align: center;
  text-align-last: center;
}
.title:before {
  position: absolute;
  left: 100%;
  content: '\FF1A';
}
.value {
  padding-left: 40%;
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
</style> -->
