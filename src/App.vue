<template>
  <div id="app">
    <nav-bar></nav-bar>
    <router-view></router-view>
    <!-- Toast -->
    <toast-message
      v-if="showToast"
      :status="status"
      :message="message"
    ></toast-message>
  </div>
</template>
<script>
import { mapState } from "vuex";
import ToastMessage from "./components/ToastMessage.vue";
import NavBar from "./components/NavBar.vue";
export default {
  components: {
    "toast-message": ToastMessage,
    "nav-bar": NavBar,
  },
  computed: {
    ...mapState("notification", ["showToast", "status", "message"]),
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background-image: url("./assets/background.jpg");
  position: fixed;
  inset: 0;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

input {
  padding: 8px 10px;
  border-radius: 5px;
  border: none;
}
</style>
