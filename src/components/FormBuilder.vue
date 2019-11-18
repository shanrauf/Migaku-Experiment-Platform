<template>
  <div>
    <BaseCard :title="surveyData.title" :description="surveyData.description" />

    <br />

    <BaseCard v-for="section in surveyData.sections" :key="section.id">
      <p v-for="question in section.questions" :key="question.key">
        {{ question.question }}
      </p>
    </BaseCard>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import BaseCard from "@/components/BaseCard.vue";

export default {
  props: {
    surveyData: {
      type: Object,
      required: true
    }
  },
  components: {
    BaseCard
  },
  data() {
    return {
      currentPage: 1,
      name: "",
      nameRules: [
        v => !!v || "Name is required",
        v => (v && v.length <= 50) || "Name must be less than 10 characters"
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
    // ...mapMutations(["editQuestionValue"]),
    editQuestionValue(newVal) {
      //   this.store.commit("editQuestionValue");
    },
    camelCase(str) {
      return str
        .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
          return index == 0 ? word.toLowerCase() : word.toUpperCase();
        })
        .replace(/\s+/g, "");
    },
    validatePageOne() {
      console.log(this.$refs);
      console.log(this.$refs["basicInformation"]);
      if (this.$refs["basicInformation"][0].validate()) {
        this.currentPage = 2;
      } else {
        console.log("Failed successfully");
      }
    },
    onCardTypeSurveyCompleted(cardTypeSurveyData) {
      this.cardTypesSurveyData.push(cardTypeSurveyData);
    },
    questionTypeToComponent(questionType, directive) {
      switch (questionType) {
        case "text":
          return "BaseTextField";
        case "password":
          return "BaseTextField";
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>
