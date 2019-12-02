<template>
  <div>
    <BaseCard
      :id="camelCase(section.title)"
      v-for="section in currentSurvey.sections"
      :key="section.sectionId"
    >
      <div v-if="section.sectionId == 1">
        <h1
          style="text-align: center"
          @blur="setTitle"
          :contenteditable="contentEditable"
        >{{ currentSurvey.title }}</h1>
        <p
          style="text-align: center"
          @blur="setDescription"
          :contenteditable="contentEditable"
        >{{ currentSurvey.description }}</p>
      </div>
      <SectionBanner :sectionId="section.sectionId" :numberOfSections="getNumberOfSections" />
      <BaseSurvey :section="section" :editable="contentEditable" :disabled="viewMode == 'view'" />
    </BaseCard>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import BaseSurvey from "@/components/BaseSurvey.vue";
import BaseCard from "@/components/BaseCard.vue";
import SectionBanner from "@/components/SectionBanner.vue";
import { camelCase } from "@/utils/index.js";

export default {
  props: {
    currentSurvey: {
      type: Object,
      required: true
    },
    viewMode: {
      type: String,
      required: true
    }
  },
  components: {
    BaseCard,
    BaseSurvey,
    SectionBanner
  },
  computed: {
    ...mapGetters(["getNumberOfSections"]),
    contentEditable() {
      return this.viewMode == "edit" || this.viewMode == "create";
    }
  },
  methods: {
    camelCase,
    setTitle(e) {
      this.$store.commit("setCurrentSurveyTitle", e.target.innerText);
    },
    setDescription(e) {
      this.$store.commit("setCurrentSurveyDescription", e.target.innerText);
    }
  }
};
</script>
