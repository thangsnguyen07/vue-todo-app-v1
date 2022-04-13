<template>
  <div class="container">
    <div class="wrapper">
      <h1>Login</h1>
      <!-- The ValidationObserver offers a handleSubmit function that you can use to protect your form submissions.  -->
      <ValidationObserver v-slot="{ handleSubmit }">
        <form @submit.prevent="handleSubmit(onSubmit)">
          <ValidationProvider
            rules="required|email"
            v-slot="{ errors }"
            class="inputGroup"
          >
            <input v-model="email" placeholder="Enter your email" type="text" />
            <span>{{ errors[0] }}</span>
          </ValidationProvider>

          <ValidationProvider
            rules="required"
            v-slot="{ errors }"
            vid="password"
            class="inputGroup"
          >
            <input
              v-model="password"
              placeholder="Enter password"
              type="password"
            />
            <span>{{ errors[0] }}</span>
          </ValidationProvider>

          <button :disabled="loading" type="submit">Login</button>
        </form>
      </ValidationObserver>
      <div>
        <p class="text-white">
          Not have an account?
          <router-link :to="'/register'">Register now</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { ValidationProvider, ValidationObserver } from "vee-validate";
import { mapActions, mapMutations } from "vuex";

export default {
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data() {
    return {
      email: "",
      password: "",

      loading: false,
    };
  },
  methods: {
    ...mapActions("auth", ["login"]),
    ...mapMutations("notification", ["triggerToast"]),
    onSubmit: async function () {
      this.loading = true;
      const loginForm = {
        email: this.email,
        password: this.password,
      };
      const isSuccess = await this.login(loginForm);
      if (isSuccess) {
        this.triggerToast({
          status: "success",
          message: "Login successfully.",
        });
        this.loading = false;
        this.$router.push({ path: "/" });
      } else {
        this.triggerToast({
          status: "danger",
          message: "Email or password is not correct.",
        });
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

h1 {
  color: #eee;
  margin-bottom: 12px;
}
.text-white {
  color: #eee;
}
.wrapper {
  padding: 32px 38px;
  margin: 0 auto;
  width: 400px;
  display: flex;
  flex-direction: column;
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: 5px;
}

.inputGroup {
  display: flex;
  flex-direction: column;
  margin-top: 12px;
}

span {
  margin-top: 5px;
  font-size: 0.75rem;
  color: #ff0033;
}

button {
  margin: 36px 0;
  width: 100%;
  border-radius: 4px;
  padding: 8px;
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

a {
  color: #1a936f;
  font-weight: bold;
}
@media only screen and (max-width: 576px) {
  .container {
    padding: 0 20px;
  }
  .wrapper {
    max-width: 100%;
  }
}
</style>
