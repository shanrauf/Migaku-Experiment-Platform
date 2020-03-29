<template>
  <svg class="wave" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
    <path
      :style="flippedStyle"
      :fill="color"
      fill-opacity="1"
      d="M0,192L48,202.7C96,213,192,235,288,218.7C384,203,480,149,576,160C672,171,768,245,864,245.3C960,245,1056,171,1152,154.7C1248,139,1344,181,1392,202.7L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
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
