<template>
  <div class="background-color-input">
    <div class="hexInput">
      <input v-model="backgroundColor" placeholder="Enter HEX">
    </div>
  </div>
</template>

<script>
export default {
  name: "BackgroundColorInput",
  computed: {
    backgroundColor: {
      get() {
        return this.$store.state.backgroundColor;
      },
      set(value) {
        this.$store.commit("changeBackgroundColor", value);
      }
    }
  }
};
</script>
