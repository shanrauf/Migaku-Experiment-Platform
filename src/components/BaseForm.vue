<template>
  <v-form class="form" lazy-validation>
    <div v-for="question in questions" :key="question.key">
      <h3>{{ question.question }}</h3>
      <component
        :is="typeToComponent(question.type)"
        :loading="!question.question"
        :value.sync="question.value"
        :label="question.label"
        :items="getItems(question.items)"
        :rules="getRules(question.rules)"
      />
    </div>
  </v-form>
</template>

<script>
const BaseTextField = () => import("@/components/BaseTextField.vue");
const BaseSelect = () => import("@/components/BaseSelect.vue");

export default {
  props: {
    questions: {
      type: Array,
      required: true
    }
  },
  components: {
    BaseTextField,
    BaseSelect
  },
  data() {
    return {
      hoursInADay: [...Array(25).keys()],
      hoursInAWeek: [...Array(169).keys()],
      oneToFiveScale: [...Array(6).keys()],
      daysInAWeek: [...Array(8).keys()],
      textRules: [
        v => (v && v.length <= 50) || "Name must be less than 10 characters"
      ],
      rules: {
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
      },
      emailRules: [
        v => !!v || "E-mail is required",
        v => /.+@.+\..+/.test(v) || "E-mail must be valid"
      ]
    };
  },
  methods: {
    typeToComponent(questionType) {
      if (questionType == "text") {
        return "BaseTextField";
      } else {
        return "BaseSelect";
      }
    },
    getItems(questionItems) {
      let items = this[questionItems];
      if (items === undefined) {
        return [];
      } else {
        return items;
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
        // e.x if queryObject = {"test1": 1}, then key = "test1" and queryObject[key] = 1
        let ruleFunction = this.rules[key];
        rulesArray.push(ruleFunction(queryObject[key]));
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
