<template>
  <div class="landing-container">
    <h1 style="font-size: 60px">Participate in MIA Foreign Language Experiments!</h1>

    <BaseButton backgroundColor="#7289DA" rounded @click="loginWithDiscord">Sign In With Discord</BaseButton>
  </div>
</template>

<script>
import Service from "./service";

export default {
  name: "Account",
  service: new Service(),
  methods: {
    loginWithDiscord() {
      this.$options.service.loginWithDiscord();
    }
  }
};
</script>

<style lang="scss" scoped>
.landing-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 80%;
  margin: auto;
}
</style>