<template>
  <v-container>
    <v-row>
      <v-col v-for="experiment in experiments" :key="experiment.id">
        <h1>{{experiment.title}}</h1>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      experiments: [
        {
          id: "sa54df154sa4df",
          title: "Example Experiment 1"
        },
        {
          id: "hrte75sg4s8rt4",
          title: "Random Experiment 2"
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped></style>
