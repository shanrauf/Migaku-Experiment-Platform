<template>
  <v-container>
    <v-row>
      <v-col v-for="survey in surveys" :key="survey.id">
        <h1>{{survey.title}}</h1>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      surveys: [
        {
          id: "fdsaf34g",
          title: "Example Survey 1"
        },
        {
          id: "y56hfdhh",
          title: "Random Survey 2"
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped></style>
