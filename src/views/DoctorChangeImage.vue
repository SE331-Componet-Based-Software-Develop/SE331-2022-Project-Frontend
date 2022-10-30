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
import DoctorService from '@/services/DoctorService.js'
import UploadImages from 'vue-upload-drop-images'
export default {
  props: ['id', 'doctor'],
  inject: ['GStore'],
  components: {
    UploadImages
  },
  data() {
    return {
      doctor1: {},
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
          return DoctorService.updateFile(file)
        })
      )
        .then((response) => {
          console.log(response)
          this.doctor1 = this.doctor
          this.doctor1.imageUrl = response.map((r) => r.data)
          DoctorService.changeimage(this.doctor1).then((response) => {
            console.log(response)
            this.$router.push({
              name: 'DoctorDetail',
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
