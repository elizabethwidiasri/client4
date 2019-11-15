<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  methods: {
    playSound (sound) {
      if (sound) {
        var myAudio = new Audio(sound)
        myAudio.addEventListener('ended', function () {
          this.currentTime = 0
          this.play()
        }, false)
        myAudio.play()
      }
    }
  },
  created () {
    this.playSound('https://www.soundjay.com/free-music/barn-beat-01.mp3')
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
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
