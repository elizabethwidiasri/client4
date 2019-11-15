<template>
<div class="game">
  <result v-if="finish"></result>
  <div v-if="!finish" id="app" oncopy="return false" oncut="return false" onpaste="return false">
    <b-navbar toggleable="lg" type="dark" variant="primary">
      <b-navbar-brand href="#" variant="light"><strong>BALAPAN NGETIK</strong></b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <div>

    </div>
    <b-container class="mt-5">
      <b-container class="gamecontainer">
        <b-row class="my-5">
          <div class="paragraph" v-html="outputHTML">
          </div>
          <div>
            <h4>{{ time }}</h4>
          </div>
          <div class="typer">
            <textarea
              autofocus="autofocus"
              v-model="typing"
              placeholder="start typing here"
              @keydown="prevent">
            </textarea>
            <div v-if="typoIndex != -1" class="alert alert-danger alert-dismissible fade show">
              WRONG TYPING!
            </div>
          </div>
          <h4>{{ wpm.toFixed(0) }} WPM</h4>
        </b-row>
      </b-container>
    </b-container>

    {{ players }}
    <div class="animation">
      <div class="track" v-for="(player, i) in players" :key="i">
        <div class="emot" :style="'margin-left:'+posisi+'%;'">{{ emojiList[i] }}</div>
        <div class="name">{{ player.username }}</div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import texts from '../assets/english'
import result from '../components/result'
// import texts from '../assets/english'
export default {
  name: 'Game',
  data () {
    return {
      typing: '',
      typoIndex: -1,
      correctWord: 0,
      wpm: 0,
      finish: false,
      started: '',
      time: 30,
      countTime: '',
      emojiList: ['🐶', '🐹', '🐰', '🦊', '🦝', '🐻', '🐼', '🐨', '🐯', '🦁', '🐮', '🐷', '🐸', '🙉', '🐔', '🐧', '🐥', '🦉', '🐺', '🐴', '🦋', '🐌', '🐞', '🐳', '🦍', '🐘', '🦔']
    }
  },
  components: {
    result
  },
  computed: {
    splitText () {
      return this.text.split(' ')
    },
    outputHTML: function () {
      let newHTML = '<span class="correct">'
      if (this.typoIndex === -1) {
        // we do not have a typo index
        newHTML += this.text.substr(0, this.typing.length)
        newHTML += '</span>'
        newHTML += this.text.substr(this.typing.length)

        return newHTML
      }
      // else we have a typo index
      newHTML += this.text.substr(0, this.typoIndex)
      newHTML += '</span>'
      newHTML += '<span class="typo">'
      newHTML += this.text.substring(this.typoIndex, this.typing.length)
      newHTML += '</span>'
      newHTML += this.text.substr(this.typing.length)

      return newHTML
    },
    text () {
      // return this.$store.state.objectData.text
      return "evans"
    },
    posisi () {
      if (this.$store.state.objectData) {
        console.log(((this.$store.state.objectData.player1.position) / this.text.length) * 100);
        
        return (((this.$store.state.objectData.player1.position) / this.text.length) * 100)
      } else {
        return 0
      }
    },
    players () {
      const player = Object.values(this.$store.state.objectData)
      return player.slice(2, player.length - 1)
    }
  },
  methods: {
    // setter
    prevent: function (e) {
      const index = this.typing.length - 1
      if (this.typing[index] !== this.text[index] && e.key !== 'Backspace') {
        e.preventDefault()
      } else if (this.typing[index] === this.text[index] && e.key === 'Backspace') {
        e.preventDefault()
      }
    },
    minTime () {
      this.time -= 1
    }
  },
  watch: {
    typing (value) {
      if(value.length === this.text.length){
        this.finish = true
      }
      else {
        for (let i = 0; i < value.length; i++) {
          if (value[i] !== this.text[i]) {
            this.typoIndex = i
            break
          }
          this.typoIndex = -1
        }
        this.correctWord = this.typing.split(' ').length
        this.wpm = this.correctWord / ((Date.now() - this.started) / 60000)
      }
    },
    time (value) {
      if (value === 0) {
        clearTimeout(this.countTime)
        const lastposition = this.correctWord
        const lastwpm = this.wpm

        this.$store.dispatch('updatePosition', {
          position: lastposition,
          wpm: lastwpm,
          room: this.$route.params.room
        })
          .then(() => {
            alert(`game selesai, WPM kamu sebesar ${lastwpm.toFixed(1)} dengan kata yang benar sebanyak ${lastposition}`)
            // this.$router.push({ path: '/' })
            this.finish = true
            console.log('Document successfully updated!')
          })
          .catch(function (err) {
            console.error('Error writing document: ', err)
          })

        // hit database selesai
      } else if (value % 3 === 0) {
        // hit database
        this.$store.dispatch('updatePosition', {
          position: this.typing.length,
          wpm: this.wpm,
          room: this.$route.params.room
        })
      }
    }
  },
  mounted () {
    this.started = Date.now()
    this.countTime = setInterval(this.minTime, 1000)
  }
}
</script>

<style>
  .gamecontainer {
    max-width: 700px;
    font-size: 22px;
    text-align: left;
  }
  .paragraph {
    margin-bottom: 50px;
  }
  textarea {
    width: 100%;
    background: transparent;
  }
  .typer {
    width: 100%;
  }
  .correct {
    color: rgb(51, 255, 0);
    font-size: 22px;
  }
  .typo {
    color: #f00;
    font-size: 23px;
  }

  .track {
    color: aliceblue;
    background-image: url('../assets/track.jpg');
    background-size: 100% 100%;
    height: 100px;
    display: flex;
    align-items: center;
    padding: 0px 10% 0px 5%;
  }
  .emot{
    font-size: 60px;
  }
  .name{
    color: bisque;
    background-color: black;
    border-radius: 20%;
    padding: 5px;
    font-size: 20px;
  }
</style>
