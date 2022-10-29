<template>
  <div id="flashMessage" v-if="GStore.flashMessage">
    {{ GStore.flashMessage }}
  </div>
  <div>
    <nav>
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
          <li class="nav-item">
            <router-link to="/profile" class="nav-link">
              <font-awesome-icon icon="user" />
              {{ GStore.currentUser.name }}
            </router-link>
          </li>
          <li class="nav-item">
            <a class="nav-link" @click="logout">
              <font-awesome-icon icon="sign-out-alt" />Logout</a
            >
          </li>
        </ul>
      </nav>
      <router-link :to="{ name: 'home' }"> Home</router-link> |
      <router-link :to="{ name: 'VaccineDetail' }">Vaccine</router-link> |
      <router-link :to="{ name: 'about' }">About us</router-link>
    </nav>
    <router-view />
  </div>
</template>
<script>
export default {
  inject: ['GStore']
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
