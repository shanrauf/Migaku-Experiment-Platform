<template>
  <v-input :messages="[`${note}`]">
    <v-text-field
      :value="value"
      :rules="[...rules, requiredRule]"
      :label="label || 'Select one:'"
      @blur="onInput($event.target.value)"
    />
  </v-input>
</template>

<script>
export default {
  name: 'BaseTextField',
  inheritAttrs: false,
  props: {
    label: {
      type: String,
      required: false
    },
    note: {
      type: String,
      required: false,
      default: ''
    },
    value: {
      type: String | Number,
      required: false
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
  computed: {
    icon() {
      if (!this.editable) {
        return undefined;
      } else {
        return true;
      }
    },
    requiredRule() {
      if (this.required) {
        return v => !!v || 'This question is required';
      } else {
        return v => true;
      }
    }
  },
  methods: {
    onInput(newVal) {
      this.$emit('update', newVal);
    }
  }
};
</script>

<style lang="scss" scoped></style>
