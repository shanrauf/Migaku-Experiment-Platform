<template>
  <div class="survey-container">
    <SideNavigation
      v-if="getCurrentSurvey.sections"
      :sections="getCurrentSurveySectionTitles"
    />
    <SurveyBuilder :currentSurvey="getCurrentSurvey" />

    <v-btn color="primary" @click="onSubmit">Submit</v-btn>
  </div>
</template>

<script>
import Service from './service';
import EventBus from '@/event-bus.ts';
import Vue from 'vue';
import { mapGetters, mapState } from 'vuex';
import SideNavigation from '@/components/SideNavigation.vue';
import SurveyBuilder from '@/components/SurveyBuilder.vue';

export default {
  name: 'Account',
  service: new Service(),
  components: {
    SurveyBuilder,
    SideNavigation
  },
  data() {
    return {
      validForm: {}
    };
  },
  created() {
    // this component renders on surveys/:survey routes (e.x /, /edit, /view)
    // if admin logged in, redirect from :survey to :survey/edit
    // Note: on every route, u need the questions associated w the survey,
    // but on /view check if surveyCompleted; returns QnAs if completed, else redirect to /
    // on /, do same thing as above; return QnAs and redirect to /view if completed, else stay at / w questions
    // NOTE: no need to worry if regular person tries accessing /edit cuz router.beforeEach will redirect.
    // shud be same API call for ju, and locally u can have a v-if answers exist
    // Note: / and /view are the same component, only /view disables the inputs (whether answersExist or not)
    // /edit will require its own UI on top of the survey UI to build surveys (same for experiments)
    this.$store.dispatch({
      type: 'createCurrentSurvey',
      // email: this.user.email, can only add when implemented auth, which idc about rn
      surveyId: this.$route.params.surveyId
    });
    EventBus.$on('validate', validObj => {
      this.validForm[validObj['sectionNumber']] = validObj['valid'];
    });
  },
  computed: {
    ...mapGetters(['getCurrentSurvey', 'getCurrentSurveySectionTitles'])
  },
  methods: {
    onSubmit() {
      if (!Object.values(this.validForm).every(val => !!val)) {
        Vue.notify({
          group: 'global',
          title: 'Failed to submit',
          text:
            'Check your answers to see if there is an error. Otherwise, directly message @Shan on Discord'
        });
      } else {
        let result = this.$store.dispatch('submitSurvey');
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.survey-container {
  margin: 30px auto;
  width: 650px;
}
</style>
