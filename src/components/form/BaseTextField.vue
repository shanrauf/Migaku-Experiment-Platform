<template>
  <v-text-field
    v-model="inputValue"
    :rules="rules"
    :placeholder="placeholder"
    :value="value"
    :label="label"
    :required="required"
    @input="$emit('update', inputValue)"
  ></v-text-field>
</template>

<script>
export default {
  props: {
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
  },
  data() {
    return {
      inputValue: ""
    };
  }
};
</script>

<style lang="scss" scoped></style>
