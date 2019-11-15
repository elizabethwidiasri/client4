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
      this.$store.dispatch('create', this.username)
    }
  },
  created () {
  }
}
</script>


