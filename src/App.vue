<template>
  <div id="app">
    <nav>
      <router-link to="/">Home</router-link>
      <div>
        <router-link to="/login">Login</router-link>
        <router-link to="/register">Register</router-link>
      </div>
    </nav>
    <router-view />
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background-image: url("./assets/background.jpg");
  position: fixed;
  inset: 0;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

nav {
  padding: 20px 40px;
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

input {
  padding: 8px 10px;
  border-radius: 5px;
  border: none;
}
</style>
