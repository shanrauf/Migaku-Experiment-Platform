<template>
  <nav>
    <router-link to="/">
      <img src="@/assets/images/mia_white.png" alt="MIA Logo" class="logo" />
    </router-link>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      drawer: false
    };
  },
  methods: {
    goTo(link) {
      this.$router.push(link);
    }
  }
};
</script>

<style lang="scss" scoped>
nav {
  // position: absolute;
  // top: 0px;
  // width: 100%;
  background: #204f70 !important;
  padding: 15px 30px 15px 30px;
  text-align: right;
  z-index: 1;
  background: inherit;
}
.logo {
  width: 90px;
  height: 35px;
  float: left;
  text-transform: uppercase;
  text-align: left;
}
</style>
