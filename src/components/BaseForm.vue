<template>
  <v-form class="form" lazy-validation>
    <h1 style="margin: 20px 20px 5px 0">{{ section.title }}</h1>
    <p style="margin: 0 20px 20px 0">{{ section.description }}</p>
    <div v-for="question in section.questions" :key="question.key">
      <h3>{{ question.question }}</h3>
      <component
        :is="typeToComponent(question.type)"
        :loading="!question.question"
        :initialValue="question.value"
        :label="question.label"
        :items="getItems(question.items)"
        :rules="getRules(question.rules)"
        @update="(...args) => updateQuestion(question, ...args)"
      />
    </div>
    <v-row v-if="section.subsections">
      <v-col v-for="subsection in section.subsections" :key="subsection.name">
        <BaseForm :section="subsection" />
      </v-col>
    </v-row>

    <div v-if="section.id == getNumberOfSections">
      <v-btn style="margin: 10px">Back</v-btn>
      <v-btn style="margin: 10px" color="primary">Submit</v-btn>
    </div>
  </v-form>
</template>

<script>
import { mapGetters } from "vuex";
const BaseForm = () => import("@/components/BaseForm.vue"); // recursive calls for subsections
const BaseTextField = () => import("@/components/BaseTextField.vue");
const BaseSelect = () => import("@/components/BaseSelect.vue");

export default {
  props: {
    section: {
      type: Object,
      required: true
    }
  },
  components: {
    BaseForm,
    BaseTextField,
    BaseSelect
  },
  data() {
    return {
      items: {
        hoursInADay: [...Array(25).keys()],
        hoursInAWeek: [...Array(169).keys()],
        oneToFiveScale: [...Array(6).keys()],
        daysInAWeek: [...Array(8).keys()]
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
            return undefined;
          }
        }
      }
    };
  },
  computed: {
    ...mapGetters(["getNumberOfSections"])
  },
  methods: {
    updateQuestion(question, newValue) {
      this.$store.commit({
        type: "updateQuestionValue",
        question: question,
        newValue: newValue
      });
    },
    typeToComponent(questionType) {
      if (questionType == "text") {
        return "BaseTextField";
      } else {
        return "BaseSelect";
      }
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
        return questionItems;
      }
    },
    parseQuery(queryString) {
      // returns key-value pairs object: {"key1": "val1", "key2": "val2"}
      let keyValueArray = queryString.replace(/^\?/, "").split("&");
      let queryObject = {};
      for (let pair of keyValueArray) {
        let key = pair.split("=")[0];
        let value = pair.split("=")[1];
        queryObject[key] = value;
      }
      return queryObject;
    },
    getRules(questionRulesParams) {
      // generate array of rule functions for form inputs
      if (questionRulesParams === undefined) {
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
        rulesArray.push(ruleFunctionGenerator(queryObject[key]));
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
