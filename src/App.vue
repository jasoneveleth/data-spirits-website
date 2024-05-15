<template>
  <div class="main-content vbox">
    <topbar/>
    <div class="hbox weird-height">
      <div class="side-bar">
        <barchart_settings @play1="x => play1(x)" @selectedBar="selectTheBar"/>
        <heatmap_settings @heatmapClick="handleHeatClick" :enableButton="using_barchart"/>
      </div>
      <barchart v-if="using_barchart" :play1="playing1" :dataStr="dataStr"/>
      <heatmap v-if="!using_barchart"/>
    </div>
  </div>
</template>

<script>
import mybutton from "./components/mybutton.vue"
import barchart_settings from "./components/barchart_settings.vue"
import heatmap_settings from "./components/heatmap_settings.vue"
import barchart from "./components/barchart.vue"
import heatmap from "./components/heatmap.vue"
import topbar from "./components/topbar.vue"

export default{
  components: {mybutton, barchart_settings, heatmap_settings, barchart, heatmap, topbar},
  data() {
    return {
      using_barchart: true,
      playing1: false,
      playing2: false,
      dataStr: [],
      dataFile: `${__VITE_BASE_PATH__}wine_yearly.json`,
    }
  },
  methods: {
    play1(x) {
      console.log("play1!!!")
      this.using_barchart = true
      this.playing1 = x
    },
    handleHeatClick() {
      console.log("heat click")
      this.using_barchart = false
    },
    async selectTheBar(x) {
      this.dataFile = `${__VITE_BASE_PATH__}${x}.json`
      this.using_barchart = true
      let res = await fetch(this.dataFile)
      this.dataStr = JSON.parse(await res.text())
    }
  },
  async mounted() {
      let res = await fetch(this.dataFile)
      this.dataStr = JSON.parse(await res.text())
  },
}
</script>

<style>
:root {
  --background-grey: #E6E8EB;
  --text-grey: #9FA2A9;
  --blue: #639AF8;
  --yellow: #ffcc00;
  --green: #98c379;
  --yellow: #e5c07b;
  --dark-yellow: #d19a66;
  --purple: #c678dd;
  --aqua: #56b6c2;
  --red: #E06C75;
  --black: #000;
  --white: #fff;
  --icon-grey: #A1A2A3;
  --high-margin: 20px;
}
*{
  box-sizing: inherit;
}
html, body{
  margin: 0;
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
}
#app{
  overflow: auto;
  margin: 0;
  height: 100%;
  width: 100%;
}
@media (hover: none) and (pointer: coarse) {
  body, html {
    overflow: hidden
  }
}
.main-content {
  height: calc(100% - 2*var(--high-margin));
  width: calc(100% - 2*var(--high-margin));
  overflow: hidden;
  border: 1px solid black;
  margin: var(--high-margin);
  flex-grow: 1;
}
.vbox {
  display: flex;
  flex-direction: column;
}
.hbox {
  display: flex;
  flex-direction: row;
}
.weird-height {
  height: 100%;
}
.side-bar {
  /* width: 300px; */
  border-right: 1px solid black;
  height: 100%;
}
</style>
