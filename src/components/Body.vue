<template>
   <div class="home">
    <p class="game-title" style="font-family: 'Abril Fatface', cursive; font-size: 90px; letter-spacing: 10px;"><strong>pacepetcepet</strong></p>
    <p class="announce-text"> <i>/ pa:cepèt[2] /</i> </p>
    <div class="desc">
    <p class="sub-desc">n.informal</p>
    </div>

    <!-- image -->
    <div class="container keyboard"></div>
    <!-- image -->
    <p class="detiled-text" style="font-family: 'Quicksand', sans-serif; font-size: 30px;"> Are you the fastest in conquering this set of typing race? </p>

    <form @submit.prevent="createRoom()">
      <!-- <input v-model="username" type="text" placeholder="Enter your name"> -->
          <b-form-input v-model="username" placeholder="Enter your name"></b-form-input>

      <button type="submit">Play!</button>
    </form>
    
  </div>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {
      username: ''
    }
  },
  methods: {
    createRoom () {
      console.log('roomCreated', this.username)
      this.$store.dispatch('create', this.username)
    }
  },
  created () {
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Calistoga&display=swap');
@import url('https://fonts.googleapis.com/css?family=Abril+Fatface&display=swap');
@import url('https://fonts.googleapis.com/css?family=Quicksand&display=swap');

.container {
  display: inline-block;
  background-repeat: no-repeat;
  background-image: url('../assets/orange.jpg');
  background-size: center;
  height: 500px;
  width: 900px;
  justify-content: flex-end;
  align-items: flex-end;
  margin-left: 300px;
}

</style>
