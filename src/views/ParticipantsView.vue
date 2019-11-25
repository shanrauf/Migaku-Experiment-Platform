<template>
  <v-row>
    <v-col v-for="participant in participants" :key="participant.email">
      <ParticipantCard class="mx-auto" :participant="participant" />
    </v-col>
  </v-row>
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
          avgAnkiReviewing: 5,
          summaryOfJapaneseStudies:
            "Studied using Japanese from Zero Book 1 and a bit of Book 2, then kinda immersed in Japanese (didn't really think of it as immersion because I wasn't aware of MIA - I would just watch Japanese content, although more often than not, there would be English subs), looking up words on Jisho (but not creating flashcards since I wasn't using Anki or learning Japanese with the MIA mindset until 10ish months in). Started MIA in April being consistent with Anki for 2-3 months (April to around mid-July) before falling off and just occasionally immersing and doing little to no Anki reps. Around September, started doing Anki reps a bit more often but fell off around mid-October (while still just occasionally immresing via podcasts, watching anime, Terrace House, etc often with English subs). Now trying to be consistent with Anki and doing a bit more immersion (without subtitles)."
        },
        {
          name: "Matt",
          email: "matt@gmail.com",
          timeStudyingJapanese: 99, // months
          timeDoingMIA: 98,
          avgActiveImmersion: 5,
          avgPassiveImmersion: 3,
          avgReading: 4,
          avgAnkiReviewing: 3,
          summaryOfJapaneseStudies:
            "Studied Japanese for many years, but then got woke and started studying Chinese."
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped></style>
