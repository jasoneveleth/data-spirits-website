<template>
  <div class="vbox container">
    <h1>Heatmap Settings</h1>
    <dropdown
      name="Alcohol"
      default="Wine"
      :options="Oalc"
      @selectedOption="alcUp"
    />
    <dropdown
      name="Bet"
      default="Handle"
      :options="Obet"
      @selectedOption="betUp"
    />
    <dropdown
      name="Clusters"
      default="5"
      :options="Ocluster"
      @selectedOption="clusterUp"
    />
    <dropdown
      name="Timespan"
      default="Yearly"
      :options="Otime"
      @selectedOption="timeUp"
    />
    <mybutton
      @click="$emit('heatmapClick')"
      text="Show heatmap"
      :icon="map"
      :isactive="enableButton"
    />
  </div>
</template>

<script>
import mybutton from "./mybutton.vue";
import play from "@/assets/play.svg";
import pause from "@/assets/pause.svg";
import plus from "@/assets/plus.svg";
import map from "@/assets/map.svg";
import share from "@/assets/share.svg";
import dropdown from "./dropdown.vue";

export default {
  props: ["enableButton"],
  emits: ["heatmapClick", "filename"],
  components: { mybutton, dropdown },
  data() {
    return {
      play: play,
      plus: plus,
      pause: pause,
      map: map,
      share: share,
      Oalc: [
        { label: "Wine", value: "wine" },
        { label: "Beer", value: "beer" },
        { label: "Spirits", value: "spirits" },
      ],
      Obet: [
        { label: "Handle", value: "handle" },
        { label: "Gross", value: "gross" },
        { label: "Hold", value: "hold" },
      ],
      Ocluster: [
        { label: "2", value: "2" },
        { label: "3", value: "3" },
        { label: "5", value: "5" },
      ],
      Otime: [
        { label: "Yearly", value: "yearly" },
        { label: "Monthly", value: "monthly" },
      ],
      curAlc: "wine",
      curBet: "handle",
      curCluster: "5",
      curTime: "yearly",
    };
  },
  computed: {
    myicon() {
      return this.playing ? pause : play;
    },
  },
  methods: {
    alcUp(x) {
      this.curAlc = x;
      this.$emit(
        "filename",
        `${this.curTime}_${this.curCluster}_${this.curAlc}_${this.curBet}_clusters.json`,
      );
    },
    betUp(x) {
      this.curBet = x;
      this.$emit(
        "filename",
        `${this.curTime}_${this.curCluster}_${this.curAlc}_${this.curBet}_clusters.json`,
      );
    },
    clusterUp(x) {
      this.curCluster = x;
      this.$emit(
        "filename",
        `${this.curTime}_${this.curCluster}_${this.curAlc}_${this.curBet}_clusters.json`,
      );
    },
    timeUp(x) {
      this.curTime = x;
      this.$emit(
        "filename",
        `${this.curTime}_${this.curCluster}_${this.curAlc}_${this.curBet}_clusters.json`,
      );
    },
  },
};
</script>

<style scoped>
.vbox {
  display: flex;
  flex-direction: column;
}
.container {
  background-color: var(--blue);
  height: 50%;
  width: 100%;
  justify-content: space-around;
  align-items: center;
  border-top: 1px solid black;
}
h1 {
  font-size: 18px;
  font-family: inherit;
}
</style>
