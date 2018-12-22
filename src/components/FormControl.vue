<template>
<div class="formControl">
        <div class="controlTitle">{{title}} {{value}}</div>
           <div class="controlElement">
             <vue-slider
                v-model="value"
              v-bind="sliderOptions">
                </vue-slider>
           </div>
        
        </div>
</template>


<script>
import VueSlider from "vue-slider-component";

export default {
  name: "FormControl",
  components: {
    VueSlider
  },
  props: {
    title: String,
    value: Number
  },
  data: function() {
    return {
      sliderOptions: {
        min: 0,
        max: 100,
        interval: 1,
        show: true,
        tooltip: false
      }
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
