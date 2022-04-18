<template>
  <div>
    <div class="navbar-container">
      <!-- Navbar -->
      <nav>
        <div>
          <router-link to="/">Home</router-link>
          <router-link to="/profile">Profile</router-link>
        </div>

        <div v-if="!user">
          <router-link to="/login">Login</router-link>
          <router-link to="/register">Register</router-link>
        </div>
        <div v-else>
          <button :disabled="loading" @click="onLogout()">Logout</button>
        </div>
      </nav>
      <!-- Sidebar -->
      <span class="btn-sidebar" @click="showSidebar = true">
        <i class="fa-solid fa-bars"></i>
      </span>

      <sidebar :show="showSidebar" @onClose="showSidebar = false"></sidebar>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
import SideBar from "./SideBar.vue";
export default {
  data() {
    return {
      showSidebar: false,
    };
  },
  computed: {
    ...mapState("auth", ["user"]),
    ...mapState("account/logout", ["loading"]),
  },
  methods: {
    ...mapActions("account/logout", ["logout"]),
    onLogout: async function () {
      const response = await this.logout();
      if (response) {
        //Close sidebar
        this.showSidebar = false;
      }
    },
  },
  components: {
    sidebar: SideBar,
  },
};
</script>
<style scoped>
.navbar-container {
  height: 60px;
  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  padding: 0 40px;
}

nav {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

nav a {
  font-weight: bold;
  color: #eee;
  text-decoration: none;
  margin-right: 12px;
}

nav a:last-child {
  margin-right: 0;
}

nav a.router-link-exact-active {
  color: #42b983;
}

button {
  border-radius: 4px;
  padding: 8px 16px;
  background-color: #1a936f;
  letter-spacing: 1px;
  border: none;
  color: #fff;
  cursor: pointer;
}

button:disabled {
  cursor: default;
  background-color: #1a936f75;
  color: rgba(255, 255, 255, 0.5);
}

.btn-sidebar {
  display: none;
  color: #fff;
  font-size: 1.5rem;
}

@media only screen and (max-width: 576px) {
  .navbar-container {
    padding: 0 20px;
    justify-content: end;
  }
  nav {
    display: none;
  }
  .btn-sidebar {
    display: block;
  }
}
</style>