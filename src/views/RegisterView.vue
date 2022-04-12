<template>
  <div class="form">
    <h1>This is Register page</h1>
    <!-- The ValidationObserver offers a handleSubmit function that you can use to protect your form submissions.  -->
    <ValidationObserver v-slot="{ handleSubmit }">
      <form @submit.prevent="handleSubmit(onSubmit)">
        <ValidationProvider
          rules="required|min:4|max:128"
          v-slot="{ errors }"
          class="inputGroup"
        >
          <input v-model="name" placeholder="name" type="text" />
          <span>{{ errors[0] }}</span>
        </ValidationProvider>

        <ValidationProvider
          rules="required"
          v-slot="{ errors }"
          class="inputGroup"
        >
          <input v-model="email" placeholder="email" type="email" />
          <span>{{ errors[0] }}</span>
        </ValidationProvider>

        <ValidationProvider
          rules="required|numberic|min-value:8"
          v-slot="{ errors }"
          class="inputGroup"
          name="age"
        >
          <input v-model="age" placeholder="age" type="text" />
          <span>{{ errors[0] }}</span>
        </ValidationProvider>

        <ValidationProvider
          rules="required|min:8"
          v-slot="{ errors }"
          vid="password"
          class="inputGroup"
        >
          <input v-model="password" placeholder="password" type="text" />
          <span>{{ errors[0] }}</span>
        </ValidationProvider>

        <ValidationProvider
          rules="required|confirmed:password"
          v-slot="{ errors }"
          class="inputGroup"
        >
          <input
            v-model="confirmPassword"
            placeholder="confirm password"
            type="text"
          />
          <span>{{ errors[0] }}</span>
        </ValidationProvider>

        <button type="submit">Submit</button>
      </form>
    </ValidationObserver>

    <p v-if="user">{{ user.email }}</p>
    <p v-if="token">{{ token }}</p>
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
.form {
  margin: 0 auto;
  max-width: 30%;
  display: flex;
  flex-direction: column;
}

.inputGroup {
  display: flex;
  flex-direction: column;
}
</style>
