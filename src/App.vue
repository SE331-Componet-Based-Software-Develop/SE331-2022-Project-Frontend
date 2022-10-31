<template>
  <div id="flashMessage" v-if="GStore.flashMessage">
    {{ GStore.flashMessage }}
  </div>
  <nav class="navbar navbar-expand">
    <ul v-if="!GStore.currentUser" class="navbar-nav ml-auto">
      <li class="nav-item">
        <router-link to="/register" class="nav-link"
          ><font-awesome-icon icon="user-plus" />Sign Up</router-link
        >
      </li>
      <li class="nav-item">
        <router-link to="/login" class="nav-link">
          <font-awesome-icon icon="sign-in-alt" />Login</router-link
        >
      </li>
    </ul>
    <ul v-if="GStore.currentUser" class="navbar-nav ml-auto">
      <li class="nav-item" v-if="isAdmin">
        <router-link :to="{ name: 'home' }" class="nav-link">
          <font-awesome-icon icon="user" />
          {{ GStore.currentUser.name }} {{ GStore.currentUser.sur_name }}
        </router-link>
      </li>
      <li class="nav-item" v-else-if="isDoctor">
        <router-link
          :to="{ name: 'DoctorDetail', params: { id: GStore.currentUser.id } }"
          class="nav-link"
        >
          <font-awesome-icon icon="user" />
          {{ GStore.currentUser.name }} {{ GStore.currentUser.sur_name }}
        </router-link>
      </li>
      <li class="nav-item" v-else-if="isPatient">
        <router-link
          :to="{ name: 'PatientDetail', params: { id: GStore.currentUser.id } }"
          class="nav-link"
        >
          <font-awesome-icon icon="user" />
          {{ GStore.currentUser.name }} {{ GStore.currentUser.sur_name }}
        </router-link>
      </li>
      <li class="nav-item">
        <a class="nav-link" @click="logout">
          <font-awesome-icon icon="sign-out-alt" /> Logout</a
        >
      </li>
    </ul>
  </nav>

  <nav>
    <span v-if="isPatient">
      <router-link :to="{ name: 'home' }">Patient</router-link> |
    </span>
    <span v-if="isDoctor">
      <router-link :to="{ name: 'doctorhome' }">Doctor</router-link> |
    </span>
    <span v-if="isAdmin">
      <router-link
        :to="{
          name: 'VaccineDetail'
        }"
      >
        Vaccines
      </router-link>
      |
      <router-link
        :to="{
          name: 'AdminUser'
        }"
      >
        SetRole
      </router-link>
      |
    </span>
    <router-link :to="{ name: 'about' }">About us</router-link>
  </nav>
  <router-view />
</template>
<script>
import AuthService from './services/AuthService.js'
export default {
  inject: ['GStore'],
  computed: {
    currentUser() {
      return localStorage.getItem('user')
    },
    isAdmin() {
      return AuthService.hasRoles('ROLE_ADMIN')
    },
    isDoctor() {
      return AuthService.hasRoles('ROLE_DOCTOR')
    },
    isPatient() {
      return AuthService.hasRoles('ROLE_PATIENT')
    }
  },
  methods: {
    logout() {
      AuthService.logout()
      this.$router.push({ name: 'Login' })
    }
  }
}
</script>
<style>
@keyframes yellowfade {
  from {
    background: yellow;
  }
  to {
    background: transparent;
  }
}

#flashMessage {
  animation-name: yellowfade;
  animation-duration: 5 s;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
}
body {
  margin: 0;
  padding: 0;
  border: 0;
}

body {
  background: url('./assets/bc.jpg');
  width: 100%;
  height: 100%;
  background-position: absolute;
  background-attachment: fixed;
  background-repeat: no-repeat;
  background-size: 100% 100%;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
