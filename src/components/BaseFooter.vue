<template>
  <v-footer padless class="base-footer">
    <v-card class="flex" flat tile>
      <v-card-title>
        <strong class="subheading"
          >Copyright &copy; 2019 MIA Experiment Survey</strong
        >

        <v-spacer />

        <v-btn
          icon
          color="black"
          href="https://github.com/shanrauf"
          target="_blank"
        >
          <v-icon>$vuetify.icons.github</v-icon>
        </v-btn>
      </v-card-title>
    </v-card>
  </v-footer>
</template>

<style lang="scss" scoped>
.base-footer {
  border-top: 1px solid gray;
}
</style>
