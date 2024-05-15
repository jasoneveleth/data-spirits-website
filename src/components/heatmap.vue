<template>
  <div class="container">
    <div id="heatmapDiv"></div>
  </div>
</template>

<script>
import Plotly from "plotly.js-dist";

export default {
  props: [],
  emits: [],
  components: {},
  data() {
    return {
      data: [100, 200, 300],
    };
  },
  computed: {},
  methods: {},
  mounted() {
    // Set the scope to 'usa' to focus on the United States
    var data = [
      {
        type: "choropleth",
        locations: ["NY", "CA", "RI"], // State names
        z: this.data, // Values associated with each state
        locationmode: "USA-states", // Specifies the location mode as state names
        colorscale: "Viridis", // Specifies the colorscale
        colorbar: { title: "Clusters" }, // Optional colorbar title
      },
    ];
    var layout = {
      geo: {
        scope: "usa",
      },
      width: 1000, // Set the width of the plot
      height: 600, // Set the height of the plot
    };

    // Plotly plot creation
    Plotly.newPlot("heatmapDiv", data, layout);
  },
  watch: {},
};
</script>

<style scoped>
svg {
  width: 100%;
  height: 100%;
}
.container {
  width: 100%;
}
#heatmapDiv {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
