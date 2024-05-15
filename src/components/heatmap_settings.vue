<template>
    <div class="vbox container">
        <h1>Heatmap Settings</h1>
        <mybutton @click="$emit('heatmapClick')" text="Show heatmap" :icon="map" :isactive="enableButton"/>
    </div>
  </template>
  
  <script>
  import mybutton from "./mybutton.vue"
  import play from "@/assets/play.svg"
  import pause from "@/assets/pause.svg"
  import plus from "@/assets/plus.svg"
  import map from "@/assets/map.svg"
  import share from "@/assets/share.svg"
  
  export default{
    props: ["enableButton"],
    emits: ["heatmapClick"],
    components: {mybutton},
    data() {
      return {
        play: play,
        plus: plus,
        pause: pause,
        map: map,
        share: share,
      }
    },
    computed: {
      myicon() {
        return this.playing ? pause : play
      }
    },
    methods: {
      play1() {
        this.playing = !this.playing
        this.$emit('play1')
      },
    },
  }
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
  }
  h1 {
      font-size: 18px;
      font-family: inherit;
  }
  </style>
  