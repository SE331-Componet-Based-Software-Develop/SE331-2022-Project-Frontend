<template>
  <div>
    <h1>Change your image</h1>
    <form @submit.prevent="saveImage">
      <UploadImages @changed="handleImages" />
      <button type="submit">Submit</button>
    </form>
  </div>
</template>

<script>
import PatientService from '@/services/PatientService.js'
import UploadImages from 'vue-upload-drop-images'
export default {
  props: ['id', 'patient'],
  inject: ['GStore'],
  components: {
    UploadImages
  },
  data() {
    return {
      patient1: {},
      imageUrl: [],
      files: []
    }
  },
  methods: {
    saveImage() {
      if (this.files.length > 1) {
        this.GStore.flashMessage = 'only 1 image is allowed to be added'
        setTimeout(() => {
          this.GStore.flashMessage = ''
        }, 3000)
        return
      }
      Promise.all(
        this.files.map((file) => {
          return PatientService.updateFile(file)
        })
      )
        .then((response) => {
          this.patient1 = this.patient
          this.patient1.imageUrl = response.map((r) => r.data)
          PatientService.changeimage(this.patient1).then((response) => {
            console.log(response)
            this.$router.push({
              name: 'PatientDetail',
              params: { id: response.data.id }
            })
          })
          this.GStore.flashMessage = 'You are succcessfully update image '
          setTimeout(() => {
            this.GStore.flashMessage = ''
          }, 3000)
        })
        .catch(() => {
          this.$router.push('NetworkError')
        })
    },
    handleImages(files) {
      console.log(files)
      this.files = files
    }
  }
}
</script>
<style scoped></style>
