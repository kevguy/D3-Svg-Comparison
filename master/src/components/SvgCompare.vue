<template>
  <div class="hello">
    <select v-model="selectedScale">
      <option>1</option>
      <option>2</option>
      <option>4</option>
      <option>8</option>
    </select>
    <div id="svg-canvas">
    </div>
  </div>
</template>

<script>
import * as PIXI from 'pixi.js'
import { mapGetters } from 'vuex'
// const androidImage = require('../assets/svg-files/android-logo.svg')

export default {
  name: 'svg-compare',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      renderer: null,
      container: null,
      stage: null,
      bunny: null,
      androidLogo: null,
      selectedScale: 1
    }
  },
  computed: {
    // mix the getters into computed with object spread operator
    ...mapGetters({
      chosenImage: 'retrieveImage'
    })
  },
  watch: {
    selectedScale (newVal) {
      if (this.androidLogo) {
        this.androidLogo.scale.x = newVal
        this.androidLogo.scale.y = newVal
      }
    },
    chosenImage (newVal) {
      this.reset()
      this.initSvgCanvas()
    }
  },
  created () { },
  mounted () {
    this.initSvgCanvas()
  },
  beforeDestroy () {
    this.reset()
  },
  methods: {
    reset () {
      this.container.destroy()
      this.renderer.destroy()

      Array.from(document.getElementsByTagName('canvas')).forEach((el) => {
        el.parentElement.removeChild(el)
      })
    },
    animate () {
      requestAnimationFrame(this.animate)
      this.bunny.rotation += 0.1

      // render the container
      this.renderer.render(this.stage)
    },
    initSvgCanvas () {
      console.log(PIXI)
      this.renderer = new PIXI.Application(800, 600, {backgroundColor: 0x1099bb})
      document.getElementById('svg-canvas').innerHTML = ''
      // document.getElementById('svg-canvas').appendChild(this.renderer.view)
      document.getElementById('svg-canvas').appendChild(this.renderer.view)
      this.container = new PIXI.Container()
      this.stage = this.renderer.stage
      this.stage.addChild(this.container)

      const serializedSvg = '<?xml version="1.0" encoding="UTF-8" standalone="no"?> <svg xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:cc="http://creativecommons.org/ns#" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" width="31.818079" height="45.147041" viewBox="0 0 31.818079 45.147041" id="svg2" version="1.1"> <defs id="defs4" /> <metadata id="metadata7"> <rdf:RDF> <cc:Work rdf:about=""> <dc:format>image/svg+xml</dc:format> <dc:type rdf:resource="http://purl.org/dc/dcmitype/StillImage" /> <dc:title></dc:title> </cc:Work> </rdf:RDF> </metadata> <g transform="translate(-0.12926931,-988.46553)" id="layer1"> <path style="opacity:1;fill:#ba8500;fill-opacity:1;stroke:none;stroke-width:1;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" d="m 10.751928,988.59808 c -1.9694019,-0.0197 -3.6372455,0.99804 -3.6372455,2.62011 l 0,13.85491 c 4.384e-4,0.481 -0.3896616,0.8712 -0.8707394,0.8707 l -3.9038968,0 c -0.9033766,0 -1.60196836,0.6999 -1.60196836,1.6043 0,0.9044 0.69762626,1.602 1.60196836,1.602 l 3.9038968,0 c 0.4810778,-3e-4 0.8711778,0.3897 0.8707394,0.8707 l 0,20.0126 c 0,0.8302 0.1769703,1.4944 0.4498028,1.8834 0.2728312,0.3892 0.591211,0.5966 1.3109201,0.5966 0.7702837,0 1.0303352,-0.1949 1.2748396,-0.5869 0.244504,-0.3921 0.392074,-1.1044 0.392073,-1.9845 l 0,-1.7222 c 0,-1.5022 1.237448,-1.6951 2.739704,-1.6951 l 5.828183,0 c 1.502255,0 2.739703,0.1929 2.739703,1.6951 l 0,2.0157 c 0,0.8205 0.140867,1.4376 0.355993,1.7583 0.215126,0.3208 0.463055,0.5004 1.23876,0.5004 0.722664,0 1.02629,-0.2014 1.289272,-0.5822 0.262981,-0.3807 0.432964,-1.0425 0.432964,-1.8786 l 0,-20.0126 c -4.38e-4,-0.481 0.389662,-0.871 0.87074,-0.8707 l 3.682603,0 c 0.904342,0 1.604374,-0.6986 1.604374,-1.602 0,-0.9033 -0.700997,-1.6043 -1.604374,-1.6043 l -3.682603,0 c -0.481078,5e-4 -0.871178,-0.3897 -0.87074,-0.8707 l 0,-13.85491 c 0,-1.33758 -1.115978,-2.52048 -3.141742,-2.59264 -1.745732,-0.0628 -3.597139,0.93732 -3.597139,2.54584 l 0,2.77618 c 0,1.04706 -0.862488,1.48796 -1.909541,1.48796 l -0.536483,0 c -1.047053,0 -1.90954,-0.4409 -1.90954,-1.48796 l 0,-2.68073 c 0,-1.64362 -1.367284,-2.64905 -3.320524,-2.66876 z" id="path4195" /> <path style="opacity:1;fill:#efaf14;fill-opacity:1;stroke:none;stroke-width:1;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" d="m 10.836553,989.15819 c -1.3307328,-0.0136 -2.5099529,0.45764 -3.1438037,1.25802 0.5004057,-0.0776 0.9727445,-0.13707 1.3470007,-0.13707 2.021576,0 3.421262,0.0776 3.576768,1.24361 0.155505,1.1664 -0.155201,5.44248 1.166599,5.28693 0.833868,-0.0985 2.006652,-0.35173 2.857565,-0.81774 -0.01355,1.2e-4 -0.02487,0 -0.03849,0 l -0.536394,0 c -1.047054,0 -1.90745,-0.44176 -1.90745,-1.48894 l 0,-2.67963 c 0,-1.64362 -1.368559,-2.65028 -3.321799,-2.66998 z m 11.273915,0.0296 c -1.428208,-0.0517 -2.91037,0.61651 -3.408394,1.73906 1.757099,-0.43006 3.973415,-0.67181 4.567776,0.44261 0.622023,1.16628 -7.76e-4,6.60801 0.07697,8.47405 0.07775,1.86609 -1.009884,5.67629 0.389668,6.92029 1.399553,1.2441 3.187527,1.5537 4.820338,1.3204 0.817371,-0.117 1.905479,0.101 2.770973,0.5196 0.04883,-0.1559 0.08179,-0.3182 0.08179,-0.4931 0,-0.9033 -0.700998,-1.6043 -1.604374,-1.6043 l -3.682604,0 c -0.481078,5e-4 -0.871177,-0.3897 -0.870739,-0.8707 l 0,-13.8549 c 0,-1.33758 -1.115635,-2.52085 -3.141403,-2.59301 z" id="path4195-5" /> <path style="opacity:1;fill:#875f00;fill-opacity:1;stroke:none;stroke-width:1;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" d="m 2.2687276,1005.9607 c -0.9033766,0 -1.60196835,0.6999 -1.60196835,1.6043 0,0.9043 0.69762625,1.602 1.60196835,1.602 l 3.9038968,0 c 0.4810778,-4e-4 0.8711778,0.3897 0.8707394,0.8707 l 0,20.0126 c 0,0.8302 0.1769703,1.4943 0.4498028,1.8834 0.2728312,0.3892 0.591211,0.5965 1.3109201,0.5965 0.7702837,0 1.0303339,-0.1949 1.2748383,-0.5869 0.244504,-0.3921 0.392075,-1.1043 0.392074,-1.9844 l 0,-1.7222 c 0,-1.5022 1.237448,-1.6958 2.739703,-1.6958 l 5.828183,0 c 1.502255,0 2.739703,0.1936 2.739703,1.6958 l 0,2.0157 c 0,0.8204 0.140868,1.4376 0.355994,1.7583 0.215126,0.3208 0.463054,0.5003 1.238759,0.5003 0.722664,0 1.02629,-0.2013 1.289272,-0.5821 0.262981,-0.3807 0.432965,-1.0425 0.432965,-1.8786 l 0,-1.5658 c -0.01145,-0.012 -0.02741,-0.019 -0.03849,-0.03 -1.710565,-1.555 -2.409217,-3.4206 -4.89731,-4.1203 -2.488094,-0.6998 -4.82179,-0.6212 -7.309884,0.1564 -2.488092,0.7774 -1.942992,3.186 -2.9537795,2.3307 -1.0107881,-0.8553 -0.2325437,-6.4517 -0.3102911,-8.551 -0.077747,-2.0993 0.7764426,-8.0089 -1.0896265,-10.2637 -0.9902484,-1.1966 -1.9585532,-1.7628 -2.6699481,-2.0469 z" id="path4195-9" /> <path style="opacity:1;fill:none;fill-opacity:1;stroke:#000000;stroke-width:1.23154354;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" d="m 10.758891,989.08159 c -1.9694017,-0.0197 -3.6372454,0.99804 -3.6372454,2.6201 l 0,13.85481 c 4.385e-4,0.481 -0.3896616,0.8712 -0.8707394,0.8707 l -3.9038968,0 c -0.9033766,0 -1.60196832,0.6999 -1.60196832,1.6043 0,0.9043 0.69762622,1.602 1.60196832,1.602 l 3.9038968,0 c 0.4810778,-4e-4 0.8711779,0.3897 0.8707394,0.8707 l 0,20.0126 c 0,0.8302 0.1769704,1.4943 0.4498028,1.8834 0.2728312,0.3892 0.5912111,0.5966 1.3109202,0.5966 0.7702836,0 1.0303351,-0.1949 1.2748394,-0.5869 0.244504,-0.3921 0.392074,-1.1044 0.392073,-1.9845 l 0,-1.7222 c 0,-1.5022 1.237449,-1.6951 2.739704,-1.6951 l 5.828183,0 c 1.502255,0 2.739703,0.1929 2.739703,1.6951 l 0,2.0157 c 0,0.8204 0.140868,1.4376 0.355994,1.7583 0.215126,0.3208 0.463054,0.5003 1.238759,0.5003 0.722665,0 1.02629,-0.2013 1.289272,-0.5821 0.262981,-0.3807 0.432964,-1.0425 0.432964,-1.8786 l 0,-20.0126 c -4.38e-4,-0.481 0.389663,-0.8711 0.87074,-0.8707 l 3.682604,0 c 0.904342,0 1.604373,-0.6986 1.604373,-1.602 0,-0.9033 -0.700997,-1.6043 -1.604373,-1.6043 l -3.682604,0 c -0.481077,5e-4 -0.871178,-0.3897 -0.87074,-0.8707 l 0,-13.85481 c 0,-1.33757 -1.115978,-2.52047 -3.141742,-2.59264 -1.745732,-0.0628 -3.597139,0.93733 -3.597139,2.54585 l 0,2.77618 c 0,1.04706 -0.862488,1.48795 -1.909541,1.48795 l -0.536483,0 c -1.047053,0 -1.90954,-0.44089 -1.90954,-1.48795 l 0,-2.68074 c 0,-1.64362 -1.367284,-2.64905 -3.320524,-2.66875 z" id="path4195-8" /> <rect style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:#efaf14;stroke-width:1.23154354;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" id="rect4233" width="9.9523754" height="11.196422" x="11.373137" y="1011.0392" rx="2.9056232" ry="2.9056232" /> <path style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:#efaf14;stroke-width:0.84114426;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" d="m 9.8782858,990.70587 1.5124012,0 c 0.78773,0 1.421895,0.63412 1.421895,1.42182 l 0,2.83431 c 0,1.71665 -0.862234,1.81665 -2.216977,3.17134 -1.1207889,-1.1207 -2.1392138,-1.17095 -2.1392138,-3.17134 l 0,-2.83431 c 0,-0.7877 0.6341649,-1.42182 1.4218946,-1.42182 z" id="rect4233-3" /> <path style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:#efaf14;stroke-width:0.84114426;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" d="m 21.191331,990.84171 1.512402,0 c 0.78773,0 1.421895,0.63412 1.421895,1.42181 l 0,2.83432 c 0,1.71664 -0.862235,1.81665 -2.216977,3.17134 -1.120789,-1.1207 -2.139214,-1.17095 -2.139214,-3.17134 l 0,-2.83432 c 0,-0.78769 0.634165,-1.42181 1.421894,-1.42181 z" id="rect4233-3-6" /> <rect style="opacity:1;fill:#000000;fill-opacity:1;stroke:none;stroke-width:0.58027852;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" id="rect4286" width="1.8818077" height="3.1305709" x="19.513754" y="1001.2766" rx="0.76223016" ry="0.76223016" /> <rect style="opacity:1;fill:#000000;fill-opacity:1;stroke:none;stroke-width:0.58027852;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" id="rect4286-9" width="1.8818077" height="3.1305709" x="10.767316" y="1001.3204" rx="0.76223016" ry="0.76223016" /> <rect style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:none;stroke-width:0.58027852;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" id="rect4286-9-1-6" width="3.2757361" height="3.2172124" x="14.392793" y="1005.8312" rx="0.5317775" ry="0.5317775" /> <rect style="opacity:1;fill:#000000;fill-opacity:1;stroke:none;stroke-width:0.58027852;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" id="rect4286-9-1" width="5.8047986" height="1.6777828" x="13.275428" y="1004.8306" rx="0.80775315" ry="0.80775315" /> </g> </svg>'

      const texture = PIXI.Texture.fromImage('data:image/svg+xml;charset=utf8,' + serializedSvg)
      this.bunny = new PIXI.Sprite(texture)

      const shit = PIXI.Texture.fromImage(this.chosenImage)
      // ./assets/logo.png
      this.androidLogo = new PIXI.Sprite(shit)

      this.bunny.anchor.x = 0.5
      this.bunny.anchor.y = 0.5

      this.bunny.position.x = 400
      this.bunny.position.y = 300

      this.androidLogo.anchor.x = 0.8
      this.androidLogo.anchor.y = 0.8

      this.androidLogo.position.x = 400
      this.androidLogo.position.y = 300

      this.androidLogo.scale.x = this.selectedScale
      this.androidLogo.scale.y = this.selectedScale

      this.container.addChild(this.bunny)
      this.container.addChild(this.androidLogo)
      // this.renderer.render(this.stage)
      // this.animate()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
