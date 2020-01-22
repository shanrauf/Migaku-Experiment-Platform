<template>
  <div class="experiment-dashboard-container">
    <BaseCard>
      <h1>{{ title }}</h1>
      <p>10 Weeks</p>
      <br />
      <p>{{ description }}</p>

      <br />

      <h1>Requirements</h1>
      <v-icon>$vuetify.icons.github</v-icon>
    </BaseCard>
    <div class="side-containers">
      <BaseCard>
        <h1>Details</h1>
        <p>Starts Next Week</p>
        <p>15 slots left</p>
      </BaseCard>
      <BaseCard>
        <h1>Share</h1>
        <v-icon>$vuetify.icons.github</v-icon>
      </BaseCard>
    </div>
  </div>
</template>

<script>
import Service from "./service";
import BaseCard from "@/components/BaseCard.vue";

export default {
  name: "Account",
  service: new Service(),
  components: {
    BaseCard
  },
  data() {
    return {
      id: "sa54df154sa4dffpsdf", // unique identifier
      title: "Testing Anki Retention of Audio Cards vs Sentence Cards",
      description:
        "(10 weeks) Participants rep 5 audio cards and 5 sentence card a day and fill out a weekly survey describing how they feel about the two card types.",
      startDate: 1575244800000,
      endDate: 1581206400000
    };
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
