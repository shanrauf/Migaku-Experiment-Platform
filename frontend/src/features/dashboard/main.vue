<template>
  <div>
    <div class="dashboard-container">
      <div class="section-1">
        <v-card raised class="updates-container">
          <v-card flat class="updates">
            <h1>Updates:</h1>

            <v-card
              v-for="update in updates"
              :key="update.experimentId"
              class="card"
              color="#204f70"
            >
              <v-card-title class="text--white">{{
                update.title
              }}</v-card-title>
              <v-card-text class="text--white"
                >{{ update.description }}
                <router-link
                  v-if="update.to"
                  :to="update.to"
                  class="text--white"
                  >See More</router-link
                >
                <a v-if="update.href" class="text--white" :href="update.href">{{
                  update.hrefDesc
                }}</a>
              </v-card-text>
            </v-card>
          </v-card>
        </v-card>

        <v-card raised class="recent-surveys">
          <div class="surveys">
            <h1 class="header">Upcoming Surveys:</h1>

            <v-card
              v-for="survey in surveys"
              :key="survey.surveyId"
              class="card"
              outlined
            >
              <v-card-title style="font-size: 17px;">{{
                survey.title
              }}</v-card-title>
              <v-card-subtitle>{{
                dateToTimeUntil(new Date(survey.endDate))
              }}</v-card-subtitle>
              <v-card-text>{{ survey.description }}</v-card-text>
              <v-card-actions>
                <BaseButton
                  color="#ffffff"
                  backgroundColor="#204f70"
                  rounded
                  @click="
                    goTo(
                      `/experiments/${survey.experimentId}/surveys/${survey.surveyId}`
                    )
                  "
                  >Complete Survey</BaseButton
                >
              </v-card-actions>
            </v-card>
          </div>
        </v-card>
      </div>
      <div class="experiments-section">
        <h1 class="header">Experiments You're Registered For:</h1>
        <div class="experiments">
          <v-card
            v-for="experiment in experiments"
            :key="experiment.experimentId"
            raised
            class="experiment-card"
          >
            <v-card-title>{{ experiment.title }}</v-card-title>
            <v-card-text>{{ experiment.description }}</v-card-text>
            <!-- <v-card-actions>
              <BaseButton
                color="#ffffff"
                backgroundColor="#204f70"
                rounded
                @click="goTo(`/experiments/${experiment.experimentId}`)"
                >See More</BaseButton
              >
            </v-card-actions> -->
          </v-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { dateToTimeUntil } from '@/utils/index';

export default {
  data() {
    return {
      updates: [
        {
          updateId: 'thanks-for-registering',
          title: 'Thanks for registering!',
          description:
            'We automatically registered you for the MIA Community Census experiment. You can find more information about the experiment below or see upcoming surveys to the right.'
        },
        {
          updateId: 'anki-survey',
          title: 'Complete the Anki survey!',
          description:
            'To send us your Anki statistics, follow the instructions on the YouTube video below:',
          href: 'https://www.youtube.com/watch?v=707qS5O7BHY',
          hrefDesc: 'YouTube Video'
        },
        {
          updateId: 'experiment-done',
          title: 'Audio vs Text Cards Experiment Completed',
          description:
            'We just finished administering an experiment that analyzed retention rates of audio and sentence cards.',
          to: '/experiments/audiovssentencecards/results'
        }
      ],
      surveys: [
        {
          experimentId: 'mia-community-census',
          surveyId: 'g6cy8p0yrmnclxyv6co2o',
          title: 'MIA Community Census Initial Survey',
          description: 'This is the first survey of the MIA community census!',
          endDate: '2020-04-14T00:00:00.000Z'
        }
      ],
      experiments: [
        {
          experimentId: 'mia-community-census',
          title: 'MIA Community Census',
          description:
            'This experiment seeks to better understand the types of language learners within the MIA community. For the time being, this experiment is restricted to MIA patrons.'
        }
      ]
    };
  },
  methods: {
    dateToTimeUntil,
    goTo(link) {
      this.$router.push(link);
    }
  }
};
</script>

<style lang="scss" scoped>
.card {
  margin: 15px 0;
}
.text--white {
  color: #ffffff !important;
}
.header {
  font-size: 20px;
}
.dashboard-container {
  width: 90%;
  height: auto;
  margin: 25px auto;
}
.section-1 {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 0 0 25px 0;

  .updates-container {
    margin: 15px 20px;
    flex: 0.7;

    .updates {
      margin: 15px 20px;

      display: flex;
      flex-direction: column;
    }
  }
  .recent-surveys {
    flex: 0.3;
    min-width: 400px;
  }
}
.experiments-section {
  .experiments {
    display: flex;
    flex-direction: row;
    margin: 10px 0 0 0;
  }
  .experiment-card {
    margin: 0 15px;
    width: 275px;
    height: 300px;
  }
}
.recent-surveys {
  margin: 15px 20px;

  .surveys {
    margin: 15px 20px;

    display: flex;
    flex-direction: column;
  }
}
</style>
