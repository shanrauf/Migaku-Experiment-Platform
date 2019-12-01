<template>
  <div class="survey-container">
    <SideNavigation :sections="getCurrentSurveySectionTitles" />
    <FormBuilder :currentSurvey="getCurrentSurvey" />
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
    this.$store.dispatch("createCurrentSurvey", this.$route.params.survey);
  },
  computed: {
    ...mapGetters(["getCurrentSurvey", "getCurrentSurveySectionTitles"])
  }
};
</script>

<style lang="scss" scoped>
.survey-container {
  margin: auto;
  margin-top: -64px;
  width: 750px;
}
</style>
