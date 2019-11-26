<template>
  <v-radio-group
    v-model="inputValue"
    :rules="rules"
    :placeholder="placeholder"
    :value="initialValue"
    :label="label"
    :mandatory="required"
    @change="$emit('update', inputValue)"
  >
    <v-radio
      v-for="item in items"
      :key="item.key || item"
      :label="item.value || item"
      :value="item.key || item"
    />
  </v-radio-group>
</template>

<script>
export default {
  props: {
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
    },
    items: {
      type: Array,
      required: true
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
