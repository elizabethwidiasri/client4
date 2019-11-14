<template>
  <div class="home" style="">
    <form @submit.prevent="createRoom()">
      <input v-model="username" type="text" placeholder="username">
      <button type="submit">CreateRoom</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'home',
  components: {

  },
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


