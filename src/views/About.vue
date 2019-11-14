<template>
  <div class="about">
    <h1>Welcome to the room!</h1>
    <form v-if="!getUser" @submit.prevent="userJoinRoom">
      <input v-model="newuser" type="text" placeholder="username">
      <button type="submit">join</button>
    </form>
    <button v-if="getMaster" @click="playNow">PLAY!</button>
    <button @click="updatePosition">UPDATE!</button>
    <div>
      {{ getData }}
      <p v-for="(data,key) in getData" :key="key">{{ data.username }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      formusername: true,
      newuser: ''
    }
  },
  computed: {
    getData () {
      return this.$store.state.objectData
    },
    getUser () {
      return this.$store.state.username
    },
    startGame () {
      return this.$store.state.objectData.playStatus
    },
    getMaster () {
      return this.$store.state.master
    }
  },
  watch: {
    startGame (value) {
      if (value){
        this.$router.push({ path: `/game/${this.$route.params.room}`})
      }
    }
  },
  methods: {
    fetchData () {
      this.$store.dispatch('fetchData', this.$route.params.room)
    },
    userJoinRoom () {
      this.$store.dispatch('addPlayer', { room: this.$route.params.room, newuser: this.newuser })
    },
    playNow () {
      this.$store.dispatch('playNow', this.$route.params.room)
    },
    updatePosition () {
      this.$store.dispatch('updatePosition', {
        room: this.$route.params.room,
        position: 20,
        wpm: 30,
      })
    }
  },
  created () {
    this.fetchData()
  }
}
</script>
