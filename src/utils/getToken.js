export default function getToken() {
  if (localStorage["vue-todo-app"]) {
    return JSON.parse(localStorage.getItem("vue-todo-app")).token;
  } else {
    return null;
  }
}
