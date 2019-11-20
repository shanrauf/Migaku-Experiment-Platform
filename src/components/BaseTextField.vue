<template>
  <v-skeleton-loader transition="fade-transition" :loading="loading" type="heading">
    <v-text-field
      v-model="inputValue"
      :rules="rules"
      :placeholder="placeholder"
      :value="initialValue"
      :label="label"
      :required="required"
      @input="$emit('update', inputValue)"
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
    initialValue: {
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
  },
  data() {
    return {
      inputValue: ""
    };
  }
};
</script>

<style lang="scss" scoped></style>
