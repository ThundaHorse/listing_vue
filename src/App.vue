<template>
  <div id="app">
    <ul class="nav navbar-dark bg-dark nav-tabs">
      <li class="nav-item">
        <a class="nav-link" href="/">Home</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="/postings">Postings</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="/newpost">New Post</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="/signup">Sign Up</a>
      </li>
      <li class="nav-item dropdown">
        <a
          class="nav-link dropdown-toggle"
          data-toggle="dropdown"
          href="#"
          role="button"
          aria-haspopup="true"
          aria-expanded="false"
        >Account Info</a>
        <div class="dropdown-menu">
          <a class="dropdown-item" href="/login">Log In</a>
          <div class="dropdown-divider"></div>
          <a class="dropdown-item" href="/logout">Log Out</a>
          <!-- <div class="dropdown-divider"></div> -->
        </div>
      </li>
    </ul>
    <router-view />
  </div>
</template>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}
#nav a.router-link-exact-active {
  color: #42b983;
}
</style>

<script>
function loggedIn() {
  if (localStorage.getItem("jwt")) {
    return true;
  } else {
    return false;
  }
}
</script>