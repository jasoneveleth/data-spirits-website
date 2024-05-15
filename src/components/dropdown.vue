<template>
  <div class="dropdown">
    <mybutton
      @click="toggle"
      :text="`${name}: ${curOption}`"
      :isactive="true"
    />
    <div v-if="active" class="dropdown-content">
      <a
        v-for="option in options"
        :key="option.value"
        @click="optionClicky(option.value, option.label)"
      >
        {{ option.label }}
      </a>
    </div>
  </div>
</template>

<script>
import mybutton from "./mybutton.vue";

export default {
  components: { mybutton },
  props: ["options", "name", "default"],
  emits: ["selectedOption"],
  data() {
    return {
      active: false,
      curOption: this.default,
    };
  },
  methods: {
    toggle() {
      this.active = !this.active;
    },
    optionClicky(val, label) {
      this.$emit("selectedOption", val);
      this.active = false;
      this.curOption = label;
    },
  },
};
</script>

<style scoped>
/* Dropdown Button */
.dropbtn {
  background-color: #04aa6d;
  color: white;
  padding: 16px;
  font-size: 16px;
  border: none;
}

/* The container <div> - needed to position the dropdown content */
.dropdown {
  position: relative;
  display: inline-block;
}

/* Dropdown Content (Hidden by Default) */
.dropdown-content {
  display: block;
  position: absolute;
  background-color: #f1f1f1;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
}

/* Links inside the dropdown */
.dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

/* Change color of dropdown links on hover */
.dropdown-content a:hover {
  background-color: #ddd;
}

/* Show the dropdown menu on hover */
.dropdown:hover .dropdown-content {
  display: block;
}

/* Change the background color of the dropdown button when the dropdown content is shown */
.dropdown:hover .dropbtn {
  background-color: #3e8e41;
}
</style>
