export default function getUserFromLocal() {
  if (localStorage["vue-todo-app"]) {
    return JSON.parse(localStorage.getItem("vue-todo-app")).user;
  } else {
    return null;
  }
}
