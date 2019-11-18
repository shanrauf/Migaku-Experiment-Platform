<template>
  <v-skeleton-loader
    transition="fade-transition"
    :loading="loading"
    type="heading"
  >
    <v-text-field
      :rules="rules"
      :placeholder="placeholder"
      :value="value"
      :label="label"
      :required="required"
    ></v-text-field>
  </v-skeleton-loader>
</template>

<script>
export default {
  props: {
    loading: {
      type: Boolean,
      required: true
    },
    label: {
      type: String,
      required: false
    },
    value: {
      type: String | Number,
      required: true
    },
    placeholder: {
      type: String | Number,
      required: false
    },
    rules: {
      type: Array,
      required: false
    },
    required: {
      type: Boolean,
      required: false
    }
  }
};
</script>

<style lang="scss" scoped></style>
