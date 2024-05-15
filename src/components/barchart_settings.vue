<template>
  <div class="vbox container">
      <h1>Bar Chart Race Settings</h1>
      <radio :value="selectedOption" :options="options" :modelValue="selectedOption" @update:modelValue="radioUpdate" name="barRadio"/>
      <mybutton @click="play1" :text="this.playing ? 'Pause animation' : 'Play animation'" :icon="myicon" :isactive="true"/>
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
  emits: ["play1", "selectedBar"],
  components: {mybutton, radio},
  data() {
    return {
      play: play,
      plus: plus,
      pause: pause,
      map: map,
      share: share,
      playing: false,
      selectedOption: "beer_yearly", // default
      options: [
          { label: 'Wine', value: 'wine_yearly' },
          { label: 'Beer', value: 'beer_yearly' },
          { label: 'Spirits', value: 'spirits_yearly' },
          { label: 'Bets', value: 'handle' },
          { label: 'Population', value: 'population' },
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
    radioUpdate(x) {
      this.selectedOption = x
      this.$emit('selectedBar', x)
    }
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