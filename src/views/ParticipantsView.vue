<template>
  <div>
    <div class="participants-container">
      <ParticipantCard
        class="mx-auto"
        v-for="participant in participants"
        :key="participant.email"
        :participant="participant"
      />
    </div>
  </div>
</template>

<script>
import ParticipantCard from "@/components/ParticipantCard.vue";

export default {
  components: {
    ParticipantCard
  },
  data() {
    return {
      participants: [
        {
          name: "Shan",
          email: "asdf@gmail.com",
          timeStudyingJapanese: 17, // months
          timeDoingMIA: 8,
          avgActiveImmersion: 3,
          avgPassiveImmersion: 2,
          avgReading: 2,
          avgAnkiReviewing: 5
        },
        {
          name: "Lucas",
          email: "fdsa@gmail.com",
          timeStudyingJapanese: 99, // months
          timeDoingMIA: 98,
          avgActiveImmersion: 5,
          avgPassiveImmersion: 3,
          avgReading: 4,
          avgAnkiReviewing: 3
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
.participants-container {
  display: flex;
}
</style>
