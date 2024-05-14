<template>
    <div>
      <label v-for="(option, index) in options" :key="index" :for="option.id">
        <input type="radio" :id="option.id" :value="option.value" v-model="selectedOption">
        {{ option.label }}
      </label>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      options: {
        type: Array,
        required: true
      },
      value: {
        type: String // If you want to use a default value
      }
    },
    data() {
      return {
        selectedOption: this.value || ''
      };
    },
    watch: {
      selectedOption(newValue) {
        this.$emit('input', newValue);
      }
    },
    mounted() {
      // Assign unique IDs to each option if not provided
      this.options.forEach((option, index) => {
        if (!option.id) {
          option.id = `radio-${index}`;
        }
      });
    }
  };
  </script>
  