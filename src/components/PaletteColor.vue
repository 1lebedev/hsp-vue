<template>
  <div class="palette-color">
        <div class="colorCircle" v-bind:style="{backgroundColor: '#' + currentColor}"></div>
        <div class="input">
          <input v-model="currentColor" placeholder="Enter HEX">
        </div>
      </div> <!-- palette-color end -->
</template>


<script>

export default {
  name: "PaletteColor",
  props: {
      color: Object
      },
  computed: {
    currentColor: {
       get(){
         return this.$store.state.colorsPalette[this.color.index].hex
       },
       set(value){
         this.$store.commit('changePaletteColor', {
           index: this.color.index,
           hex: value
         })
        //  alert(value)
       }
    }
    },
};
</script>

<style scoped>
.input {
  margin-left: 16px; 
}

input {
  border: none;
  outline: none;
}

.input:before {
  content: "#";
  display: inline-block;
  position: relative;
  top: 0px;
  left: 0px;
  padding-right: 2px;
}
.palette-color {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
}
.colorCircle {
  min-width: 32px;
  min-height: 32px;
  border-radius: 50%;
  display: inline-block;
}
</style>