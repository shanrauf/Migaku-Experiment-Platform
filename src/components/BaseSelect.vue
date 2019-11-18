<template>
  <v-skeleton-loader
    transition="fade-transition"
    :loading="loading"
    type="heading"
  >
    <v-select
      menu-props="menuProps"
      hide-selected
      :items="items"
      :placeholder="placeholder"
      :value="value"
      :rules="rules"
      :label="label || 'Select one:'"
    ></v-select>
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
    items: {
      type: Array,
      required: true
    },
    rules: {
      type: Array,
      required: false
    }
  },
  data() {
    return {
      menuProps: {
        closeOnClick: true,
        closeOnContentClick: true,
        openOnClick: true,
        transition: true
      }
    };
  }
};
</script>

<style lang="scss" scoped></style>
