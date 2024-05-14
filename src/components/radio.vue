<template>
    <div>
      <label v-for="(option, index) in options" :key="index" :for="option.id">
        <input type="radio" :id="option.id" :value="option.value" @onclick="emit('update:modelValue', option.value)" :name="name" :checked="option.value == this.value">
        {{ option.label }}
      </label>
    </div>
  </template>

  <script>
  export default {
    props: {
      modelValue: {
        type: String,
        required: true
      },
      options: {
        type: Array,
        required: true
      },
      value: {
        type: String // If you want to use a default value
      },
      name: {
        type: String
      }
    },
    emits: ['update:modelValue'],
    data() {
      return {
      };
    },
    watch: {
    },
    mounted() {
      // Assign unique IDs to each option if not provided
      this.options.forEach((option, index) => {
        if (!option.id) {
          option.id = `radio-${index}`
        }
      });
    }
  };
  </script>
  