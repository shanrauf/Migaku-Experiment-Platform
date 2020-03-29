<template>
  <v-input :messages="[`${note}`]">
    <v-combobox
      v-model="inputArray"
      :rules="[...rules, whitelistRule, requiredRule]"
      :placeholder="placeholder"
      :value="value"
      :label="label || 'Select one:'"
      :items="items"
      multiple
      deletable-chips
      :mandatory="required"
      @change="$emit('update', inputArray)"
    >
    </v-combobox>
  </v-input>
</template>

<script>
export default {
  name: 'BaseMultiselect',
  props: {
    label: {
      type: String,
      required: false
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
    },
    items: {
      type: Array,
      required: true
    },
    note: {
      type: String,
      required: false,
      default: ''
    }
  },
  data() {
    return {
      inputArray: []
    };
  },
  computed: {
    /**
     * This prevents user from adding items not specified as an option.
     */
    whitelistRule() {
      return v => {
        const invalidInputs = [];
        this.inputArray.forEach(input => {
          if (!this.items.includes(input)) {
            invalidInputs.push(input);
          }
        });
        if (invalidInputs.length) {
          return `These are invalid options: ${invalidInputs.join(', ')}.`;
        }
        return true;
      };
    },
    requiredRule() {
      if (this.required) {
        return v => !!v.length || 'This question is required';
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>
