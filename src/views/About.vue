<template>
  <div class="about">
    <h1>Welcome to the room!</h1>
    <form v-if="formusername" @submit.prevent="userJoinRoom">
      <input v-model="newuser" type="text" placeholder="username">
      <button type="submit">join</button>
    </form>
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
      console.log(this.$store.state.objectData)
      return this.$store.state.objectData
    }
  },
  methods: {
    fetchData () {
      console.log('masuk ke bawa', this.$route.params.room)
      this.$store.dispatch('updateData', this.$route.params.room)
    },
    userJoinRoom () {
      console.log(this.newuser)
      this.$store.dispatch('addPlayer', { room: this.$route.params.room, newuser: this.newuser })
    }
  },
  created () {
    this.fetchData()
  }
}
</script>
