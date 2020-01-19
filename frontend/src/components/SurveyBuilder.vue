<template>
  <div>
    <BaseCard
      :id="camelCase(section.title)"
      v-for="(section, idx) in currentSurvey.sections"
      :key="section.sectionId"
    >
      <div v-if="idx == 0">
        <h1 style="text-align: center" @blur="setTitle">
          {{ currentSurvey.title }}
        </h1>
        <p style="text-align: center" @blur="setDescription">
          {{ currentSurvey.description }}
        </p>
      </div>
      <SectionBanner
        :sectionId="section.sectionNumber"
        :numberOfSections="getNumberOfSections"
      />
      <BaseSurvey :section="section" />
    </BaseCard>
  </div>
</template>

<script lang="ts">
import { mapGetters, mapMutations } from 'vuex';
import BaseSurvey from '@/components/BaseSurvey.vue';
import BaseCard from '@/components/BaseCard.vue';
import SectionBanner from '@/components/SectionBanner.vue';
import { camelCase } from '../utils/index';

export default {
  props: {
    currentSurvey: {
      type: Object,
      required: true
    }
  },
  components: {
    BaseCard,
    BaseSurvey,
    SectionBanner
  },
  computed: {
    ...mapGetters(['getNumberOfSections'])
  },
  methods: {
    camelCase,
    setTitle(e) {
      this.$store.commit('setCurrentSurveyTitle', e.target.innerText);
    },
    setDescription(e) {
      this.$store.commit('setCurrentSurveyDescription', e.target.innerText);
    }
  }
};
</script>
