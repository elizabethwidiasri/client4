<template>
  <div id="app" oncopy="return false" oncut="return false" onpaste="return false">
    <b-navbar toggleable="lg" type="dark" variant="primary">
      <b-navbar-brand href="#" variant="light"><strong>BALAPAN NGETIK</strong></b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>

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
  </div>
</template>

<script>
import texts from '../assets/english'
export default {
  name: 'Game',
  data () {
    return {
      typing: '',
      typoIndex: -1,
      correctWord: 0,
      wpm: 0,
      started: '',
      time: 30,
      countTime: ''
    }
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
      return this.$store.state.objectData.text
      // return texts[0].text
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
      for (let i = 0; i < value.length; i++) {
        if (value[i] !== this.text[i]) {
          this.typoIndex = i
          break
        }
        this.typoIndex = -1
      }
      this.correctWord = this.typing.split(' ').length
      this.wpm = this.correctWord / ((Date.now() - this.started) / 60000)
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
            this.$router.push({ path: '/' })
            console.log('Document successfully updated!')
          })
          .catch(function (err) {
            console.error('Error writing document: ', err)
          })
        
        // hit database selesai
      }
      else if (value % 3 === 0) {
        // hit database
        this.$store.dispatch('updatePosition', {
          position: this.correctWord,
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
</style>
