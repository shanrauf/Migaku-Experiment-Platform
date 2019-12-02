<template>
  <!-- <div style="width: 200px;"> can apply this when want UI controls for fields -->
    <v-text-field
    v-bind="$attrs"
    :label="label || 'Select one:'"
    @input="onInput($event)" />
</template>

<script>
export default {
  inheritAttrs: false,
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
  methods: {
    onInput(newVal) {
      this.$emit("update", newVal)
    }
  }
};
</script>

<style lang="scss" scoped></style>
