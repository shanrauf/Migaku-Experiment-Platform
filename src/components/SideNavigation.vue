<template>
  <v-card :style="sideNavigationCSS" class="side-nav-transition">
    <v-tabs
      v-model="currentSection"
      background-color="transparent"
      fixed-tabs
      vertical
      slider-color="indigo"
    >
      <v-tab
        v-for="section in sections"
        :key="section"
        @click="$vuetify.goTo('#' + camelCase(section), options)"
      >{{ section }}</v-tab>
    </v-tabs>
  </v-card>
</template>

<script>
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
        easing: "easeInCubic"
      },
      originalTop: 350,
      sideNavigationCSS: {
        position: "absolute",
        width: "200px",
        left: "400px",
        top: "300px"
      }
    };
  },
  mounted() {
    window.onscroll = e => {
      this.sideNavigationCSS.top = this.originalTop + window.pageYOffset + "px";
    };
    console.log(this.camelCase(this.sections[0]));
  },
  methods: {
    camelCase(str) {
      return str
        .replace(/(?:^\w|[A-Z]|\b\w)/g, function(word, index) {
          return index == 0 ? word.toLowerCase() : word.toUpperCase();
        })
        .replace(/\s+/g, "");
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