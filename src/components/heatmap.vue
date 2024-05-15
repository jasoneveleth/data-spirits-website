<template>
  <div class="container">
    <div id="heatmapDiv"></div>
    <p>
      The colors are not meaningful, they only indicate different clusters.
      White means no data.
    </p>
  </div>
</template>

<script>
import Plotly from "plotly.js-dist";

const state_order = [
  "AZ",
  "AR",
  "CO",
  "CT",
  "DE",
  "IL",
  "IN",
  "IA",
  "KS",
  "KY",
  "LA",
  "ME",
  "MD",
  "MA",
  "MI",
  "MS",
  "MT",
  "NV",
  "NH",
  "NJ",
  "NY",
  "OH",
  "OR",
  "PA",
  "RI",
  "SD",
  "TN",
  "VA",
  "WV",
  "WY",
];

export default {
  props: ["data"],
  emits: [],
  components: {},
  data() {
    return {};
  },
  computed: {},
  methods: {
    drawHeatmap() {
      var data = [
        {
          type: "choropleth",
          locations: state_order,
          z: this.data, // Values associated with each state
          locationmode: "USA-states", // Specifies the location mode as state names
          colorscale: "Portland",
          showscale: false,
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
  },
  mounted() {
    this.drawHeatmap();
  },
  watch: {
    data(newData) {
      this.drawHeatmap();
    },
  },
};
</script>

<style scoped>
svg {
  width: 100%;
  height: 100%;
}
.container {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
/* #heatmapDiv {
} */
</style>
