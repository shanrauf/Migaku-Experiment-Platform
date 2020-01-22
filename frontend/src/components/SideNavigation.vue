<template>
  <v-card
    :style="sideNavigationCSS"
    class="side-nav-transition"
    v-resize="onResize"
  >
    <v-tabs
      v-model="currentSection"
      background-color="transparent"
      fixed-tabs
      vertical
      slider-color="#204f70"
    >
      <v-tab
        v-for="section in sections"
        :key="section"
        @click="$vuetify.goTo('#' + camelCase(section), options)"
        >{{ section }}</v-tab
      >
    </v-tabs>
  </v-card>
</template>

<script>
import { formatDate } from '../utils/index';
import { camelCase } from '../utils/index';

export default {
  props: {
    sections: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      currentSection: 0,
      options: {
        duration: 600,
        offset: 200,
        easing: 'easeInCubic'
      },
      originalTop: 350,
      sideNavigationCSS: {
        position: 'absolute',
        width: '200px',
        left: '400px',
        top: '300px'
      }
    };
  },
  mounted() {
    this.onResize();
    window.onscroll = e => {
      this.sideNavigationCSS.top = this.originalTop + window.pageYOffset + 'px';
    };
  },
  methods: {
    camelCase,
    onResize() {
      // either create breakpoints or derive a better function to move the side nav, or find way to move the sidenav relative to FormBuilder
      this.sideNavigationCSS.left =
        Math.round(window.innerWidth * 0.1 - 50) + 'px';
    }
  }
};
</script>

<style lang="scss" scoped>
.side-nav-transition {
  -webkit-transition: all 1s ease;
  -moz-transition: all 1s ease;
  -o-transition: all 1s ease;
  -ms-transition: all 1s ease;
  transition: all 1s ease;
}
</style>
