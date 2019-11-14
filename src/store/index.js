import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router'
import db from '../config/firebase'
// const firebase = require('firebase/app')

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    objectData: '',
    username: '',
    linkroom: '',
    master: false
  },
  mutations: {
    ADD_DATA (state, payload) {
      state.objectData = payload
    },
    CHANGE_NAME (state, payload) {
      state.username = payload
    },
    CHANGE_ROOM (state, payload) {
      state.linkroom = payload
    },
    CHANGE_MASTER (state) {
      state.master = false
    }
  },
  actions: {
    create ({ commit, state }, payload) {
      console.log('masuk store')
      db.collection('room').add(
        {
          count: 1,
          player1: {
            username: payload,
            position: 0
          }
        }
      )
        .then((docRef) => {
          commit('CHANGE_NAME', payload)
          commit('CHANGE_ROOM', docRef.id)
          commit('CHANGE_MASTER')
          router.push(`/about/${state.linkroom}`)
          console.log('Document written with ID: ', docRef.id)
        })
        .catch(function (error) {
          console.error('Error adding document: ', error)
        })
    },
    updateData ({ commit, state }, payload) {
      commit('CHANGE_ROOM', payload)
      db.collection('room').doc(`${payload}`)
        .onSnapshot(function (doc) {
          commit('ADD_DATA', doc.data())
          console.log('makan <<<<<<<<<<<<<<')
          console.log('data saat ini', doc.data())
        })
    },
    addPlayer ({ commit, state }, payload) {
      db.collection('room').doc(`${payload.room}`).update({
        [`player${state.objectData.count + 1}`]: {
          username: payload.newuser,
          position: 0
        },
        count: state.objectData.count + 1
      })
        .then(function () {
          console.log('Document successfully written!')
        })
        .catch(function (error) {
          console.error('Error writing document: ', error)
        })
    }
  }
})
