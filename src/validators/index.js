import { extend } from "vee-validate";

import {
  required,
  confirmed,
  email,
  min,
  max,
  numeric,
  min_value,
} from "vee-validate/dist/rules";

extend("required", {
  ...required,
  message: "This field is required",
});

extend("email", {
  ...email,
  message: "You should add a valid email address",
});

extend("min", {
  ...min,
  message: (_, { length }) => `Min length is ${length} characters`,
});

extend("max", {
  ...max,
  message: (_, { length }) => `Max length is ${length} characters`,
});

extend("numeric", {
  ...numeric,
  message: "Age must is a number",
});

extend("min_value", {
  ...min_value,
  message: (_, { min }) => `Min age is ${min}`,
});

extend("confirmed", {
  ...confirmed,
  message: "Password does not match",
});
