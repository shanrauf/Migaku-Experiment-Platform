<template>
  <svg
    class="wave"
    :style="flippedStyle"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 819 66"
    :fill="color"
  >
    <path
      d="M819.625 22.455L819.241 0H0v35.345c60.272-16.64 145.173-16.64 254.703 0C419 60.305 525.905 66.307 599.925 65.81c97.231-.651 170.465-15.103 219.7-43.356z"
    ></path>
  </svg>
</template>

<script>
export default {
  props: {
    flipped: {
      type: Boolean,
      required: false,
      default: false
    },
    color: {
      type: String,
      required: false,
      default: '#fff'
    }
  },
  computed: {
    flippedStyle() {
      return this.flipped
        ? 'transform: rotate(180deg); margin-bottom: -7px'
        : 'margin-bottom: -7px;';
    }
  }
};
</script>

<style lang="scss" scoped>
.wave {
  /* Fixes weird margin on mobile */
  width: 100%;
  padding: 0 -15px 0 -15px;
}
</style>
