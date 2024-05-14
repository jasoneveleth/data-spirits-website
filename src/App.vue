<template>
  <div class="main-content">
    <div class="side-bar">
      <barchart_settings @play1="x => play1(x)"/>
      <heatmap_settings/>
    </div>
    <barchart v-if="using_barchart" :play1="playing1" :dataStr="dataStr"/>
    <heatmap v-if="!using_barchart"/>
  </div>
</template>

<script>
import mybutton from "./components/mybutton.vue"
import barchart_settings from "./components/barchart_settings.vue"
import heatmap_settings from "./components/heatmap_settings.vue"
import barchart from "./components/barchart.vue"
import heatmap from "./components/heatmap.vue"

export default{
  components: {mybutton, barchart_settings, heatmap_settings, barchart, heatmap},
  data() {
    return {
      using_barchart: true,
      playing1: false,
      playing2: false,
      dataStr: [],
    }
  },
  methods: {
    play1(x) {
      console.log("sending", x)
      this.playing1 = x
    }
  },
  async mounted() {
      let res = await fetch("/population.json")
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
  padding-top: calc(env(safe-area-inset-top) + var(--vert-padding));
  padding-bottom: calc(env(safe-area-inset-bottom) + var(--vert-padding));
  padding-left: calc(env(safe-area-inset-left) + var(--horizontal-padding));
  padding-right: calc(env(safe-area-inset-right) + var(--horizontal-padding));
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
  display: flex;
  flex-direction: row;
  height: 100%;
  width: 100%;
}
.side-bar {
  display: flex;
  flex-direction: column;
  width: 300px;
  height: 100%;
  /* padding: 20px; */
}
</style>
