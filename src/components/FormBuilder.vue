<template>
  <div>
    <BaseCard
      :id="camelCase(section.title)"
      v-for="section in currentSurvey.sections"
      :key="section.id"
    >
      <div v-if="section.id == 1">
        <h1 style="text-align: center">{{ currentSurvey.title }}</h1>
        <p style="text-align: center">{{ currentSurvey.description }}</p>
      </div>
      <SectionBanner :sectionId="section.id" :numberOfSections="getNumberOfSections" />
      <BaseForm v-bind="section" />
    </BaseCard>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import BaseForm from "@/components/BaseForm.vue";
import BaseCard from "@/components/BaseCard.vue";
import SectionBanner from "@/components/SectionBanner.vue";
import { camelCase } from "@/utils/index.js";

export default {
  props: {
    currentSurvey: {
      type: Object,
      required: true
    }
  },
  components: {
    BaseCard,
    BaseForm,
    SectionBanner
  },
  computed: {
    ...mapGetters(["getNumberOfSections"])
  },
  methods: {
    camelCase
  }
};
</script>
