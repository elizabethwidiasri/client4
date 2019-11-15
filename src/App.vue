<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">
          <p class="game-title text-white" style="font-family: 'Abril Fatface', cursive; font-size: 90px; letter-spacing: 10px; text-decoration: none; "><strong>pacepetcepet</strong></p>
      </router-link>
    </div>
    <router-view/>
  </div>
</template>

<style>

body, html {
  height: 100vh;
  margin: 0;
}

#app {
  /* background-image: url('./assets/orange.jpg'); */
  background-color: #F4BF6F;
  background-repeat: no-repeat;
  /* background-size: cover; */
  object-fit: contain;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}

#nav {
  padding: 20px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

@import url('https://fonts.googleapis.com/css?family=Abril+Fatface&display=swap');
@import url('https://fonts.googleapis.com/css?family=Quicksand&display=swap');



</style>
