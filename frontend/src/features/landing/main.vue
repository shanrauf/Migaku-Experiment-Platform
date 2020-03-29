<template>
  <div class="landing-container">
    <section class="landing-section">
      <div class="landing">
        <h1 class="landing-title">
          Participate in MIA Foreign Language Experiments!
        </h1>
        <p class="landing-text">
          MIA seeks to optimize the path to true foreign language proficiency.
          Through this platform, we can find and share insights into the
          language acquisiton process through empirical data.
        </p>

        <BaseButton
          color="#7289DA"
          backgroundColor="#7289DA"
          rounded
          @click="loginWithDiscord"
          ><span style="color: #ffffff">Sign In With Discord</span></BaseButton
        >
      </div>
    </section>

    <BaseWave color="#204f70" />

    <section class="experiment-showcase">
      <div class="showcase-container">
        <div class="graph">
          <VueApexCharts :options="options" :series="series" />
        </div>
        <div class="showcase-description">
          <h1>Visualize Experiment Results Anytime</h1>
          <p>
            We recently conducted an experiment testing the difference in
            overall retention when reviewing audio and sentence cards in Anki.
            The experiment results suggest that audio cards result in a
            significantly higher overall retention than sentence cards.
          </p>
          <BaseButton
            color="#ffffff"
            backgroundColor="#204f70"
            rounded
            @click="loginWithDiscord"
            >See Complete Results</BaseButton
          >
        </div>
      </div>
    </section>

    <section class="signup-section">
      <h1 class="signup-title">
        Sign up for an experiment now!
      </h1>
      <BaseButton
        color="#7289DA"
        backgroundColor="#7289DA"
        rounded
        @click="loginWithDiscord"
        ><span style="color: #ffffff">Sign In With Discord</span></BaseButton
      >
    </section>
  </div>
</template>

<script>
import BaseWave from './components/BaseWave.vue';
import Service from './service';
import VueApexCharts from 'vue-apexcharts';

export default {
  name: 'Landing',
  service: new Service(),
  components: {
    BaseWave,
    VueApexCharts
  },
  data() {
    return {
      options: {
        title: {
          text: 'Overall Card Retention'
        },
        chart: {
          id: 'vuechart-example'
        },
        xaxis: {
          categories: [
            'Survey 1',
            'Survey 2',
            'Survey 3',
            'Survey 4',
            'Survey 5',
            'Survey 6',
            'Survey 7',
            'Survey 8',
            'Survey 9',
            'Survey 10',
            'Survey 11',
            'Survey 12'
          ]
        }
      },
      series: [
        {
          name: 'Audio',
          data: this.$options.service.testData()['avgAudioRetention']
        },
        {
          name: 'Sentence',
          data: this.$options.service.testData()['avgSentenceRetention']
        }
      ]
    };
  },
  methods: {
    loginWithDiscord() {
      window.location.replace(
        'https://trials.massimmersionapproach.com/api/auth/discord'
      );
    }
  }
};
</script>

<style lang="scss" scoped>
.landing-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin: auto;
}
.landing-section {
  background: #204f70;
  height: 100%;
  min-height: 35vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin: auto;
}
.landing {
  max-width: 800px;
  margin: 0 35px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}
.landing-title {
  color: #fff;
  max-width: 700px;
  font-size: 50px;
}
.landing-text {
  color: #fff;
  font-size: 18px;
}
.experiment-showcase {
  width: 100%;
  height: 100%;
  margin: 100px auto;
}
.showcase-container {
  // margin: 0 60px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
.graph-container {
  width: 40%;
}
.graph {
  // width: 50%;
  // height: 50%;
  // display: block;
  width: 40%;
  height: auto;
  // background: url('./assets/OverallRetentionExample.svg');
  // background-repeat: no-repeat;
}
.showcase-description {
  max-width: 500px;
  height: auto;
  display: flex;
  flex-direction: column;
  margin: auto 0;
  text-align: left;
}
.signup-section {
  background: #204f70;
  height: 100%;
  min-height: 35vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin: auto;
}
.signup-title {
  font-size: 40px;
  color: #fff;
  margin-bottom: 15px;
}
@media screen and (max-width: 1300px) {
  .showcase-container {
    flex-direction: column-reverse;
    align-items: center;
  }
  .graph {
    width: 70%;
    margin-top: 30px;
  }
  .showcase-description {
    max-width: 400px;
    h1 {
      font-size: 23px;
    }
  }
}

@media screen and (max-width: 700px) {
  .landing-section {
    justify-content: center;
  }
  .landing {
    margin: 0 25px;
  }
  .landing-title {
    font-size: 25px;
  }
  .signup-title {
    font-size: 25x;
  }
  .landing-text {
    font-size: 12px;
  }
}
</style>
