<template>
<!-- <div style="width: 200px;"> -->
  <v-select
    v-model="inputValue"
    menu-props="menuProps"
    hide-selected
    :items="items"
    :placeholder="placeholder"
    :value="value"
    :rules="rules"
    :label="label || 'Select one:'"
    @input="$emit('update', inputValue)"
  />
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
      },
      inputValue: ""
    };
  }
};
</script>

<style lang="scss" scoped></style>
