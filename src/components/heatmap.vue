<template>
  <div class="container">
      <svg id="chart"></svg>
  </div>
</template>

<script>

export default{
  props: ["play1"],
  emits: [],
  components: {},
  data() {
    return {
      playing: this.play1,
      currentIndex: 0,
      intervalId: null,
      data: [
          { time: "2020", A: 0, B: 20, C: 10 },
          { time: "2021", A: 5, B: 25, C: 15 },
          { time: "2022", A: 10, B: 30, C: 20 },
          { time: "2023", A: 20, B: 40, C: 30 },
          { time: "2024", A: 30, B: 50, C: 40 },
      ],
    }
  },
  computed: {
  },
  methods: {
  },
  mounted() {
      const plot = plot.plot({
      width: 800,
      height: 400,
      marginTop: 40,
      marginBottom: 40,
      marginLeft: 40,
      marginRight: 40,
      grid: true,
      y: {
          grid: true
      },
      marks: [
          plot.barY(data, {
          x: "time",
          y: ["A", "B", "C"],
          fill: ["#1f77b4", "#ff7f0e", "#2ca02c"],
          label: d => d.x,
          width: 40
          })
      ]
      });
  
      const container = document.querySelector("#chart");
      container.appendChild(plot);
  },
  watch: {
      playing(newValue) {
          if (newValue) {
              this.intervalId = setInterval(() => {
                  this.currentIndex = (this.currentIndex + 1) % this.data.length;
                  plot.data = [this.data[this.currentIndex]];
              }, 1000); // Change the interval as needed
          } else {
              clearInterval(this.intervalId);
              this.intervalId = null;
          }
      }
  }
}
</script>

<style scoped>
svg {
  width: 100%;
  height: 100%;
}
</style>
