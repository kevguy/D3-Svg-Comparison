<template>
  <div class="hello">
    <div id="svgEmbed"></div>
  </div>
</template>
<script type="text/javascript" src="//d3js.org/d3.v3.min.js"></script>
<script>
/* global d3 */
// import * as d3 from 'd3'
// import { event as currentEvent } from 'd3-selection'
// import * as d3Random from 'd3-random'
// import * as d3Scale from 'd3-scale'
import { mapGetters } from 'vuex'
// import androidImage from '../assets/svg-files/android-logo.svg'

export default {
  name: 'svg-compare',
  data () {
    return {
      width: 800,
      height: 600
    }
  },
  computed: {
    // mix the getters into computed with object spread operator
    ...mapGetters({
      chosenImage: 'retrieveImage'
    })
  },
  watch: {
    chosenImage (newVal) {
      this.reset()
      this.init()
    }
  },
  created () { },
  mounted () {
    this.init()
  },
  beforeDestroy () {
    this.reset()
  },
  methods: {
    reset () {
      d3.select('#svgEmbed').selectAll('svg').remove()
    },
    init () {
      const svg = d3.select('#svgEmbed').append('svg')
          .attr('width', this.width)
          .attr('height', this.height)
        .append('g')
          .call(d3.behavior.zoom().scaleExtent([1, 8]).on('zoom', zoom))
        .append('g')

      svg.append('rect')
          .attr('class', 'overlay')
          .attr('width', this.width)
          .attr('height', this.height)

      svg
        .append('image')
        .datum(this.chosenImage)
        .attr('height', this.height)
        .attr('width', this.width)
        .attr('xlink:href', function (d) { return d })

      function zoom () {
        svg.attr('transform', 'translate(' + d3.event.translate + ')scale(' + d3.event.scale + ')')
      }
    },
    testD3 () {
      const width = 960
      const height = 500

      const randomX = d3.random.normal(width / 2, 80)
      const randomY = d3.random.normal(height / 2, 80)

      const data = d3.range(2000).map(function () {
        return [
          randomX(),
          randomY()
        ]
      })

      const svg = d3.select('body').append('svg')
          .attr('width', width)
          .attr('height', height)
        .append('g')
          .call(d3.behavior.zoom().scaleExtent([1, 8]).on('zoom', zoom))
        .append('g')

      svg.append('rect')
          .attr('class', 'overlay')
          .attr('width', width)
          .attr('height', height)

      svg.selectAll('circle')
          .data(data)
        .enter().append('circle')
          .attr('r', 2.5)
          .attr('transform', function (d) { return 'translate(' + d + ')' })

      function zoom () {
        svg.attr('transform', 'translate(' + d3.event.translate + ')scale(' + d3.event.scale + ')')
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.overlay {
  fill: none;
  pointer-events: all;
}
</style>

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
