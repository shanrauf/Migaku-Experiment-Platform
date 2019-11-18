<template>
  <div class="survey-container">
    <aside class="side-navigation-bar">
      <v-card>
        <v-row
          justify="center"
          v-for="section in getSurveyData.sections"
          :key="section.sectionName"
        >
          <a>
            {{ section.sectionName }}
          </a>
        </v-row>
      </v-card>
    </aside>

    <br />

    <FormBuilder :surveyData="getSurveyData" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import FormBuilder from "@/components/FormBuilder.vue";
export default {
  components: {
    FormBuilder
  },
  computed: {
    ...mapGetters(["getSurveyData"])
  }
};
</script>

<style lang="scss" scoped>
.survey-container {
  margin: auto;
  margin-top: -80px;
  width: 850px;
}
.side-navigation-bar {
  position: fixed;
  width: 200px;
  left: 30px;
  top: 350px;
}
</style>
