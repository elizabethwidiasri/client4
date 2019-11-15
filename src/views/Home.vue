<template>
  <div class="home" style="">
    <form @submit.prevent="createRoom()">
      <input v-model="username" type="text" placeholder="username">
      <button type="submit">CreateRoom</button>
    </form>
  </div>
</template>

<script>
import Body from '../components/Body.vue'

export default {
  name: 'home',
  components: {
    Body
  }
}
</script>


