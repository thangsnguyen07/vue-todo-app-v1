<template>
  <div class="container">
    <div class="wrapper">
      <h1>Registration</h1>
      <!-- The ValidationObserver offers a handleSubmit function that you can use to protect your form submissions.  -->
      <ValidationObserver v-slot="{ handleSubmit }">
        <form @submit.prevent="handleSubmit(onSubmit)">
          <ValidationProvider
            rules="required|min:4|max:128"
            v-slot="{ errors }"
            class="inputGroup"
          >
            <input v-model="name" placeholder="Enter your name" type="text" />
            <span>{{ errors[0] }}</span>
          </ValidationProvider>

          <ValidationProvider
            rules="required|email"
            v-slot="{ errors }"
            class="inputGroup"
          >
            <input v-model="email" placeholder="Enter your email" type="text" />
            <span>{{ errors[0] }}</span>
          </ValidationProvider>

          <ValidationProvider
            rules="required|numberic|min-value:8"
            v-slot="{ errors }"
            class="inputGroup"
            name="age"
          >
            <input v-model="age" placeholder="Enter your age" type="text" />
            <span>{{ errors[0] }}</span>
          </ValidationProvider>

          <ValidationProvider
            rules="required|min:8"
            v-slot="{ errors }"
            vid="password"
            class="inputGroup"
          >
            <input
              v-model="password"
              placeholder="Create password"
              type="password"
            />
            <span>{{ errors[0] }}</span>
          </ValidationProvider>

          <ValidationProvider
            rules="required|confirmed:password"
            v-slot="{ errors }"
            class="inputGroup"
          >
            <input
              v-model="confirmPassword"
              placeholder="Confirm password"
              type="password"
            />
            <span>{{ errors[0] }}</span>
          </ValidationProvider>

          <button :disabled="loading" type="submit">Register Now</button>
        </form>
      </ValidationObserver>
      <div>
        <p class="text-white">
          Already have an account?
          <router-link :to="'/login'">Login</router-link>
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
      name: "",
      email: "",
      age: "",
      password: "",
      confirmPassword: "",

      loading: false,
    };
  },
  methods: {
    ...mapActions("auth", ["register"]),
    ...mapMutations("notification", ["triggerToast"]),
    onSubmit: async function () {
      this.loading = true;
      const formData = {
        name: this.name,
        email: this.email,
        age: this.age,
        password: this.password,
      };
      const isSuccess = await this.register(formData);
      if (isSuccess) {
        this.triggerToast({
          status: "success",
          message: "Register successfully.",
        });
        this.loading = false;
        this.$router.push({ path: "/" });
      } else {
        this.triggerToast({
          status: "danger",
          message: "Email is already exist.",
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
