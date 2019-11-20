<template>
  <div class="survey-container">
    <SideNavigation :sections="getSurveySectionTitles" />
    <FormBuilder :surveyData="getSurveyData" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import SideNavigation from "@/components/SideNavigation.vue";
import FormBuilder from "@/components/FormBuilder.vue";
export default {
  components: {
    FormBuilder,
    SideNavigation
  },
  created() {
    this.$store.dispatch("createSurveyData");
  },
  computed: {
    ...mapGetters(["getSurveyData", "getSurveySectionTitles"])
  }
};
</script>

<style lang="scss" scoped>
.survey-container {
  margin: auto;
  margin-top: -112px;
  width: 750px;
}
</style>
