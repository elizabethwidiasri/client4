<template>
   <div class="home">
    <p class="game-title"><strong>pacepetcepet</strong></p>
    <p class="announce-text"> <i>/ pa:cepèt[2] /</i> </p>
    <div class="desc">
    <p class="sub-desc">n.informal</p>
    <p class="detiled-text"> Are you the fastest in covering this set of typing course? </p>
    </div>
    <form @submit.prevent="createRoom()">
      <input v-model="username" type="text" placeholder="username">
      <button type="submit">CreateRoomSSSSS</button>
    </form>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>