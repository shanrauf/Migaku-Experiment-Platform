<template>
  <v-container fluid>
    <v-row justify="center" align="center" style="height: 80vh" class="landing-container mx-auto">
      <h1 style="font-size: 60px">Mass Immersion Approach Foreign Language Experiments</h1>

      <div class="landing-options">
        <v-col>
          <v-card width="600px" height="350px" class="mx-auto">Participant</v-card>
        </v-col>
        <v-col>
          <v-card width="600px" height="350px" class="mx-auto">Experiment Administrator</v-card>
        </v-col>
      </div>
    </v-row>
  </v-container>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.landing-container {
  display: flex;
  flex-direction: column;
}
.landing-options {
  display: flex;
  justify-content: center;
}
</style>