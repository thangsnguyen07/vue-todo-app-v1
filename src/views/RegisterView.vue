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
            rules="required"
            v-slot="{ errors }"
            class="inputGroup"
          >
            <input
              v-model="email"
              placeholder="Enter your email"
              type="email"
            />
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
              type="text"
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
              type="text"
            />
            <span>{{ errors[0] }}</span>
          </ValidationProvider>

          <button type="submit">Register Now</button>
        </form>
      </ValidationObserver>
      <div>
        <p class="text-white">
          Already have an account? <a href="/login">Login</a>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { ValidationProvider, ValidationObserver, extend } from "vee-validate";
import { required, confirmed } from "vee-validate/dist/rules";

import { mapActions, mapState } from "vuex";

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
    };
  },
  computed: { ...mapState("auth", ["user", "token"]) },
  methods: {
    ...mapActions("auth", ["register"]),
    onSubmit: function () {
      const formData = {
        name: this.name,
        email: this.email,
        age: this.age,
        password: this.password,
      };
      this.register(formData);
    },
  },
};

// Validation
extend("required", {
  ...required,
  message: "This field is required",
});

extend("min", {
  validate(value, { length }) {
    if (value.length >= length) return true;
    return `Min length is ${length} characters`;
  },
  params: ["length"],
});

extend("max", {
  validate(value, { length }) {
    if (value.length <= length) return true;
    return `Max length is ${length} characters`;
  },
  params: ["length"],
});

extend("numberic", (value) => {
  if (!isNaN(value)) return true;
  return "Age is not valid";
});

extend("min-value", {
  validate(value, { min }) {
    if (!isNaN(value) && Number(value) >= Number(min)) return true;
    return `Min age is ${min}`;
  },
  params: ["min"],
});

extend("confirmed", {
  ...confirmed,
  message: "Password does not match",
});
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
