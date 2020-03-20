<template>
  <v-input :messages="[`${note}`]">
    <v-combobox
        v-model="inputValue"
        :rules="[...rules, whitelistRule]"
        :placeholder="placeholder"
        :value="value"
        :items="items"
        :required="required"
        :label="label || 'Select one:'"
        @change="$emit('update', inputValue)"
      >
      </v-combobox>
  </v-input>
</template>

<script>
export default {
  name: "BaseSelect",
  props: {
    label: {
      type: String,
      required: false
    },
    note: {
      type: String,
      required: false,
      default: ""
    },
    value: {
      type: [String, Number],
      required: false
    },
    placeholder: {
      type: [String, Number],
      required: false
    },
    items: {
      type: Array,
      required: true
    },
    rules: {
      type: Array,
      required: false
    },
    required: {
      type: Boolean,
      required: false
    }},
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
  },
  computed: {
    /**
     * This prevents user from adding items not specified as an option.
     */
    whitelistRule() {
      return v => {
        if (v === null) {
          return this.required ? "This question is required" : true;
        }
        if (!this.items.includes(v)) {
          return `${v} is an invalid option.`;
        }
        return true;
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>
