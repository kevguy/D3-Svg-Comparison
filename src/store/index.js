import Vue from 'vue'
import Vuex from 'vuex'
import androidLogo from '../assets/svg-files/android-logo.svg'
import colorCircles from '../assets/svg-files/color-circles.svg'
import debianLogo from '../assets/svg-files/debian-logo.svg'
import effLogo from '../assets/svg-files/eff-logo.svg'
import heart from '../assets/svg-files/heart.svg'
import mozillaLogo from '../assets/svg-files/mozilla-logo.svg'
import rssLogo from '../assets/svg-files/rss-logo.svg'
import utensils from '../assets/svg-files/utensils.svg'
import warningSign from '../assets/svg-files/warning-sign.svg'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    mode: 'd3',
    chosenImage: 'android-logo',
    availableImages: {
      'android-logo': androidLogo,
      'color-circles': colorCircles,
      'debian-logo': debianLogo,
      'eff-logo': effLogo,
      heart,
      'mozilla-logo': mozillaLogo,
      'rss-logo': rssLogo,
      utensils,
      'warning-sign': warningSign
    },
    availableModes: [
      'd3',
      'pixi'
    ]
  },
  getters: {
    retrieveImage: state => {
      return state.availableImages[state.chosenImage]
    },
    retrieveImageList: state => {
      return Object.keys(state.availableImages)
    },
    retrieveModeList: state => {
      return state.availableModes
    }
  },
  mutations: {
    CHOOSE_MODE (state, payload) {
      state.mode = payload
    },
    CHOOSE_IMAGE (state, payload) {
      state.chosenImage = payload
    }
  },
  actions: {
    CHOOSE_MODE ({ commit }, data) {
      commit('CHOOSE_MODE', data)
    },
    CHOOSE_IMAGE ({ commit }, data) {
      commit('CHOOSE_IMAGE', data)
    }
  }
})
