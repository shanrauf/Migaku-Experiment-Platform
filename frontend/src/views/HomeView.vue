<template>
  <v-container>
    <v-row
      justify="center"
      align-content="center"
      style="height: 80vh; text-align: center"
      class="landing-container"
    >
      <h1 style="font-size: 60px">Mass Immersion Approach Foreign Language Experiments</h1>

      <br />

      <AccountForm />
    </v-row>
  </v-container>
</template>

<script>
import AccountForm from "@/components/AccountForm.vue";
import { mapGetters } from "vuex";
export default {
  components: {
    AccountForm
  }
};
</script>

<style lang="scss" scoped>
.landing-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
