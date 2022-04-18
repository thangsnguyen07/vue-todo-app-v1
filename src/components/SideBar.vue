<template>
  <div>
    <div class="sidebar" :class="{ show: show }">
      <div class="sidebar-header">
        <span class="sidebar-close" @click="handleClose()"
          ><i class="fa-solid fa-xmark"></i
        ></span>
      </div>
      <div class="sidebar-content">
        <div class="sidebar-menu">
          <!-- Not auth -->
          <div v-if="!user" style="margin-top: 20px">
            <div class="sidebar__menu-item" @click="handleClose()">
              <router-link to="/login">Login</router-link>
            </div>

            <div v-if="!user" class="sidebar__menu-item" @click="handleClose()">
              <router-link to="/register" @click="handleClose()">
                Register
              </router-link>
            </div>
          </div>

          <!-- Auth -->
          <div v-else style="margin-top: 20px">
            <div class="sidebar__menu-item" @click="handleClose()">
              <router-link to="/">Home</router-link>
            </div>

            <div class="sidebar__menu-item" @click="handleClose()">
              <router-link to="/profile" @click="handleClose()"
                >Profile</router-link
              >
            </div>

            <button
              style="margin-top: 30px"
              :disabled="loading"
              @click="handleLogout()"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
    <div @click="handleClose()" class="overlay" :class="{ show: show }"></div>
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
export default {
  computed: {
    ...mapState("auth", ["user"]),
    ...mapState("account/logout", ["loading"]),
  },
  props: {
    show: Boolean,
  },
  methods: {
    ...mapActions("account/logout", ["logout"]),
    handleClose: function () {
      this.$emit("onClose");
    },
    handleLogout: async function () {
      const response = await this.logout();
      if (response) {
        //Close sidebar
        this.$emit("onClose");
      }
    },
  },
};
</script>
<style scoped>
.sidebar {
  height: 100%;
  position: fixed;
  inset: 0;
  width: 300px;
  max-width: 100%;
  background-color: rgba(0, 0, 0, 0.9);
  z-index: 10;
  transform: translateX(-100%);
  transition: 0.3s ease;
  border-radius: 0 10px 10px 0;
}

.sidebar-header {
  width: 100%;
  padding: 80px 40px 0;
  display: flex;
  justify-content: flex-end;
}

.sidebar-content {
  display: flex;
  flex-direction: column;
  padding: 0 40px;
  height: 100%;

  font-weight: 600;
}

.sidebar-menu {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 2;
}

.sidebar__menu-item {
  margin-top: 20px;
  text-align: center;
}

.sidebar__menu-item > a {
  text-decoration: none;
  font-size: 20px;
  color: #fff;
}

.sidebar-close {
  font-size: 2rem;
  color: #fff;
}

.overlay {
  display: none;
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.6);
}

.sidebar.show {
  transform: translateX(0%);
}

.overlay.show {
  display: block;
}

button {
  border-radius: 4px;
  padding: 8px 16px;
  background-color: #1a936f;
  letter-spacing: 1px;
  border: none;
  color: #fff;

  font-size: 1rem;
}

button:disabled {
  background-color: #1a936f83;
  color: rgba(255, 255, 255, 0.534);
}
</style>