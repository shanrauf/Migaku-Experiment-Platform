<template>
  <!-- <div style="width: 200px;"> can apply this when want UI controls for fields -->
  <v-input
    :messages="[`${note}`]"
    :append-icon="icon && '$vuetify.icons.edit'"
    @click:append="$emit('edit', true)"
  >
    <v-text-field
      :value="value"
      :rules="rules"
      :required="required"
      :label="label || 'Select one:'"
      @input="onInput($event)"
    />
  </v-input>
</template>

<script lang="ts">
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
      type: [String, Number],
      required: false
    },
    placeholder: {
      type: [String, Number],
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
    editable: {
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
