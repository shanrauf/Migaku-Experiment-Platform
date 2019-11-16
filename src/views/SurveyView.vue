<template>
  <div>
    <h1>MIA Mid-Experiment Survey #1</h1>

    <br />

    <v-stepper v-model="stepperPage" non-linear vertical>
      <v-stepper-step :complete="stepperPage > 1" step="1">Basic Information</v-stepper-step>

      <v-stepper-content step="1">
        <v-form ref="formPageOne" v-model="validPageOne">
          <v-text-field v-model="name" :counter="10" :rules="nameRules" label="Name" required></v-text-field>

          <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>
        </v-form>

        <v-btn color="primary" @click="validatePageOne">Continue</v-btn>
        <v-btn text>Cancel</v-btn>
      </v-stepper-content>

      <v-stepper-step :complete="stepperPage > 2" step="2">Immersion Stats</v-stepper-step>

      <v-stepper-content step="2">
        <v-subheader class="pl-0">Average hours of active listening this week:</v-subheader>
        <v-slider v-model="avgActiveListening" min="0" max="100" thumb-label />

        <v-subheader class="pl-0">Average hours of passive listening this week:</v-subheader>
        <v-slider v-model="avgPassiveListening" min="0" max="100" thumb-label />

        <v-subheader class="pl-0">Average hours of reading this week:</v-subheader>
        <v-slider v-model="avgReading" min="0" max="100" thumb-label />

        <v-row>
          <v-col cols="4">
            <v-subheader class="pl-0">Days of active immersion missed this week:</v-subheader>
            <v-select v-model="daysOfActiveImmersionMissed" :items="days" />
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="4">
            <v-subheader class="pl-0">Days of reading missed this week:</v-subheader>
            <v-select v-model="daysOfReadingMissed" :items="days" />
          </v-col>
        </v-row>

        <v-btn color="primary" @click="stepperPage = 3">Continue</v-btn>
        <v-btn text>Cancel</v-btn>
      </v-stepper-content>

      <v-stepper-step :complete="stepperPage > 3" step="3">Card Types</v-stepper-step>

      <v-stepper-content step="3">
        <v-subheader
          class="pl-0"
        >On a scale of 1-5, how difficult are the card types (below) that we're testing?</v-subheader>
        <v-select v-model="difficultyOfBothCardTypes" :items="oneToFiveScale" />

        <v-subheader class="pl-0">Which card type do you currently prefer?</v-subheader>
        <v-select v-model="preferredCardType" :items="cardTypes" />

        <v-row justify="center">
          <v-col cols="5">
            <CardTypeSurvey @completed="onCardTypeSurveyCompleted" />
          </v-col>
          <v-col cols="5">
            <CardTypeSurvey />
          </v-col>
        </v-row>

        <v-btn color="primary" @click="stepperPage = 4">Continue</v-btn>
        <v-btn text>Cancel</v-btn>
      </v-stepper-content>

      <v-stepper-step step="4">View setup instructions</v-stepper-step>
      <v-stepper-content step="4">
        <v-card color="grey lighten-1" class="mb-12" height="200px"></v-card>
        <v-btn color="primary" @click="stepperPage = 1">Continue</v-btn>
        <v-btn text>Cancel</v-btn>
      </v-stepper-content>
    </v-stepper>
  </div>
</template>

<script>
const CardTypeSurvey = () => import("@/components/CardTypeSurvey.vue");

export default {
  components: {
    CardTypeSurvey
  },
  data() {
    return {
      validPageOne: false,
      stepperPage: 1,
      preferredCardType: "",
      cardTypes: ["Type 1", "Type 2"],
      cardTypesSurveyData: [],
      name: "",
      nameRules: [
        v => !!v || "Name is required",
        v => (v && v.length <= 10) || "Name must be less than 10 characters"
      ],
      email: "",
      emailRules: [
        v => !!v || "E-mail is required",
        v => /.+@.+\..+/.test(v) || "E-mail must be valid"
      ],
      days: [1, 2, 3, 4, 5, 6, 7],
      hours: [
        0,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12,
        13,
        14,
        15,
        16,
        17,
        18,
        19,
        20,
        21,
        22,
        23,
        24
      ],
      oneToFiveScale: [1, 2, 3, 4, 5],
      avgActiveListening: null,
      avgPassiveListening: null,
      avgReading: null,
      daysOfActiveImmersionMissed: null,
      daysOfReadingMissed: null,
      difficultyOfBothCardTypes: null
    };
  },
  methods: {
    validatePageOne() {
      if (this.$refs.formPageOne.validate()) {
        this.stepperPage = 2;
      }
    },
    onCardTypeSurveyCompleted(cardTypeSurveyData) {
      this.cardTypesSurveyData.push(cardTypeSurveyData);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>