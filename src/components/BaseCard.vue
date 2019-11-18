<template>
  <v-card raised>
    <h1 style="text-align: center">
      <slot name="title"></slot>
    </h1>
    <br />
    <p style="text-align: center">
      <slot name="description"></slot>
    </p>
    <slot name="body"></slot>
  </v-card>
</template>

<script></script>

<style lang="scss" scoped></style>
