<template>
  <div class="main-content vbox">
    <topbar />
    <div class="hbox weird-height">
      <div class="side-bar">
        <barchart_settings
          @play1="(x) => play1(x)"
          @selectedBar="selectTheBar"
        />
        <heatmap_settings
          @heatmapClick="handleHeatClick"
          @filename="selectHeatGuy"
          :enableButton="using_barchart"
        />
      </div>
      <barchart v-if="using_barchart" :play1="playing1" :dataStr="dataStr" />
      <heatmap v-if="!using_barchart" :data="heatMapData" />
    </div>
  </div>
</template>

<script>
import mybutton from "./components/mybutton.vue";
import barchart_settings from "./components/barchart_settings.vue";
import heatmap_settings from "./components/heatmap_settings.vue";
import barchart from "./components/barchart.vue";
import heatmap from "./components/heatmap.vue";
import topbar from "./components/topbar.vue";

export default {
  components: {
    mybutton,
    barchart_settings,
    heatmap_settings,
    barchart,
    heatmap,
    topbar,
  },
  data() {
    return {
      using_barchart: true,
      playing1: false,
      playing2: false,
      dataStr: [],
      dataFile: `${__VITE_BASE_PATH__}wine_yearly.json`,
      heatMapData: null,
      heatMapDataFile: `${__VITE_BASE_PATH__}yearly_5_beer_gross_revenue_clusters.json`,
    };
  },
  methods: {
    play1(x) {
      this.using_barchart = true;
      this.playing1 = x;
    },
    handleHeatClick() {
      this.using_barchart = false;
    },
    async selectTheBar(x) {
      this.dataFile = `${__VITE_BASE_PATH__}${x}.json`;
      this.using_barchart = true;
      let res = await fetch(this.dataFile);
      this.dataStr = JSON.parse(await res.text());
    },
    async selectHeatGuy(x) {
      this.heatMapDataFile = `${__VITE_BASE_PATH__}${x}`;
      this.using_barchart = false;
      let res = await fetch(this.heatMapDataFile);
      this.heatMapData = JSON.parse(await res.text());
    },
  },
  async mounted() {
    let [res1, res2] = await Promise.all([
      fetch(this.dataFile).then((response) => response.json()),
      fetch(this.heatMapDataFile).then((response) => response.json()),
    ]);
    this.dataStr = res1;
    this.heatMapData = res2;
  },
};
</script>

<style>
:root {
  --background-grey: #e6e8eb;
  --text-grey: #9fa2a9;
  --blue: #639af8;
  --yellow: #ffcc00;
  --green: #98c379;
  --yellow: #e5c07b;
  --dark-yellow: #d19a66;
  --purple: #c678dd;
  --aqua: #56b6c2;
  --red: #e06c75;
  --black: #000;
  --white: #fff;
  --icon-grey: #a1a2a3;
  --high-margin: 20px;
}
* {
  box-sizing: inherit;
}
html,
body {
  margin: 0;
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
}
#app {
  overflow: auto;
  margin: 0;
  height: 100%;
  width: 100%;
}
@media (hover: none) and (pointer: coarse) {
  body,
  html {
    overflow: hidden;
  }
}
.main-content {
  height: calc(100% - 2 * var(--high-margin));
  width: calc(100% - 2 * var(--high-margin));
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
