<template>
   <div class="home">
    <p class="game-title"><strong>pacepetcepet</strong></p>
    <p class="announce-text"> <i>/ pa:cepèt[2] /</i> </p>
    <div class="desc">
    <p class="sub-desc">n.informal</p>
    <p class="detiled-text"> Are you the fastest in conquering this set of typing race? </p>
    </div>

    <!-- image -->
    <div class="container keyboard"></div>
    <!-- image -->

    <!-- form input vue bootstrap -->
    <div>
    <b-form-input v-model="text" placeholder="Enter your name"></b-form-input>
    <div class="mt-2">Ini dr vue boostrap ga keluar form nyaa uhuhuhu: {{ text }}</div>
    </div>
    <!-- form input vue bootstrap -->

    <p>ini yg dr awal adaa</p>
    <form @submit.prevent="createRoom()">
      <input v-model="username" type="text" placeholder="Enter your name">
      <button type="submit">Play!</button>
    </form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      text: ''
    }
  }
}
</script>

<style>
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
