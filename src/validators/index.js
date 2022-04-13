import { extend } from "vee-validate";

import { required, confirmed, email } from "vee-validate/dist/rules";

extend("required", {
  ...required,
  message: "This field is required",
});

extend("email", {
  ...email,
  message: "You should add a valid email address",
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
