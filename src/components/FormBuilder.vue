<template>
  <div>
    <BaseCard
      :id="camelCase(section.title)"
      v-for="section in surveyData.sections"
      :key="section.id"
    >
      <div v-if="section.id == 1">
        <h1 style="text-align: center">{{surveyData.title}}</h1>
        <p style="text-align: center">{{surveyData.description}}</p>
      </div>
      <SectionBanner :sectionId="section.id" :numberOfSections="getNumberOfSections" />
      <BaseForm :section="section" />
    </BaseCard>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import BaseForm from "@/components/BaseForm.vue";
import BaseCard from "@/components/BaseCard.vue";
import SectionBanner from "@/components/SectionBanner.vue";

export default {
  props: {
    surveyData: {
      type: Object,
      required: true
    }
  },
  components: {
    BaseCard,
    BaseForm,
    SectionBanner
  },
  created() {
    // create survey data when calling from server
  },
  data() {
    return {
      options: {
        duration: 800,
        offset: 0,
        easing: "easeInCubic"
      }
    };
  },
  computed: {
    ...mapGetters(["getNumberOfSections"])
  },
  methods: {
    camelCase(str) {
      return str
        .replace(/(?:^\w|[A-Z]|\b\w)/g, function(word, index) {
          return index == 0 ? word.toLowerCase() : word.toUpperCase();
        })
        .replace(/\s+/g, "");
    }
  }
};
</script>
