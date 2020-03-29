<template>
  <v-footer padless class="base-footer">
    <div class="footer-container" flat tile>
      <strong class="subheading"
        ><strong class="copyright"
          >Copyright &copy; {{ new Date().getFullYear() }} Mass Immersion
          Approach</strong
        ></strong
      >

      <div class="social-icons">
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
      </div>
    </div>
  </v-footer>
</template>

<script>
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
.copyright {
  font-size: 15px;
}
.social-icons {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.social-icon {
  margin: 0 10px;
}
.footer-container {
  background-color: #fff;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
@media screen and (max-width: 600px) {
  .footer-container {
    display: flex;
    flex-direction: column-reverse;
    align-items: center;
    margin: 0 auto;
  }
}
</style>
