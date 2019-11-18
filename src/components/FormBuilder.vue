<template>
  <div>
    <div v-for="section in surveyData.sections" :key="section.id">
      <BaseCard>
        <template v-if="section.id == 1" v-slot:title>{{
          surveyData.title
        }}</template>
        <template v-else v-slot:title>{{ section.title }}</template>
        <template v-if="section.id == 1" v-slot:description>{{
          surveyData.description
        }}</template>
        <template v-else v-slot:description>{{ section.description }}</template>

        <template v-slot:body>
          <BaseForm :questions="section.questions" />
        </template>
      </BaseCard>

      <br v-if="section.id != surveyData.sections.length" />
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import BaseForm from "@/components/BaseForm.vue";
import BaseCard from "@/components/BaseCard.vue";

export default {
  props: {
    surveyData: {
      type: Object,
      required: true
    }
  },
  components: {
    BaseCard,
    BaseForm
  },
  created() {
    // create survey data when calling from server
  },
  methods: {
    camelCase(str) {
      return str
        .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
          return index == 0 ? word.toLowerCase() : word.toUpperCase();
        })
        .replace(/\s+/g, "");
    }
  }
};
</script>

<style lang="scss" scoped></style>
