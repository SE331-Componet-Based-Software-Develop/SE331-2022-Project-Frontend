<template>
  <div class="background"></div>
  <h3>{{ patient.name }} {{ patient.sur_name }}'s Comments'</h3>
  <CommentList v-if="comments.length" :comments="comments"></CommentList>
  <div v-if="isDoctor">
    <div class="value">
      Doctor:
      <BaseSelectDoc :options="this.doctors" v-model="doctorid" />
    </div>
    <CommentForm @comment-submitted="addComment"></CommentForm>
  </div>
</template>
<script>
import DoctorService from '@/services/DoctorService.js'
import CommentService from '@/services/CommentService.js'
import CommentForm from '@/components/CommentForm.vue'
import CommentList from '@/components/CommentList.vue'
import AuthService from '@/services/AuthService.js'
export default {
  props: ['id', 'patient'],
  inject: ['GStore'],
  components: {
    CommentForm,
    CommentList
  },
  data() {
    return {
      comments: [],
      doctors: [],
      doctorid: ''
    }
  },
  created: function () {
    CommentService.getCommentByPatient(this.id).then((response) => {
      this.comments = response.data
    })

    DoctorService.getTotalDoctors().then((response) => {
      this.doctors = response.data
    })
  },
  methods: {
    addComment(comment) {
      console.log(comment)
      if (this.doctorid == '') {
        alert('Doctor is incomplete. Please select your name.')
        return
      }
      CommentService.addComment(comment, this.doctorid, this.id).then(
        (response) => {
          console.log(response)
          // this.$router.push({ name: 'Layout', params: { id: this.patient.id } })
          this.$router.go(0)
        }
      )
      this.GStore.flashMessage = 'Your comment has been added'
      setTimeout(() => {
        this.GStore.flashMessage = ''
      }, 3000)
      //      this.$router.go(0)
    }
  },
  computed: {
    isDoctor() {
      return AuthService.hasRoles('ROLE_DOCTOR')
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
.value {
  padding-left: 0%;
  color: green;
}
</style>
