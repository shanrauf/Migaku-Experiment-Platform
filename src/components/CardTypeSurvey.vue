<template>
  <v-card>
    <v-card-title>Card Type Name:</v-card-title>

    <v-card-text>
      <v-subheader class="pl-0">How difficult are new cards to learn (to remember the first time):</v-subheader>
      <v-select v-model="difficultyToLearn" :items="days" />
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      difficultyToLearn: null,
      difficultyToRememberLearnedCards: null,
      howEnjoyableIsReviewing: null,
      cardLeadsToUnderstandingInImmersion: null,
      days: [1, 2, 3, 4, 5, 6, 7]
    };
  },
  methods: {
    createCardTypeSurveyObject() {
      return {
        ...this.difficultyToLearn,
        ...this.difficultyToRememberLearnedCards,
        ...this.howEnjoyableIsReviewing,
        ...this.cardLeadsToUnderstandingInImmersion
      };
    },
    onCompleted() {
      this.$emit("completed", createCardTypeSurveyObject());
    }
  }
};
</script>

<style lang="scss" scoped>
</style>