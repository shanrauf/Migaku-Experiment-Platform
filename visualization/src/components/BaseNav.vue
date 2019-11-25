<template>
  <v-app-bar dense class="base-nav">
    <v-app-bar-nav-icon></v-app-bar-nav-icon>

    <v-toolbar-title>Example</v-toolbar-title>

    <div class="flex-grow-1"></div>

    <v-btn icon>
      <v-icon>$vuetify.icons.star</v-icon>
    </v-btn>

    <v-menu left bottom>
      <template v-slot:activator="{ on }">
        <v-btn icon v-on="on">
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </template>

      <v-list>
        <v-list-item v-for="n in 5" :key="n" @click="() => {}">
          <v-list-item-title>Option {{ n }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<style lang="scss" scoped>
</style>

