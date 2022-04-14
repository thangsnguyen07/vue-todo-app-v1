<template>
  <nav>
    <div>
      <router-link to="/">Home</router-link>
      <router-link to="/profile">Profile</router-link>
    </div>
    <div v-if="!user">
      <router-link to="/login">Login</router-link>
      <router-link to="/register">Register</router-link>
    </div>
    <div v-if="user">
      <button :disabled="loading" @click="onLogout()">Logout</button>
    </div>
  </nav>
</template>
<script>
import { mapActions, mapMutations, mapState } from "vuex";
export default {
  data() {
    return {
      loading: false,
    };
  },
  computed: {
    ...mapState("auth", ["user"]),
  },
  methods: {
    ...mapActions("auth", ["logout"]),
    ...mapMutations("notification", ["triggerToast"]),
    onLogout: async function () {
      this.loading = true;
      const response = await this.logout();
      if (response.success) {
        this.triggerToast({
          status: "success",
          message: "Logout successfully.",
        });
        this.loading = false;
        this.$router.push({ path: "/login" });
      } else {
        this.triggerToast({
          status: "danger",
          message: response.error,
        });
        this.loading = false;
      }
    },
  },
};
</script>
<style scoped>
nav {
  height: 60px;
  padding: 0 40px;
  background-color: rgba(0, 0, 0, 0.2);
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
</style>
