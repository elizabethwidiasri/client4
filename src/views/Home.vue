<template>
 <Body />
</template>

<script>
import Body from '../components/Body.vue'

export default {
  name: 'home',
  components: {
    Body
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
