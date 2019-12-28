<template>
  <div class="landing-container">
    <h1 style="font-size: 60px">MIA Foreign Language Experiments</h1>

    <AccountForm />
  </div>
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
  justify-content: center;
  text-align: center;
  width: 80%;
  margin: auto;
}
</style>
