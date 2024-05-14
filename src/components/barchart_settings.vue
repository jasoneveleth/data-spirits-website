<template>
  <div class="vbox container">
      <h1>Bar Chart Race Settings</h1>
      <radio :value="selectedOption" :options="options" :modelValue="selectedOption" @update:modelValue="x => selectedOption = x" name="barRadio"/>
      <p>Selected option: {{ selectedOption }}</p>
      <!-- <mybutton @click="$emit('draw_state_change')" :text="mytext" :icon="myicon"/> -->
      <!-- <h1 class="label">Miles: {{calc_miles()}}</h1> -->
      <mybutton @click="play1" text="Start animation" :icon="myicon" :isactive="true"/>
  </div>
</template>

<script>
import mybutton from "./mybutton.vue"
import play from "@/assets/play.svg"
import pause from "@/assets/pause.svg"
import plus from "@/assets/plus.svg"
import map from "@/assets/map.svg"
import share from "@/assets/share.svg"
import radio from "./radio.vue"

export default{
  props: [],
  emits: ["play1"],
  components: {mybutton, radio},
  data() {
    return {
      play: play,
      plus: plus,
      pause: pause,
      map: map,
      share: share,
      playing: false,
      selectedOption: "wine", // default
      options: [
          { label: 'Wine', value: 'wine' },
          { label: 'Beer', value: 'beer' },
          { label: 'Bets', value: 'bets' },
    ]
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
      this.$emit('play1', this.playing)
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
    background-color: var(--aqua);
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