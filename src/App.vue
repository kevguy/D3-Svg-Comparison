<template>
  <div id="app">
    <select v-model="selectedMode">
      <!-- <option disabled value="">Please select one</option> -->
      <option v-for="item in modeList">{{item}}</option>
    </select>
    <select v-model="selectedImage">
      <!-- <option disabled value="">Please select one</option> -->
      <option v-for="item in imageList">{{item}}</option>
    </select>
    <!-- <img src="./assets/logo.png"> -->
    <div v-if="selectedMode === 'd3'">
      <d3-compare />
    </div>
    <div v-if="selectedMode === 'pixi'">
      <svg-compare />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import SvgCompare from './components/SvgCompare'
import D3Compare from './components/D3Compare'

export default {
  name: 'app',
  components: {
    'svg-compare': SvgCompare,
    'd3-compare': D3Compare
  },
  created () {
    this.selectedMode = this.$store.state.mode
    this.selectedImage = this.$store.state.chosenImage
  },
  data () {
    return {
      selectedMode: null,
      selectedImage: null
    }
  },
  computed: {
    // mix the getters into computed with object spread operator
    ...mapGetters({
      imageList: 'retrieveImageList',
      modeList: 'retrieveModeList'
    })
  },
  watch: {
    selectedMode (newVal) {
      this.$store.dispatch('CHOOSE_MODE', newVal)
    },
    selectedImage (newVal) {
      this.$store.dispatch('CHOOSE_IMAGE', newVal)
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
