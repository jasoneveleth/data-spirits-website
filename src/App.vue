<template>
  <div class="main-content">
    <div class="side-bar">
      <barchart_settings/>
      <heatmap_settings/>
    </div>
    <barchart v-if="using_barchart"/>
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
  components: {mybutton, barchart_settings, heatmap_settings},
  data() {
    return {
      using_barchart: true,
    }
  },
  methods: {
    async play_button_press() {
      this.generation += 1
      const pts = this.points2str(1)
      const edges = this.edges2str()
      let str = 'GD_iter\n' + pts + edges + this.curr_params
      let result = await fetch(this.$hostv1, this.buildrequest(str))
      const params = await result.text()
      this.curr_params = params
      this.doapi1(params)
    }
  }
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
