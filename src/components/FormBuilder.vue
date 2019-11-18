<template>
  <div>
    <div :id="camelCase(section.title)" v-for="section in surveyData.sections" :key="section.id">
      <BaseCard>
        <div v-if="section.id == 1">
          <h1 style="text-align: center">{{surveyData.title}}</h1>
          <p style="text-align: center">{{surveyData.description}}</p>
        </div>
        <div class="section-label">
          <div class="section-label-text-container">
            <div class="section-label-text">Section {{section.id}} of {{surveyData.sections.length}}</div>
          </div>
          <div class="triangle"></div>
        </div>
        <h1 style="margin: 20px 20px 5px 20px">{{ section.title }}</h1>
        <p style="margin: 0 20px 20px 20px">{{ section.description }}</p>
        <BaseForm :questions="section.questions" />
      </BaseCard>
      <br v-if="section.id != surveyData.sections.length" />
    </div>
  </div>
</template>

<script>
import BaseForm from "@/components/BaseForm.vue";
import BaseCard from "@/components/BaseCard.vue";

export default {
  props: {
    surveyData: {
      type: Object,
      required: true
    }
  },
  components: {
    BaseCard,
    BaseForm
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
      // easings: Object.keys(easings)
    };
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

<style lang="scss" scoped>
.section-label {
  flex-grow: 1;
  -webkit-box-align: start;
  align-items: flex-start;
  background-color: #fff;
  display: flex;
  height: 40px;
  overflow-y: visible;
  padding-right: 2px;
}
.section-label-text-container {
  background-color: #204f70;
  color: white;
  min-width: 0%;
  display: block;
}
.section-label-text {
  padding: 8px 8px 8px 42px;
}
.triangle {
  margin: 0px;
  padding: 0px;
  display: inline-block;
  border-top: 40px solid #204f70;
  border-right: 30px solid transparent;
}
</style>
