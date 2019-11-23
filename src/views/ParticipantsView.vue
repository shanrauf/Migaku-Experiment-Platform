<template>
  <div>
    <div>
      <v-card height="600px" width="400px">
        <ParticipantCard />
      </v-card>
      <br />
    </div>
  </div>
</template>

<script>
import ParticipantCard from "@/components/ParticipantCard.vue";

export default {
  components: {
    ParticipantCard
  }
};
</script>

<style lang="scss" scoped></style>
