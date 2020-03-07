<template>
  <v-form class="form" lazy-validation>
    <h1
      style="margin: 20px 20px 5px 0"
      @blur="updateCurrentSurveyMetadata($event, 'title')"
    >{{ section.title }}</h1>
    <p
      style="margin: 0 20px 20px 0"
      @blur="updateCurrentSurveyMetadata($event, 'description')"
    >{{ section.description }}</p>
    <div v-for="question in section.questions" :key="question.key">
      <h4>{{ question.question }}</h4>
      <span v-if="question.note">(Note: {{ question.note }})</span>
      <component
        :is="typeToComponent(question.questionType)"
        :value="question.value"
        :label="question.label"
        :placeholder="question.placeholder"
        :rules="getRules(question.rules)"
        :items="getItems(question.items)"
        @update="(...args) => updateQuestionValue(question, ...args)"
        @edit="updateEditOverlay"
      />
    </div>

    <div v-if="section.sectionId == getNumberOfSections">
      <v-btn style="margin: 10px" @click="confirmOverlay = true">Back</v-btn>
      <v-btn style="margin: 10px" color="primary" @click="submitSurvey">Submit</v-btn>
    </div>

    <v-overlay :value="editOverlay">
      <BaseEditInputForm @edit="updateEditOverlay" />
    </v-overlay>

    <v-overlay :value="confirmOverlay">
      <v-card class="mx-auto" style="padding: 20px;">
        <h2 style="text-align: center;">Are you sure?</h2>
        <v-card-subtitle>Your progress will be erased...</v-card-subtitle>
        <div style="display: flex; justify-content: space-between;">
          <v-btn @click="$router.push({ name: 'surveys' })">Yes</v-btn>
          <v-btn @click="confirmOverlay = false">No</v-btn>
        </div>
      </v-card>
    </v-overlay>
  </v-form>
</template>

<script>
import { mapGetters } from "vuex";
import { formMixin } from "../mixins/formMixin";
import BaseSelect from "@/components/form/BaseSelect.vue";
import BaseRadioButtons from "@/components/form/BaseRadioButtons.vue";
import BaseTextField from "@/components/form/BaseTextField.vue";
import BaseCreateNewCard from "@/components/BaseCreateNewCard.vue";
import BaseEditInputForm from "@/components/form/BaseEditInputForm.vue";

import {
  foreignLanguages,
  levelsOfEducation,
  motivationsForLearningTargetLanguage,
  fieldsOfOccupation,
  generalTimeFrames
} from "@/utils/items.ts";

export default {
  name: "BaseSurvey",
  mixins: [formMixin],
  props: {
    section: {
      type: Object,
      required: true
    }
  },
  components: {
    BaseSelect,
    BaseRadioButtons,
    BaseTextField,
    BaseCreateNewCard,
    BaseEditInputForm
  },
  data() {
    return {
      formInputs: [],
      editOverlay: false,
      confirmOverlay: false,
      items: {
        foreignLanguages,
        levelsOfEducation,
        motivationsForLearningTargetLanguage,
        fieldsOfOccupation,
        generalTimeFrames,
        hoursInADay: [...Array(25).keys()],
        hoursInAWeek: [...Array(169).keys()],
        oneToFiveScale: [...Array(6).keys()].splice(1), // splice selects all but "0"
        daysInAWeek: [...Array(8).keys()],
        oneToTenScale: [...Array(11).keys()].splice(1),
        percentages: [...Array(101).keys()],
        zeroToOneHundred: [...Array(101).keys()],
        trueFalse: [true, false],
        audioOrSentenceCard: ["Audio Card", "Sentence Card"],
        yesNo: ["Yes", "No"],
        maleOrFemale: ["male", "female"],
        onceOrThroughoutTheDay: ["Once", "Throughout the day"],
        periodsOfTheDay: [
          "Early morning (5AM - 8AM)",
          "Morning (8AM - 12PM)",
          "Noon (12PM - 2PM)",
          "Afternoon (2PM - 4PM)",
          "Evening (4PM - 6PM)",
          "Around sunset (6PM - 8PM)",
          "Around nighttime (8PM - 12AM)",
          "After midnight (12AM - 5AM)"
        ],
        retirementIntervals: [
          "Never",
          "1 day",
          "1 week",
          "1 month",
          "3 months",
          "6 months",
          "9 months",
          "1 year",
          "1.5 years",
          "2 years",
          "3+ years"
        ],
        daysOfTheWeek: [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday"
        ],
        devices: ["Desktop/Laptop", "Tablet", "Smartphone"],
        beforeDuringOrMixed: ["Before", "Mix reviews and new cards", "After"]
      },
      ruleGenerators: {
        maxChar: val => v =>
          (v && v.length <= val) || `Must be less than ${val} characters`,
        minChar: val => v =>
          (v && v.length >= val) || `Must be greater than ${val} characters`,
        email: val => {
          if (val == "true") {
            return v => /.+@.+\..+/.test(v) || "E-mail must be valid";
          } else {
            return true;
          }
        },
        numberOnly: val => {
          if (val == "true") {
            return v =>
              /^[0-9]*$/.test(v) || "Must enter numbers only (no letters)";
          } else {
            return true;
          }
        },
        textOnly: val => {
          if (val == "true") {
            return v =>
              /^[a-zA-Z ]*$/.test(v) || "Must enter text only (no numbers)";
          } else {
            return true;
          }
        }
      }
    };
  },
  computed: {
    ...mapGetters(["getNumberOfSections"])
  },
  methods: {
    submitSurvey() {
      this.confirmOverlay = false;
      this.$router.push({ name: "surveys" });
    },
    updateQuestionValue(question, newValue) {
      this.$store.commit({
        type: "updateQuestionValue",
        question,
        attributeToUpdate: "value",
        newValue
      });
    },
    updateEditOverlay(val) {
      this.editOverlay = val;
    },
    updateCurrentSurveyMetadata(newVal, surveyAttributeToUpdate) {
      this.$store.commit({
        type: "updateCurrentSurveyMetadata",
        section: this.section,
        attributeToUpdate: surveyAttributeToUpdate,
        newVal: newVal.target.innerText
      });
    },
    getItems(questionItems) {
      if (typeof questionItems == "string") {
        let items = this.items[questionItems];
        if (items === undefined) {
          return [];
        } else {
          return items;
        }
      } else if (typeof questionItems == "object") {
        // if currentSurvey provides their own Array of items
        return questionItems;
      } else {
        return [];
      }
    },
    getRules(questionRulesParams) {
      // generate array of rule functions for form inputs
      if (questionRulesParams === undefined || questionRulesParams === null) {
        return [];
      }
      let queryObject = this.parseQuery(questionRulesParams);
      if (queryObject === undefined) {
        return [];
      }
      let rulesArray = [];
      for (let key in queryObject) {
        // e.x if queryObject = {"maxChar": 50}, then key = "maxChar" and queryObject[key] = 50
        let ruleFunctionGenerator = this.ruleGenerators[key];
        if (ruleFunctionGenerator !== undefined) {
          rulesArray.push(ruleFunctionGenerator(queryObject[key]));
        }
      }
      return rulesArray;
    }
  }
};
</script>

<style lang="scss" scoped>
.form {
  margin: 20px;
}
</style>
