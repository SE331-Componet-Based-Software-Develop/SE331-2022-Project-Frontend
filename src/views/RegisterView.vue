<template>
  <div class="col-md-12">
    <div class="card card-container">
      <form>
        <UploadImages class="img" @changed="handleImages" />
      </form>
      <br />
      <br />
      <Form @submit="handleRegister" :validation-schema="schema">
        <div v-if="!successful">
          <div class="form-group">
            <label for="username">Username</label>
            <Field
              name="username"
              type="text"
              class="form-control"
            /><ErrorMessage name="username" class="error-feedback" />
          </div>

          <div class="form-group">
            <label for="email">Email</label>
            <Field
              name="email"
              type="email"
              class="form-control"
            /><ErrorMessage name="email" class="error-feedback" />
          </div>

          <div class="form-group">
            <label for="password">Password</label>
            <Field
              name="password"
              type="password"
              class="form-control"
            /><ErrorMessage name="password" class="error-feedback" />
          </div>

          <div class="form-group">
            <label for="firstname">Firstname</label>
            <Field
              name="firstname"
              type="text"
              class="form-control"
            /><ErrorMessage name="firstname" class="error-feedback" />
          </div>

          <div class="form-group">
            <label for="lastname">Lastname</label>
            <Field
              name="lastname"
              type="text"
              class="form-control"
            /><ErrorMessage name="lastname" class="error-feedback" />
          </div>

          <div class="form-group">
            <button class="btn btn-primary btn-block" :disabled="loading">
              <span
                v-show="loading"
                class="spinner-border spinner-border-sm"
              ></span>
              <span>Sign up</span>
            </button>
          </div>

          <div
            v-if="message"
            class="alert"
            :class="successful ? 'alert-success' : 'alert-danger'"
          >
            {{ message }}
          </div>
        </div>
      </Form>
    </div>
  </div>
</template>
<script>
import { Form, Field, ErrorMessage } from 'vee-validate'
import PatientService from '@/services/PatientService.js'
import UploadImages from 'vue-upload-drop-images'
import * as yup from 'yup'
// eslint-disable-next-line
  import AuthService from '@/services/AuthService.js'
export default {
  name: 'RegisterView',
  components: {
    UploadImages,
    Form,
    Field,
    ErrorMessage
  },
  // eslint-disable-next-line
      inject: ['GStore'],
  data() {
    const schema = yup.object().shape({
      username: yup
        .string()
        .required('Username is required!')
        .min(3, 'Must be at least 3 characters!')
        .max(20, 'Must be maximum 20 characters!'),
      email: yup
        .string()
        .required('Email is invalid!')
        .max(50, 'Must be maximum 50 characters!'),
      password: yup
        .string()
        .required('Password is required!')
        .min(6, 'Must be at least 6 characters!')
        .max(40, 'Must be maximum 40 characters!'),
      firstname: yup
        .string()
        .required('Username is required!')
        .min(3, 'Must be at least 3 characters!')
        .max(20, 'Must be maximum 20 characters!'),
      lastname: yup
        .string()
        .required('Username is required!')
        .min(3, 'Must be at least 3 characters!')
        .max(20, 'Must be maximum 20 characters!')
    })
    return {
      successful: false,
      loading: false,
      message: '',
      schema,
      imageUrl: [],
      files: []
    }
  },
  mounted() {
    if (this.GStore.currentUser) {
      this.$router.push('/home')
    }
  },
  methods: {
    // eslint-disable-next-line
      handleRegister(user) {
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
          user.imageUrl = response.map((r) => r.data)
          AuthService.register(user).then(() => {
            this.GStore.flashMessage = 'You are successfully register'
            setTimeout(() => {
              this.GStore.flashMessage = ''
            }, 3000)
            this.$router.push({ name: 'Login' })
          })
          this.message = ''
          this.successful = false
          this.loading = true
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

<style scoped>
label {
  display: block;
  margin-top: 10px;
}
.img {
  width: 240px;
  height: 180px;
}
.card-container.card {
  max-width: 350px !important;
  padding: 40px 40px;
}
.card {
  background-color: #f7f7f7;
  padding: 20px 25px 30px;
  margin: 0 auto 25px;
  margin-top: 50px;
  -moz-border-radius: 2px;
  -webkit-border-radius: 2px;
  border-radius: 2px;
  -moz-box-shadow: opx 2px 2px rgba (0, 0, 0, 0.3);
  -webkit-box-shadow: Opx 2px 2px rgba(0, 0, 0, 0.3);
  box-shadow: Opx 2px 2px rgba(0, 0, 0, 0.3);
}
.profile-img-card {
  width: 96px;
  height: 96px;
  margin: 0 auto 10px;
  display: block;
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
  border-radius: 50%;
}
.error-feedback {
  color: red;
}
</style>
