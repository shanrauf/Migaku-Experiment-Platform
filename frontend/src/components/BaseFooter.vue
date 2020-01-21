<template>
  <v-footer padless class="base-footer">
    <v-card class="flex" flat tile>
      <v-card-title>
        <strong class="subheading"
          >Copyright &copy; 2020 Mass Immersion Approach</strong
        >

        <v-spacer />

        <v-btn
          v-for="social in socialLinks"
          :key="social.link"
          class="social-icon"
          icon
          :color="social.color"
          :href="social.link"
          target="_blank"
        >
          <v-icon>{{ social.icon }}</v-icon>
        </v-btn>
      </v-card-title>
    </v-card>
  </v-footer>
</template>

<script lang="ts">
export default {
  data() {
    return {
      socialLinks: [
        {
          icon: '$vuetify.icons.twitter',
          link: 'https://twitter.com/massimmersion',
          color: '#00acee'
        },
        {
          icon: '$vuetify.icons.youtube',
          link: 'https://www.youtube.com/user/MATTvsJapan',
          color: '#c4302b'
        },
        {
          icon: '$vuetify.icons.facebook',
          link: 'https://www.facebook.com/MassImmersionApproach/',
          color: '#3b5998'
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
.base-footer {
  margin-top: 15px;
  border-top: 1px solid gray;
}
.social-icon {
  margin: 0 5px 0 5px;
}
</style>
